Write-Host "=== Starting Docker FutFriend Environment ==="

# 1️ Verifica se o Docker está a correr
docker info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker isn't running. Starting Docker Desktop..."
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    Start-Sleep -Seconds 10
}

# 2️ Limpa containers antigos
Write-Host "Cleaning old containers..."
docker compose down

# 3️ Constrói e sobe os containers
Write-Host "Building images and starting containers..."
docker compose up --build -d

# 4️ Mostra containers ativos
Write-Host "Containers in execution:"
docker ps

# 5️ Aplica migrations Prisma
Write-Host "Applying Prisma migrations..."
$applyResult = docker compose exec backend npx prisma migrate dev --name auto-migrate 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n  Prisma migration failed!"
    Write-Host $applyResult

    # Verifica se é ambiente de desenvolvimento
    $envNode = (Get-Content .env | Select-String -Pattern "^NODE_ENV").ToString().Split("=")[1].Trim()

    if ($envNode -eq "development") {
        Write-Host "`n Development mode detected. Running Prisma migrate reset..."
        docker compose exec backend npx prisma migrate reset --force
        Write-Host "Database reset complete. Migrations re-applied successfully."
    } else {
        Write-Host "Migration failed and NODE_ENV is not development. Skipping reset for safety."
    }
} else {
    Write-Host "`n Prisma migrations applied successfully."
}

Write-Host "`n === Docker FutFriend Environment Started ==="
Write-Host "Backend is available at: http://localhost:5500"
Write-Host "Frontend is available at: http://localhost:5173"
Write-Host "`nTip: If you get permission errors, run:"
Write-Host "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"  
