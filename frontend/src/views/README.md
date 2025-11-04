# Views

Este diretório contém todas as *views* (secções principais) da aplicação **FutFriend**.  
Cada *view* representa uma aba ou área do painel principal (`DashboardLayout`), e segue uma estrutura modular:

ViewName/
├── components/ # Componentes específicos da view
├── hooks/ # Lógica de dados e efeitos (API, estados, etc.)
└── index.jsx # Entrada principal da view


## Estrutura atual

| View | Descrição |
|------|------------|
| `Dashboard` | Página inicial do painel com visão geral e estatísticas. |
| `Games` | Lista de jogos disponíveis e seus detalhes. |
| `Profile` | Informações do utilizador autenticado. |
| `Notifications` | Secção de notificações e alertas. |
| `Settings` | Configurações do utilizador e da aplicação. |
| `Help` | Área de suporte e contacto. |

Todas as views utilizam o componente base [`BaseView`](./BaseView.jsx), que padroniza:
- Layout e espaçamento  
- Cabeçalho (`title`)  
- Estado de carregamento (`loading`)  
- Mensagens de erro (`error`)
