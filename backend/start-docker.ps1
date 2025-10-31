Write-Host "=== Starting Docker FutFriend Environment ==="

# Verifica se o Docker está a correr
$dockerStatus = docker info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker isn't running. Starting Docker Desktop..."
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    Start-Sleep -Seconds 10
}

Write-Host "Cleaning old containers..."
docker compose down

Write-Host "Building images and starting containers..."
docker compose up --build -d    

Write-Host "Containers in execution:"
docker ps

Write-Host "Backend is available at: http://localhost:5500"
