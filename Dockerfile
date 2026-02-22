FROM python:3.13-slim

WORKDIR /code

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# The code will be mounted via docker-compose, but copied here for fallback/production
COPY ./app /code/app

# --reload enables hot-reloading when files change
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]