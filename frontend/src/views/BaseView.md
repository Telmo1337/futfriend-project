# BaseView Component

Componente genérico usado por todas as *views* para garantir consistência visual e estrutural.

## Props
| Propriedade | Tipo | Descrição |
|--------------|------|------------|
| `title` | string | Título da view (exibido no topo) |
| `loading` | boolean | Mostra um spinner enquanto dados são carregados |
| `error` | string | Mostra mensagem de erro, se existir |
| `children` | node | Conteúdo principal da view |

## Funcionalidade
- Implementa animações suaves com `framer-motion`
- Mostra `CircularProgress` durante carregamento
- Mostra `Alert` em caso de erro

Usado por todas as views: Dashboard, Games, Profile, etc.
