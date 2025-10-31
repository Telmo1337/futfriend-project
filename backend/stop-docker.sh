#!/bin/bash
# ===============================================
# Script to stop the Docker environment for FutFriend
# ===============================================

echo "=== Stopping Docker FutFriend Environment ==="

# Para e remove containers
docker compose down

# Mostra o estado atual (deve estar vazio)
echo "=== Current container status ==="
docker ps

echo "🧹 All FutFriend containers stopped successfully!"


#permission to run: chmod +x stop-docker.sh