FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies (safeguard for wheels)
RUN apt-get update && apt-get install -y gcc

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY . .

# Explicitly define Python path
ENV PYTHONPATH=/app

# Expose correct port
EXPOSE 8080

# Call uvicorn directly (no sh -c nonsense)
ENTRYPOINT ["uvicorn", "agent_server:app", "--host", "0.0.0.0", "--port", "8080", "--log-level", "debug"]
