# Futfriend – API Backend

---

## Descrição

**Futfriend** é a API que suporta a aplicação de gestão de jogos de futebol entre amigos.
Permite criar partidas, gerir lobbies, inscrever jogadores, registar estatísticas individuais e controlar toda a lógica dos jogos de forma estruturada.

O sistema segue o modelo RESTful, com autenticação via JWT, validação rigorosa dos dados e uma arquitetura organizada em camadas.

---

## Funcionalidades Principais

- Registo e autenticação de utilizadores

- Criação e gestão de jogos (lobbies)

- Entrada e participação em jogos por utilizadores autenticados

- Controlo de equipas, golos, vitórias, empates e derrotas

- Consulta de estatísticas pessoais e de jogo

- Rotas protegidas com JWT

- Interação com base de dados MySQL através de Prisma ORM

---

## Tecnologias Principais

| Tecnologia | Descrição |
|-------------|------------|
| **Node.js + Express** | Framework backend |
| **Prisma ORM** | Mapeamento objeto-relacional (MySQL) |
| **MySQL** | Base de dados relacional |
| **JWT** | Autenticação segura por token |
| **bcryptjs** | Hash seguro de passwords |
| **Zod** | Validação de dados de entrada |
| **Docker** | Ambientes isolados para backend + MySQL |
| **Postman** | Testes e documentação dos endpoints |

---

## Instalação e Execução

A API do Futfriend está totalmente containerizada.
Isto significa que não é necessário instalar Node.js, MySQL ou Prisma na máquina.

Basta ter Docker instalado.

### 1. Pré-requisitos

Antes de iniciar o projeto, garante que tens:

Docker Desktop (Windows/macOS)
ou

Docker Engine + Docker Compose Plugin (Linux)

Para verificar se o Docker está ativo:

```bash
docker --version
docker compose version
```

### 2. Clonar o repositório

```bash
git clone https://github.com/Telmo1337/futfriend-project
cd futfriend-backend
```

### 3. Iniciar todo o ambiente

A partir do repositório, basta correr:
```bash
npm run projectFutFriend
```

Este comando faz automaticamente:

1.docker compose down -v
Limpa containers e volumes antigos (evita erros).

2. docker compose up -d --build

  - Cria o container MySQL

  - Cria o container do backend

  - Espera que a BD fique pronta

  - Aplica prisma migrate deploy

  - Inicia o servidor Express

Tudo isto sem qualquer intervenção manual.


### 4. Confirmar se o servidor arrancou corretamente

```bash
docker ps
```
Algo como:
```bash
futfriend-backend   Up ...
futfriend-mysql     Up (healthy)
```
Para ver os logs do backend:
```bash
docker logs -f futfriend-backend
```

### 5. Aceder ao backend

O servidor fica disponível em:
```bash
http://localhost:5500
```

### 6. Parar o ambiente

```bash
npm run projectFutFriend-stop
```

Este comando remove:

- Containers

- Rede

- Volumes (BD)

(Isto garante que cada arranque é 100% limpo.)

---

## Licença e Créditos

Projeto académico desenvolvido por **Telmo Regalado**, aluno de CTESP - Desenvolvimento Web e Multimédia - IPVC-ESTG

