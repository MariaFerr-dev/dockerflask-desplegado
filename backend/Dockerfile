FROM node:22-bookworm
#-slim

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl \
	&& rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install --omit=dev \
	&& npm cache clean --force \
	&& rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /root/.npm

COPY . .

EXPOSE 8000

CMD ["node", "server.js"]

HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD curl -f http://localhost:8000/health || exit 1


