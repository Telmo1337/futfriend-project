# =========================
# Dockerfile FutFriend API
# =========================

FROM node:20-slim

# Instalar dependências necessárias (inclui mysql-client)
RUN apt-get update -y && \
    apt-get install -y openssl default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar ficheiros de dependências
COPY package*.json ./

# Instalar deps
RUN npm install

# Copiar resto do projeto
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

EXPOSE 5500

# Espera pelo MySQL, aplica migrations e arranca o servidor
CMD ["bash", "-c", "echo 'Waiting for MySQL...' && \
  until mysqladmin ping -h mysql --silent; do echo 'MySQL not ready...'; sleep 2; done; \
  echo 'MySQL ready!'; \
  echo 'Applying Prisma migrate deploy...'; npx prisma migrate deploy; \
  echo 'Starting server...'; npm run dev"]
