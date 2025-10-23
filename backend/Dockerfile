# ==============================
# Dockerfile - Ambiente Backend
# ==============================

# Base leve e segura
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Atualizar pacotes base
RUN apk update && apk upgrade

# Copiar ficheiros de dependências
COPY package*.json ./

# Instalar dependências e o nodemon (para hot reload)
RUN npm install -g nodemon && npm install

# Copiar o restante código do projeto
COPY . .

# Gerar o Prisma Client dentro do container
RUN npx prisma generate

# Expor a porta usada pelo servidor
EXPOSE 5500

# Comando de arranque (gera Prisma se necessário e inicia servidor com hot reload)
CMD ["sh", "-c", "npx prisma generate && nodemon --legacy-watch app.js"]
