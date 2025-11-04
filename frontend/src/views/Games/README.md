# Games View

Apresenta a lista de jogos do utilizador ou da comunidade.

## Estrutura
Games/
├── components/
│ └── GameCard.jsx # Cartão individual de jogo
├── hooks/
│ └── useGames.js # Hook para buscar jogos via API
└── index.jsx # Entrada principal da view


## Lógica
O hook `useGames` faz uma requisição a `/games` e retorna:
- `games`: lista de jogos
- `loading`: estado de carregamento
- `error`: mensagem em caso de falha

## UI
Cada jogo é exibido num `<GameCard />` com:
- Nome  
- Data  
- Localização  
