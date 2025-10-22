# Futfriend – API Backend

> Aplicação web full stack para gestão de jogos de futebol entre amigos.  
> Desenvolvido por **Telmo Regalado** — CTeSP Desenvolvimento Web e Multimédia (IPVC)

---

## Descrição

O **Futfriend** é uma web app que permite aos utilizadores:
- Criar e gerir os jogos de futebol
- Participar em jogos com outros utilizadores(jogadores)
- Controlar golos, vitórias, empates e derrotas
- Gestão de autenticação com **JWT (JSON Web Token)**  
- Realizar todas as operações via **API RESTful** construída com Express + Prisma

---

## Tecnologias Principais

| Tecnologia | Descrição |
|-------------|------------|
| **Node.js + Express** | Framework backend |
| **Prisma ORM** | Mapeamento objeto-relacional (MySQL) |
| **MySQL / MariaDB** | Base de dados relacional |
| **JWT** | Autenticação segura por token |
| **bcryptjs** | Hash seguro de passwords |
| **Zod** | Validação de dados de entrada |
| **dotenv** | Gestão de variáveis de ambiente |

---

## Instalação e Execução

```bash
# 1 - Instalar dependências
npm install

# 2️ - Criar ficheiro de ambiente
touch .env.development.local

```

```javascript
PORT=5500
NODE_ENV=development
DATABASE_URL="mysql://root@localhost:3306/futfriend"
JWT_SECRET=chave_super_segura
```

```bash
# 3️- Criar estrutura da base de dados
npx prisma migrate dev --name init

# 4️- Iniciar o server
npm run dev
```

###### Servidor ativo em: http://localhost:5500

---

## Autenticação

A autenticação é baseada em JWT.
Todas as rotas protegidas exigem o header:
```css
Authorization: Bearer {{token}}
```

---

## Endpoints Principais

###### Auth

- Registo do utilizador:
**POST /api/v1/auth/register**

```json
{
  "email": "telmo@ipvc.pt",
  "name": "Telmo Alexandre",
  "password": "telmo123456"
}
```


*Resposta:*
```json
{
  "user": {
    "id": "uuid",
    "email": "telmo@ipvc.pt",
    "name": "Telmo Alexandre"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}

```

- Login:
**POST /api/v1/auth/login**
```json
{
  "email": "telmo@ipvc.pt",
  "password": "telmo123456"
}
```
*Resposta:*
```json
{
  "user": {
    "id": "uuid",
    "email": "telmo@ipvc.pt",
    "name": "Telmo Alexandre"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

###### Users

| Método     | Endpoint            | Descrição                         |
| ---------- | ------------------- | --------------------------------- |
| **GET**    | `/api/v1/users`     | Lista de todos os utilizadores      |
| **GET**    | `/api/v1/users/:id` | Obter um utilizador pelo ID       |
| **PUT**    | `/api/v1/users/:id` | Atualizar dados de um utilizador  |
| **DELETE** | `/api/v1/users/:id` | Apagar utilizador e os seus jogos |


###### Games

- Criar um jogo novo:
**POST /api/v1/games** *(requer token JWT)*
```json
{
  "teamA": "Equipa A",
  "teamB": "Equipa B",
  "date": "2025-10-27T15:00:00Z",
  "location": "Campo IPVC-ESTG"
}

```
*Resposta:*
```json
{
  "id": "uuid",
  "teamA": "Equipa A",
  "teamB": "Equipa B",
  "state": "scheduled",
  "date": "2025-10-27T15:00:00Z",
  "location": "Campo IPVC-ESTG",
  "createdById": "uuid"
}
```

| Método     | Endpoint            | Descrição                               |
| ---------- | ------------------- | --------------------------------------- |
| **GET**    | `/api/v1/games`     | Lista de todos os jogos                   |
| **GET**    | `/api/v1/games/:id` | Obter jogo pelo ID                      |
| **PUT**    | `/api/v1/games/:id` | Atualizar estado ou resultado do jogo   |
| **DELETE** | `/api/v1/games/:id` | Apagar jogo (apenas criador autorizado) |



###### Players / Participações
| Método   | Endpoint                       | Descrição                                 |
| -------- | ------------------------------ | ----------------------------------------- |
| **POST** | `/api/v1/players`              | Adicionar jogador a um jogo               |
| **GET**  | `/api/v1/players/game/:gameId` | Lista de todos os jogadores de um jogo      |
| **PUT**  | `/api/v1/players/:id`          | Atualizar estatísticas (golos, resultado) |


*Exemplo de associação:*
```json
{
  "userId": "uuid_do_user",
  "gameId": "uuid_do_jogo",
  "team": "A"
}

```

---

## Modelos da Base de Dados (Prisma)

```prisma
model User {
  id          String       @id @default(uuid())
  email       String       @unique
  name        String?
  password    String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  goals       Int          @default(0)
  victories   Int          @default(0)
  losses      Int          @default(0)
  draws       Int          @default(0)
  playersGame PlayersGame[]
  Game        Game[]
}

model Game {
  id          String        @id @default(uuid())
  teamA       String
  teamB       String
  goalsA      Int           @default(0)
  goalsB      Int           @default(0)
  state       String        @default("scheduled")
  date        DateTime
  location    String
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  createdById String
  createdBy   User          @relation(fields: [createdById], references: [id])
  playersGame PlayersGame[]
}

model PlayersGame {
  id        String    @id @default(uuid())
  userId    String
  gameId    String
  team      String
  score     String?
  goals     Int       @default(0)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id])
  game Game @relation(fields: [gameId], references: [id])

  @@unique([userId, gameId])
}

```


## Licença e Créditos

Projeto académico desenvolvido por **Telmo Regalado**, aluno de CTESP - Desenvolvimento Web e Multimédia - IPVC-ESTG

## Notas

`* Todas as rotas foram testadas via Postman.`

`* Pode ser facilmente expandido com mais estatísticas, chat entre jogadores ou até mesmo ranking de performance.`* 

## Melhorias:

`* Adicionar rate limit ou proteção contra brute-force no login (por ex. express-rate-limit), sito significa por exemplo: permitir no máximo 5 tentativas de login por 15 minutos.`* 

`* Adicionar validação extra para password (requisitos mínimos de segurança). Ou seja, atualmente o sistema pede "min(6)". Isto significa que é fraco em termos de validações... — 123456 ou abcdef passam facilmente.`* 

A solução:
(Adicionar requisitos específicos como: pelo menos 8 caracteres)
- 1 letra maiúscula
- 1 letra minúscula
- 1 número
- 1 símbolo especial


`* Adicionar melhorias no gameRouter
