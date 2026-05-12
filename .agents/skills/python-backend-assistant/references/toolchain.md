# 工具鏈設定範本

## pyproject.toml

```toml
[project]
name = "{project_name}"
version = "0.1.0"
description = ""
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.32",
    "pydantic>=2.9",
    "pydantic-settings>=2.6",
    "httpx>=0.27",
    "structlog>=24.4",
]

[dependency-groups]
dev = [
    "pytest>=8.3",
    "pytest-asyncio>=0.24",
    "pytest-cov>=5.0",
    "ruff>=0.7",
    "mypy>=1.13",
    "respx>=0.21",
]

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = [
    "E", "F", "W",   # pycodestyle / pyflakes
    "I",             # isort
    "N",             # naming
    "UP",            # pyupgrade
    "B",             # bugbear
    "C4",            # comprehensions
    "SIM",           # simplify
    "RUF",           # ruff-specific
]
ignore = ["E501"]    # line-too-long（formatter 處理）

[tool.ruff.lint.per-file-ignores]
"tests/*" = ["S101"]
"alembic/versions/*" = ["E501", "N999"]

[tool.ruff.format]
quote-style = "double"

[tool.mypy]
python_version = "3.11"
strict = true
plugins = ["pydantic.mypy"]
exclude = ["alembic/"]

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
addopts = "-ra --strict-markers --cov=src --cov-report=term-missing"

[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*", "*/alembic/*"]
```

## Makefile

```makefile
.PHONY: install dev test lint format type clean migrate revision

install:
	uv sync

dev:
	uv run uvicorn src.{package_name}.main:app --reload --port 8000

test:
	uv run pytest

lint:
	uv run ruff check .

format:
	uv run ruff format .
	uv run ruff check --fix .

type:
	uv run mypy src

migrate:
	uv run alembic upgrade head

revision:
	@read -p "Migration message: " msg; \
	uv run alembic revision --autogenerate -m "$$msg"

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	find . -type d -name .ruff_cache -exec rm -rf {} +
	find . -type d -name .mypy_cache -exec rm -rf {} +
```

## .env.example

```env
# App
APP_NAME="My API"
DEBUG=false

# CORS（逗號分隔）
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/dbname

# JWT
JWT_SECRET=change-me-please
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=1440

# AI
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

## .gitignore

```gitignore
# Python
__pycache__/
*.py[cod]
.Python
*.egg-info/
.venv/
.pytest_cache/
.ruff_cache/
.mypy_cache/
.coverage
htmlcov/

# Env
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Build
dist/
build/
```

## Dockerfile（多階段、非 root）

```dockerfile
FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1
WORKDIR /app

# 安裝 uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Builder
FROM base AS builder
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project --no-dev

# Runtime
FROM base AS runtime
RUN useradd --create-home --uid 1000 app
COPY --from=builder /app/.venv /app/.venv
COPY src ./src
RUN chown -R app:app /app
USER app

ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 8000
CMD ["uvicorn", "src.{package_name}.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## docker-compose.yml（含 PostgreSQL）

```yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: dbname
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

## CI（GitHub Actions 範本）

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
      - run: uv sync
      - run: uv run ruff check .
      - run: uv run mypy src
      - run: uv run pytest
```
