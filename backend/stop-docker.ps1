Write-Host "=== Stopping Docker FutFriend Environment ==="

# Verifica se o Docker está a correr
docker info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker is not running. Starting Docker Desktop..."
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    Start-Sleep -Seconds 10
}


# Tenta parar e remover containers
try {
    Write-Host "Stopping and removing containers..."
    docker compose down

    Write-Host "`n=== Current container status ==="
    docker ps

    Write-Host "`n All FutFriend containers stopped successfully!"
}
catch {
    Write-Host "`n Error stopping containers. Please ensure Docker Desktop is running."
}

Write-Host "`nTip: If you get permission errors, run:"
Write-Host "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"
