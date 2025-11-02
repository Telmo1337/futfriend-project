#!/bin/bash
# script para inciar o ambiente Docker para o projeto FutFriend

set -e  # para o script se algum comando falhar

echo "===  Starting Docker FutFriend Environment ==="

# 1️ Verificar se o Docker está em execução
if ! docker info >/dev/null 2>&1; then
  echo "  Docker não está a correr. A tentar iniciar..."
  if command -v systemctl >/dev/null 2>&1; then
    sudo systemctl start docker
    sleep 5
  else
    echo " Não foi possível iniciar o Docker automaticamente. Inicia-o manualmente e tenta novamente."
    exit 1
  fi
fi

# 2️ Parar containers antigos
echo " Cleaning old containers..."
docker compose down

# 3️ Construir e iniciar containers
echo "  Building images and starting containers..."
docker compose up --build -d

# 4️ Mostrar containers ativos
echo " Containers currently running:"
docker ps

# 5️ Aplicar migrations Prisma
echo " Applying Prisma migrations..."
set +e  # permitir capturar erro sem terminar o script
apply_output=$(docker compose exec backend npx prisma migrate dev --name auto-migrate 2>&1)
apply_status=$?
set -e  # voltar a terminar o script se houver erros

if [ $apply_status -ne 0 ]; then
  echo "  Falha ao aplicar migrations:"
  echo "$apply_output"

  # Verifica se é ambiente de desenvolvimento
  if grep -q "^NODE_ENV=development" .env; then
    echo " Ambiente de desenvolvimento detectado. A executar 'prisma migrate reset'..."
    docker compose exec backend npx prisma migrate reset --force
    echo " Base de dados reiniciada e migrations reaplicadas."
  else
    echo " NODE_ENV não é 'development'. Reset ignorado por segurança."
  fi
else
  echo " Prisma migrations applied successfully."
fi

echo " Backend is available at: http://localhost:5500"