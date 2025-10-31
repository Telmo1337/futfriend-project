# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# Estrutura do projeto



- Criação do painel (dashboard) que será dividido em duas partes principais: 
    1. Barra lateral (sidebar) - onde estão os ícones de navegação (as "abas");
    2. Zona principal (main content) - onde muda o conteúdo consoante o separador que o utilizador escolho.

Tudo isto está envolvido por um layout principal chamado DashboardLayout, que mantém o esqueleto fixo e coordena a comunicação entre as partes.


1. DashboardLayout.jsx
    Este ficheiro é o esqueleto do ecrã inteiro.
    Serve para montar o espaço principal onde a web app vive.

    O que faz?
        - Cria o estado tab, que guarda qual o separador está ativo.
        - Mostra dois blocos:
            - a barra lateral (SidebarTabs);
            - e o conteúdo principal (MainContent);
        - Passa a informação da aba ativa para os dois componentes, para que saibam qual mostrar.

2. SidebarTabs.jsx
    Este componente é a estrutura da barra lateral.
    Não mostra ícones diretamente, mas cria e organiza o background (ou espaço) que segura as duas listas de ícones:
        - as abas de cima (SidebarTopTabs.jsx);
        - as abas de baixo (SidebarBottomTabs.jsx).
    
    O que faz?
        - Usa o componente TabContext (da biblioteca MUI Lab) para guardar a aba atual;
        - Divide o espaço vertical em duas partes:
            - A parte de cima com as abas principais (Dashboard, Jogos, Estatísticas, Perfil, etc...);
            - A parte de baixo com as opções secundárias (Ajuda, Definições, Logout);
        - Recebe a função setTab do layout para atualizar a aba quando clicas num ícone.

3. SidebarTopTabs.jsx
    Este componente mostra os botões, ícones principais da app na parte superior da sidebar.

    O que faz?
        - Usa TabList e Tab (do MUI Lab) para criar uma lista vertical de ícones clicáveis.
        - Cada Tab tem um valor (value="1", "2", etc...) que identifica qual a página correspondente;
        - Define estilos visuais: 
            - muda a cor e o fundo quando a aba está selecionada;
            - desenha uma linha verde na lateral direita do botão ativo.

4. SidebarBottomTabs.jsx
    Este componente mostra os botões, ícones secundários da app na parte inferior da sidebar.

    O que faz?
        - Também usa TabList e Tab;
        - Mantém o mesmo estilo de seleção;
        - Assegura que fica fixo no fundo da barra, porque SidebarTabs usa justify-content: space-between;

5. MainContent.jsx
    Este componente é a parte central do ecrã, onde o conteúdo muda conforme a aba escolhida.
    Aqui é onde "aparecem as páginas".

    O que faz?
        - Recebe o valor atual da aba como propriedade;
        - Usa TabPanel para mostrar o conteúdo correspondente a cada aba.
            Exemplo: 
                - se o valor for "1" então mostra o <Dashboard />;
                - se o for "2" então mostra <Games/>, e assim sucessivamente;
        - Cada uma dessas páginas está numa pasta pages/

