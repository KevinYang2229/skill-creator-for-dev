# AI API 整合（OpenAI / Anthropic）

提供統一的 LLM 呼叫端口，封裝重試、串流、cost tracking、錯誤處理。

## 設計目標

- **抽象化**：route / service 不直接依賴特定 SDK
- **可替換**：OpenAI / Anthropic / 其他都實作同介面
- **可觀測**：自動記錄 latency、token usage、cost
- **容錯**：重試、timeout、降級

## 1. 安裝

```bash
uv add openai anthropic tenacity
```

## 2. 統一介面（`integrations/llm/base.py`）

```python
from abc import ABC, abstractmethod
from collections.abc import AsyncIterator
from dataclasses import dataclass
from typing import Literal


Role = Literal["system", "user", "assistant"]


@dataclass
class Message:
    role: Role
    content: str


@dataclass
class Usage:
    input_tokens: int
    output_tokens: int
    cost_usd: float


@dataclass
class ChatResponse:
    content: str
    model: str
    usage: Usage


class LLMProvider(ABC):
    @abstractmethod
    async def chat(
        self,
        messages: list[Message],
        *,
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 1024,
    ) -> ChatResponse: ...

    @abstractmethod
    async def stream(
        self,
        messages: list[Message],
        *,
        model: str,
        temperature: float = 0.7,
        max_tokens: int = 1024,
    ) -> AsyncIterator[str]: ...
```

## 3. OpenAI 實作（`integrations/llm/openai_provider.py`）

```python
from collections.abc import AsyncIterator

from openai import AsyncOpenAI
from tenacity import (
    retry, stop_after_attempt, wait_exponential, retry_if_exception_type,
)
from openai import APIConnectionError, APITimeoutError, RateLimitError

from ...core.config import settings
from .base import ChatResponse, LLMProvider, Message, Usage

# 2026 年定價（USD per 1M tokens）— 請定期更新
_PRICES = {
    "gpt-4o":      {"in": 2.50,  "out": 10.00},
    "gpt-4o-mini": {"in": 0.15,  "out": 0.60},
}


def _calc_cost(model: str, inp: int, out: int) -> float:
    p = _PRICES.get(model, {"in": 0, "out": 0})
    return (inp * p["in"] + out * p["out"]) / 1_000_000


class OpenAIProvider(LLMProvider):
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.openai_api_key, timeout=60.0)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(
            (APIConnectionError, APITimeoutError, RateLimitError),
        ),
    )
    async def chat(self, messages, *, model, temperature=0.7, max_tokens=1024):
        resp = await self.client.chat.completions.create(
            model=model,
            messages=[{"role": m.role, "content": m.content} for m in messages],
            temperature=temperature,
            max_tokens=max_tokens,
        )
        usage = resp.usage
        return ChatResponse(
            content=resp.choices[0].message.content or "",
            model=resp.model,
            usage=Usage(
                input_tokens=usage.prompt_tokens,
                output_tokens=usage.completion_tokens,
                cost_usd=_calc_cost(model, usage.prompt_tokens, usage.completion_tokens),
            ),
        )

    async def stream(self, messages, *, model, temperature=0.7, max_tokens=1024) -> AsyncIterator[str]:
        stream = await self.client.chat.completions.create(
            model=model,
            messages=[{"role": m.role, "content": m.content} for m in messages],
            temperature=temperature,
            max_tokens=max_tokens,
            stream=True,
        )
        async for chunk in stream:
            delta = chunk.choices[0].delta.content if chunk.choices else None
            if delta:
                yield delta
```

## 4. Anthropic 實作（`integrations/llm/anthropic_provider.py`）

