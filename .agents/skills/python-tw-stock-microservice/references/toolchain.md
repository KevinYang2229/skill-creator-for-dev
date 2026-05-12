# Python 現代工具鏈（2025-2026）

## 核心工具組合

| 工具 | 用途 | 取代 |
|------|------|------|
| **uv** | 套件管理 + 虛擬環境 | pip, poetry, pipenv |
| **FastAPI** | Web 框架（async） | Flask, Django REST |
| **Pydantic v2** | 資料驗證 + Settings | dataclasses, marshmallow |
| **ruff** | Linting + Formatting | black, isort, flake8, pylint |
| **mypy** | 靜態型別檢查 | pyright |
| **pytest** | 測試框架 | unittest |
| **Docker** | 容器化部署 | - |

## pyproject.toml 範本

```toml
[project]
name = "tw-stock-analyzer"
version = "0.1.0"
description = "台股分析微服務"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.34",
    "pydantic>=2.0",
    "pydantic-settings>=2.0",
    "httpx>=0.28",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "pytest-asyncio>=0.25",
    "pytest-cov>=6.0",
    "ruff>=0.9",
    "mypy>=1.14",
    "httpx>=0.28",  # TestClient 需要
]

[tool.ruff]
target-version = "py312"
line-length = 100

[tool.ruff.lint]
select = ["E", "F", "W", "I", "N", "UP", "B", "A", "SIM"]

[tool.pytest.ini_options]
testpaths = ["tests"]
asyncio_mode = "auto"

[tool.mypy]
python_version = "3.12"
strict = true
```

## Makefile 範本

```makefile
.PHONY: dev test lint format check

dev:
	uv run uvicorn src.tw_stock_analyzer.main:app --reload --port 8000

test:
	uv run pytest -v --cov

lint:
	uv run ruff check src/ tests/
	uv run mypy src/

format:
	uv run ruff format src/ tests/
	uv run ruff check --fix src/ tests/

check: lint test
```

## Dockerfile 範本

```dockerfile
FROM python:3.12-slim AS base

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY src/ src/

EXPOSE 8000
CMD ["uv", "run", "uvicorn", "src.tw_stock_analyzer.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## docker-compose.yml 範本

```yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    restart: unless-stopped
```
