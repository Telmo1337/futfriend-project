Write-Host "=== Stopping Docker FutFriend Environment ==="

# Para e remove containers
docker compose down

Write-Host "=== Current container status ==="
docker ps

Write-Host "All FutFriend containers stopped successfully!"


# if error: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser