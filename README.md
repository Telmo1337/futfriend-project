## Descrição Geral

# 

O **FutFriend** é uma aplicação web **full stack** e académico, desenvolvida com o objetivo de permitir a gestão de jogos de futebol entre amigos.  
A plataforma oferece um painel completo onde os utilizadores podem **criar jogos, juntar-se a partidas de futebol, acompanhar estatísticas pessoais** e gerir tudo através de um **sistema seguro de autenticação JWT**.

* * *

## Tecnologias Utilizadas

# 

| Tecnologia | Descrição |
| --- | --- |
| Node.js + Express | Criação do servidor e definição das rotas da API |
| Prisma ORM | Comunicação com a base de dados MySQL através de modelos |
| MySQL | Sistema de base de dados relacional |
| Docker | Contém o servidor e a base de dados em containers isolados |
| JWT | Autenticação segura baseada em tokens |
| bcryptjs | Encriptação e comparação de passwords |
| Zod | Validação dos dados de entrada enviados pelo utilizador |
| dotenv | Gestão das variáveis de ambiente |

* * *

## Estrutura do Backend

# 

O backend foi implementado com **Node.js e Express**, e segue uma arquitetura **modular e organizada**.  
As rotas foram divididas por módulos principais:

*   `/auth` → Registo e login de utilizadores
    
*   `/users` → Gestão dos dados de utilizadores
    
*   `/games` → Criação, listagem e atualização de jogos
    
*   `/players` → Associação de jogadores a jogos
    

Cada rota é validada por **middlewares**, garantindo segurança e fiabilidade no tratamento dos dados.

* * *

## Código 

### /auth.routes.js

<details> <summary><strong> Lógica do registo (clicar para abrir)</strong></summary>

```js
//validação registo com zod
const registerSchema = z.object({
  email: z.string().email('invalid email'),
  name: z.string().min(2, 'name short'),
  password: z.string().min(6, 'atleast 6 chars')
});

//registo
authRouter.post('/register', async (req, res, next) => {
  try {

     const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, name, password } = result.data;

    // verificar se já existe utilizador
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'email already register' });
    }

    // hash da password
    const hashedPassword = await hashPassword(password);

    // criar novo utilizador
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    // criar token JWT
    const token = generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });

  } catch (err) {
    next(err);
  }
});
```
</details>


<details> <summary><strong> Lógica de login (clicar para abrir)</strong></summary>

```js
//validação login com zod
const loginSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(1, 'required password')
});

//login
authRouter.post('/login', async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const valid = await checkPassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    const token = await generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });


  } catch (err) {
    next(err);
  }
});
```
</details>


### /user.routes.js

<details> <summary><strong> Liddlewares para autenticação segura de utilizadores (clicar para abrir)</strong></summary>

```js
export async function hashPassword(password) {
    
    return await bcrypt.hash(password, 10);
}

export async function checkPassword(password, hashedPassword) {

    return await bcrypt.compare(password, hashedPassword);
}

export  function generateToken(payload) {
  const token = jwt.sign(
    { id: payload.id, email: payload.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  console.log(" token generated: ", token); 
  return token;
}


export async function authGuard(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'no token provided' });
    }

    const token = authHeader.split(' ')[1];


    try   {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch (err) {
        console.error(err);
        return res.status(403).json({ err: 'invalid token' });    
    }
}
```
</details>


## Sistema de Autenticação

# 

A autenticação é feita através de **JWT (JSON Web Token)**.  
Após o login, o utilizador recebe um token, que é usado para aceder às rotas protegidas da API.

**Fluxo resumido:**

1.  O utilizador faz login → o sistema valida os dados com Zod;
    
2.  A password é comparada com **bcrypt**;
    
3.  É gerado um **token JWT**;
    
4.  Esse token é usado nos headers (`Authorization: Bearer {{token}}`) em todas as rotas privadas.
    

* * *

## Base de Dados (Prisma + MySQL)

# 

A base de dados contém as seguintes tabelas:

| Tabela | Função principal | Relações |
| --- | --- | --- |
| User | Guarda dados do utilizador (login, nome, estatísticas) | 1:N → Game / 1:N → PlayersGame |
| Game | Contém os dados de cada jogo (equipas, data, local, estado) | 1:N → PlayersGame |
| PlayersGame | Liga utilizadores a jogos (equipa, golos, resultado) | N:1 → User / N:1 → Game |

* * *

### Exemplo de modelo Prisma

# 

