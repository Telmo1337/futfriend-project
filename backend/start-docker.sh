#!/bin/bash
# ===============================================
# Script to start the Docker environment for FutFriend
# ===============================================

echo "=== Starting Docker FutFriend Environment ==="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker isn't running. Starting Docker Desktop..."
  sudo systemctl start docker
  sleep 5
fi

# Verifica se há containers antigos e remove
echo "Cleaning old containers..."
docker compose down

# Constrói e sobe tudo
echo "Building images and starting containers..."
docker compose up --build -d

# Mostra containers ativos
echo "Containers in execution:"
docker ps

echo "Backend is available at: http://localhost:5500"