```python
from collections.abc import AsyncIterator

from anthropic import AsyncAnthropic
from anthropic import APIConnectionError, APITimeoutError, RateLimitError
from tenacity import (
    retry, stop_after_attempt, wait_exponential, retry_if_exception_type,
)

from ...core.config import settings
from .base import ChatResponse, LLMProvider, Message, Usage


# 2026 年定價（USD per 1M tokens）— 請定期更新
_PRICES = {
    "claude-opus-4-7":   {"in": 15.00, "out": 75.00},
    "claude-sonnet-4-6": {"in": 3.00,  "out": 15.00},
    "claude-haiku-4-5":  {"in": 0.80,  "out": 4.00},
}


def _calc_cost(model: str, inp: int, out: int) -> float:
    p = _PRICES.get(model, {"in": 0, "out": 0})
    return (inp * p["in"] + out * p["out"]) / 1_000_000


def _split(messages: list[Message]) -> tuple[str | None, list[dict]]:
    """Anthropic 將 system 拆出來。"""
    system = None
    msgs = []
    for m in messages:
        if m.role == "system":
            system = m.content
        else:
            msgs.append({"role": m.role, "content": m.content})
    return system, msgs


class AnthropicProvider(LLMProvider):
    def __init__(self):
        self.client = AsyncAnthropic(api_key=settings.anthropic_api_key, timeout=60.0)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(
            (APIConnectionError, APITimeoutError, RateLimitError),
        ),
    )
    async def chat(self, messages, *, model, temperature=0.7, max_tokens=1024):
        system, msgs = _split(messages)
        resp = await self.client.messages.create(
            model=model,
            system=system or "",
            messages=msgs,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        text = "".join(b.text for b in resp.content if b.type == "text")
        return ChatResponse(
            content=text,
            model=resp.model,
            usage=Usage(
                input_tokens=resp.usage.input_tokens,
                output_tokens=resp.usage.output_tokens,
                cost_usd=_calc_cost(model, resp.usage.input_tokens, resp.usage.output_tokens),
            ),
        )

    async def stream(self, messages, *, model, temperature=0.7, max_tokens=1024) -> AsyncIterator[str]:
        system, msgs = _split(messages)
        async with self.client.messages.stream(
            model=model,
            system=system or "",
            messages=msgs,
            temperature=temperature,
            max_tokens=max_tokens,
        ) as stream:
            async for text in stream.text_stream:
                yield text
```

## 5. Provider 工廠（`integrations/llm/__init__.py`）

```python
from typing import Literal
from .base import LLMProvider, Message, ChatResponse, Usage
from .openai_provider import OpenAIProvider
from .anthropic_provider import AnthropicProvider

ProviderName = Literal["openai", "anthropic"]


def get_provider(name: ProviderName) -> LLMProvider:
    match name:
        case "openai":
            return OpenAIProvider()
        case "anthropic":
            return AnthropicProvider()
```

## 6. Service 用法

```python
# services/chat.py
from ..integrations.llm import Message, get_provider


class ChatService:
    async def reply(self, user_message: str) -> str:
        provider = get_provider("anthropic")
        resp = await provider.chat(
            messages=[
                Message(role="system", content="You are a helpful assistant."),
                Message(role="user", content=user_message),
            ],
            model="claude-sonnet-4-6",
            max_tokens=1024,
        )
        # 記錄 cost、tokens 到 DB / log
        return resp.content
```

## 7. Route 串流範例

```python
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from ..integrations.llm import Message, get_provider

router = APIRouter()


@router.post("/chat/stream")
async def chat_stream(payload: dict):
    provider = get_provider("anthropic")

    async def gen():
        async for chunk in provider.stream(
            messages=[Message(role="user", content=payload["message"])],
            model="claude-sonnet-4-6",
        ):
            yield chunk

    return StreamingResponse(gen(), media_type="text/plain")
```

## 8. 測試（mock SDK）

```python
from unittest.mock import AsyncMock, patch


async def test_chat_service(monkeypatch):
    fake = AsyncMock()
    fake.chat.return_value = ChatResponse(
        content="hi", model="x", usage=Usage(10, 5, 0.0001),
    )
    monkeypatch.setattr(
        "src.{package_name}.integrations.llm.get_provider", lambda _: fake,
    )

    result = await ChatService().reply("hello")
    assert result == "hi"
```

## 注意事項

- **Secrets**：API key 一律走 env，禁止寫死
- **Timeout**：SDK 預設過長，明確設定 30~60 秒
- **Rate limit**：用 tenacity 指數退避；高頻場景考慮 client-side throttle
- **PII**：送進 LLM 前過濾敏感資料；log 不要存完整 prompt
- **Cost cap**：在 service 層加 daily/monthly budget guard
- **模型版本**：在 settings 中設定預設模型，方便切換
- **Anthropic 特例**：messages 中第一則必須是 user，system 要拆出來；連續同 role message 要合併