```prisma
enum GameState {
  scheduled
  ongoing
  finished
}

enum Team {
  teamA
  teamB
}

/* --- TABELA PRINCIPAL: USER --- */
/*
Contém as propriedades:
id, email, name, password, createdAt, updatedAt, goals, victories, draws, losses
e também os jogos criados e participações.
*/
model User {
  id         String        @id @default(uuid())
  email      String        @unique
  name       String?
  password   String
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
  goals      Int           @default(0)
  victories  Int           @default(0)
  losses     Int           @default(0)
  draws      Int           @default(0)

  playersGame PlayersGame[]
  Game         Game[]       @relation("UserGames")
}

/* --- TABELA PRINCIPAL: GAME --- */
/*
Contém as propriedades:
id, teamA, teamB, goalsA, goalsB, state, date, location,
createdAt, updatedAt e também os jogadores associados.
*/
model Game {
  id          String        @id @default(uuid())
  teamA       String
  teamB       String
  goalsA      Int           @default(0)
  goalsB      Int           @default(0)
  state       GameState     @default(scheduled) // ENUM substitui a string
  date        DateTime
  location    String
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  maxPlayersPerTeam Int   @default(5)
  
  // relação com o criador do jogo
  createdById String
  createdBy   User          @relation("UserGames", fields: [createdById], references: [id], onDelete: Cascade)
  playersGame PlayersGame[]
}

/* --- TABELA INTERMÉDIA: PLAYERSGAME --- */
/*
Relação N:N entre User e Game.
Contém: id, userId, gameId, team (A ou B), score, goals, timestamps.
*/
model PlayersGame {
  id        String    @id @default(uuid())
  userId    String
  gameId    String
  team      Team      // agora usa o ENUM Team
  score     String?   // "v" (vitória), "d" (derrota), "e" (empate)
  goals     Int       @default(0)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  game Game @relation(fields: [gameId], references: [id], onDelete: Cascade)

  @@unique([userId, gameId])
}
```

* * *

## Endpoints Principais

### Auth

#### Registar utilizador

# 

`POST /api/v1/auth/register`

```json 
{
  "email": "telmo@ipvc.pt",
  "name": "Telmo",
  "password": "telmo123"
}
```

#### Login

# 

`POST /api/v1/auth/login`

```json 
{
  "email":
  "telmo@ipvc.pt",
  "password": "telmo123"
}
```

* * *

### Games

# 

`POST /api/v1/games`  
Cria um novo jogo.

```json 
{
"teamA": "Equipa A",
"teamB": "Equipa B",
"date": "2025-10-27T15:00:00Z",
"location": "Campo IPVC-ESTG" }
```

* * *

### Players

# 

`POST /api/v1/players`  
Adiciona um jogador a um jogo.

```json 
{
"userId": "uuid_user",
"gameId": "uuid_game",
"team": "A"
}
```

* * *

## Migração de XAMPP para Docker

# 

Inicialmente, o projeto usava o **XAMPP** para o MySQL.  
Com o tempo, tornou-se necessário migrar para **Docker**, para ter um ambiente mais controlado e portátil.

### Motivos da transição

# 

*   Portabilidade total → qualquer pessoa pode clonar e correr com `docker compose up --build`;
    
*   Automatização → o `docker-compose.yml` define toda a estrutura (MySQL, backend, variáveis, portas);
    
*   Isolamento → cada container funciona de forma independente;
    
*   Facilidade de replicação → o mesmo ambiente pode ser usado em desenvolvimento ou produção;
    
*   Padrão de mercado → esta prática é a mais usada em equipas DevOps.
    

### Estrutura usada

# 

*   **Container 1:** MySQL (base de dados)
    
*   **Container 2:** Node.js + Express + Prisma (backend)
    

Ambos comunicam entre si através de uma **rede interna Docker**, e não diretamente pelo `localhost`.

* * *

## Scripts úteis (package.json)

# 

| Script | Descrição | Quando usar |
| --- | --- | --- |
| npm run docker:up | Sobe containers existentes | Quando tudo já está configurado |
| npm run docker:build | Reconstrói tudo e sobe | Após alterar dependências, Dockerfile ou Prisma |
| npm run docker:down | Para e remove containers | Para limpar o ambiente |
| npm run docker:restart | Reconstrói e reinicia | Para “resetar” o projeto |
| npm run docker:logs | Ver logs em tempo real | Para debug |
| npm run docker:clean | Remove imagens/volumes antigos | Para libertar espaço |
| npm run docker:ps | Lista containers ativos | Para ver o estado atual |

* * *

## Scripts Personalizados para Docker

## 

