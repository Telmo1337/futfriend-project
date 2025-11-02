#!/bin/bash
# ===============================================
# Script para parar o ambiente Docker do FutFriend
# ===============================================

set -e  # interrompe o script se algum comando falhar

echo "===  Stopping Docker FutFriend Environment ==="

# 1️ Verificar se o Docker está em execução
if ! docker info >/dev/null 2>&1; then
  echo "  Docker não está a correr. A tentar iniciar para parar containers..."

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

# 2️ Parar e remover containers
echo " A parar e remover containers..."
docker compose down --remove-orphans

# 3️ Mostrar o estado atual (para confirmar)
echo ""
echo " Estado atual dos containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 4️ Mensagem final
echo ""
echo " Todos os containers do FutFriend foram parados com sucesso!"
echo " Dica: podes usar './start-docker.sh' para voltar a iniciar o ambiente."

# 5️ Lembrar permissões, se necessário
echo ""
echo "  Se tiveres erros de permissão, executa:"
echo "chmod +x stop-docker.sh"
