#!/bin/bash
# ===============================================
# Script para iniciar o ambiente Docker do FutFriend
# ===============================================

set -e  # interrompe o script se algum comando falhar

echo "===  Starting Docker FutFriend Environment ==="

# 1️ Verificar se o Docker está em execução
if ! docker info >/dev/null 2>&1; then
  echo "  Docker não está a correr. A tentar iniciar..."

  if command -v systemctl >/dev/null 2>&1; then
    sudo systemctl start docker
    sleep 5
  elif command -v open >/dev/null 2>&1 && [ "$(uname)" == "Darwin" ]; then
    echo " macOS detetado. A abrir Docker Desktop..."
    open -a Docker
    sleep 10
  else
    echo " Não foi possível iniciar o Docker automaticamente."
    echo "   Inicia-o manualmente e volta a correr este script."
    exit 1
  fi
fi

# 2️ Parar containers antigos
echo " Cleaning old containers..."
docker compose down --remove-orphans

# 3️ Construir e iniciar containers
echo "  Building images and starting containers..."
docker compose up --build -d

# 4️ Mostrar containers ativos
echo " Containers currently running:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 5️ Aplicar migrations Prisma
echo " Applying Prisma migrations..."
set +e  # não parar o script se falhar esta parte
apply_output=$(docker compose exec backend npx prisma migrate dev --name auto-migrate 2>&1)
apply_status=$?
set -e

if [ $apply_status -ne 0 ]; then
  echo "  Falha ao aplicar migrations:"
  echo "$apply_output"
  
  if grep -q "^NODE_ENV=development" .env; then
    echo " Ambiente de desenvolvimento detetado. A executar reset..."
    docker compose exec backend npx prisma migrate reset --force
    echo " Base de dados reiniciada e migrations reaplicadas."
  else
    echo " NODE_ENV não é 'development'. Reset ignorado por segurança."
  fi
else
  echo "Prisma migrations applied successfully."
fi

echo ""
echo " Backend disponível em: http://localhost:5500"
echo " Frontend disponível em: http://localhost:5173"
echo "Docker FutFriend Environment started successfully!"  

echo ""
echo "  Se tiveres erros de permissão, executa:"
echo "chmod +x start-docker.sh"