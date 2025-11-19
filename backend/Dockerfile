# ==============================
# Base Node
# ==============================
FROM node:20-alpine

# Pasta interna onde o código vive
WORKDIR /app

# Actualizar imagem
RUN apk update && apk upgrade

# Copiar ficheiros de dependências
COPY package*.json ./

# Instalar dependências SEM atualizar nada automaticamente
RUN npm ci

# Instalar nodemon globalmente (para hot reload dentro do container)
RUN npm install -g nodemon

# Copiar restante código
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Expor porta do backend
EXPOSE 5500

# Iniciar servidor com Prisma generate + hot reload
CMD ["sh", "-c", "npx prisma generate && nodemon --legacy-watch app.js"]