Durante o desenvolvimento do projeto **FutFriend**, foi identificada a necessidade de simplificar a execução dos comandos Docker.  
Em vez de depender dos scripts definidos no `package.json`, foram criados **dois scripts personalizados multiplataforma** (um para **iniciar** e outro para **parar** o ambiente Docker), garantindo maior **praticidade, consistência e automação** no fluxo de trabalho.

* * *

###  Motivação para criação dos scripts

## 

O objetivo principal destes scripts foi **automatizar o processo de inicialização e encerramento do ambiente de containers**, evitando a necessidade de escrever manualmente os comandos Docker a cada execução.  
Esta abordagem oferece várias vantagens:

*   **Facilidade de uso:** basta correr um único comando (`start-docker` ou `stop-docker`) para gerir todo o ambiente;
    
*   **Consistência entre sistemas:** os scripts funcionam tanto em **Windows (PowerShell)** como em **Linux/macOS/WSL (bash)**;
    
*   **Prevenção de erros:** automatizam tarefas repetitivas e garantem que todos os containers são corretamente limpos e reconstruídos;
    
*   **Prática profissional:** este tipo de automação é comum em equipas DevOps, melhorando o controlo e a fiabilidade do ambiente de desenvolvimento.
    

* * *

###  start-docker.ps1 – Windows PowerShell

## 
```powershell
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
````

>  **Nota:** caso o PowerShell bloqueie a execução do script, é necessário permitir scripts locais com:
> 
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

* * *

###  start-docker.sh – Linux / macOS / WSL

##

```bash
#!/bin/bash
# script para inciar o ambiente Docker para o projeto FutFriend

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

```


* * *

###  stop-docker.ps1 – Windows PowerShell

## 

```powershell
Write-Host "=== Stopping Docker FutFriend Environment ==="

# Para e remove containers
docker compose down

Write-Host "=== Current container status ==="
docker ps

Write-Host "All FutFriend containers stopped successfully!"


# if error: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
* * *

###  stop-docker.sh – Linux / macOS / WSL

## 

```bash
#!/bin/bash
# script para parar o ambiente Docker para o projeto FutFriend

echo "=== Stopping Docker FutFriend Environment ==="

# Para e remove containers
docker compose down

# Mostra o estado atual (deve estar vazio)
echo "=== Current container status ==="
docker ps

echo " All FutFriend containers stopped successfully!"


#permission to run: chmod +x stop-docker.sh
```

>  **Permissão para executar os scripts (Linux / macOS / WSL):**
> 
> `chmod +x start-docker.sh chmod +x stop-docker.sh`

* * *

### Resultado

## 

Com estes dois scripts, o ambiente de desenvolvimento do **FutFriend** pode ser iniciado, reconstruído ou parado de forma totalmente automática e controlada.  
Basta correr um dos seguintes comandos conforme o sistema operativo:

| Sistema | Comando para iniciar | Comando para parar |
| --- | --- | --- |
| Windows | .\start-docker.ps1 | .\stop-docker.ps1 |
| Linux / macOS / WSL | ./start-docker.sh | ./stop-docker.sh |

Esta automação permite que qualquer programador que clone o repositório do projeto execute o mesmo ambiente de trabalho com um único comando — sem precisar configurar manualmente o MySQL, o Node.js ou o Docker Desktop.

* * *

# Estado Atual (30/10/2025) - FRONTEND

### Concluído

# 

*   Estrutura inicial do projeto (`src/components`, `src/layouts`, `src/pages`);
    
*   Criação do **layout da dashboard** (Sidebar funcional + MainContent);
    
*   **Tema global (`theme.js`)** aplicado com Material UI.
    

### A fazer

# 

*   Definir **palete de cores** no `theme.js`;
    
*   Preparar ligação com o **backend (API e BD)**;
    
*   **Integração de dados reais** na dashboard;
    
*   Implementar **autenticação** e ligação à `authStore`.
    

### Próximas etapas

# 

Após integração com o backend:

*   Adicionar **feedback visual** (sucesso, erro, carregamento);
    
*   Melhorar **responsividade** (sidebar recolhível, mobile view);
    
*   Preparar **fluxo de autenticação completo** entre frontend e API.
    

* * *

## Licença e Créditos

# 

Projeto académico desenvolvido por **Telmo Regalado**  
CTeSP – Desenvolvimento Web e Multimédia  
**Instituto Politécnico de Viana do Castelo (ESTG-IPVC)**

* * *

## Notas Finais

# 

*   Todas as rotas foram testadas via **Postman**;
    
*   O sistema pode ser expandido com estatísticas, chat entre jogadores (isto será possível através de websockets) e ranking de performances mais complexas;
    
*   Boas práticas de containers já implementadas (isolamento, persistência e automação).
