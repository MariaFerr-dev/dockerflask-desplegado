FROM nginx:latest

COPY . /usr/share/nginx/html

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD curl -f http://localhost || exit 1

