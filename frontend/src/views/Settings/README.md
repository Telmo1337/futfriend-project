# Settings View

Permite ajustar preferências da aplicação, como notificações e tema.

## Estrutura
Settings/
├── components/
│ └── SettingItem.jsx # Linha com switch de configuração
└── index.jsx # Entrada principal


## Lógica
Cada `SettingItem` representa uma opção que pode ser alternada (`Switch`).  
Futuramente, estas configurações poderão ser guardadas em `localStorage` ou no backend.

## UI
- Interface simples com switches verticais.
- Padronizada com `BaseView`.
