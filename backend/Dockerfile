FROM node:22-bookworm-slim

WORKDIR /app

# Install curl for HEALTHCHECK with the smallest apt footprint.
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl \
	&& rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","start"]

HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD curl -f http://localhost:8000/health || exit 1


