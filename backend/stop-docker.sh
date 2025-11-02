#!/bin/bash
# script para parar o ambiente Docker para o projeto FutFriend

set -e  # parar o script se algum comando falhar

echo "===  Stopping Docker FutFriend Environment ==="

# 1️ Verifica se o Docker está a correr
if ! docker info >/dev/null 2>&1; then
  echo "  O Docker não está a correr. A tentar iniciar para parar containers..."
  if command -v systemctl >/dev/null 2>&1; then
    sudo systemctl start docker
    sleep 5
  else
    echo " Não foi possível iniciar o Docker automaticamente. Inicia-o manualmente e tenta novamente."
    exit 1
  fi
fi

# 2 Para e remove containers
echo " A parar e remover containers..."
docker compose down

# 3 Mostra o estado atual
echo -e "\n=== Estado atual dos containers ==="
docker ps

# 4 Mensagem final
echo -e "\n Todos os containers do FutFriend foram parados com sucesso!"


#permission to run: chmod +x stop-docker.sh