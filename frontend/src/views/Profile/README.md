# Profile View

Exibe as informações do utilizador autenticado (nome, email, avatar, etc.).

## Estrutura
Profile/
├── components/
│ └── ProfileHeader.jsx # Cabeçalho com avatar e nome
├── hooks/
│ └── useProfile.js # Hook para buscar dados do utilizador
└── index.jsx # Entrada principal da view


## Lógica
`useProfile` consome o endpoint `/users/me`, que retorna os dados do utilizador logado.  
O componente `ProfileHeader` renderiza a foto e informações básicas.

## UI
A view utiliza `BaseView` para layout e estado de carregamento.
