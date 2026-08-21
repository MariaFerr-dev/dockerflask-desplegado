FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","start"]

# Install curl for HEALTHCHECK and add a healthcheck endpoint
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD curl -f http://localhost:8000/health || exit 1


