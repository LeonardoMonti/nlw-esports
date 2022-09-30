![Cover](.github/cover.png)

# NLW eSports

Evento da [Rocketseat](https://www.rocketseat.com.br). Aplicação Full Stack para conectar jogadores.

## Requisitos
- [Node](https://nodejs.org) versão LTS
- [npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com/getting-started/install)
- [Expo](https://docs.expo.dev/get-started/installation) caso for usar o app mobile

## Instruções
<details>
  <summary>
    <strong>Clique para ver o passo a passo 🚀</strong>
</summary><br>

1. Clone o repositório
- Use o comando: `git clone git@github.com:LeonardoMonti/nlw-esports.git`
- Entre na pasta do repositório que você acabou de clonar:
  - `cd nlw-esports`
2. Instale as dependências
- Para instalar as dependecias do backend
  - `cd server` e execute `npm install` ou `yarn` volte para a raiz usando `cd ..`
- Para instalar as dependecias do frontend
  - `cd web` e execute `npm install` ou `yarn` volte para a raiz usando `cd ..` 
3. Semeando banco de dados
- Use o comando dentro da pasta `server`
  - (IMPORTANTE) renomeie o arquivo `.env.example` para `.env`
  - `npm run seed` ou `yarn seed`
4. Inicie o servidor do backend em um terminal, rodando `npm run dev` ou `yarn dev` dentro da pasta `server`
5. Inicie o servidor da web em outro terminal, rodando `npm run dev` ou `yarn dev` dentro da pasta `web`
6. Para utilizar o aplicativo web, basta acessar o [http://localhost:5173](http://localhost:5173) em algum browser
7. Inicie o servidor do mobile em outro terminal, rodando `npx expo start` dentro da pasta `mobile`
- Para iniciar o app, basta seguir as instruções do [Expo](https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet) para iniciá-lo em um emulador ou dispositivo físico

</details>

---

## Tech Stack

- [TypeScript](https://www.typescriptlang.org)

### Backend

- [Node](https://nodejs.org)
- [Express](https://expressjs.com)
- [Prisma](https://www.prisma.io)
- [SQLite](https://www.sqlite.org/index.html)
- [yup](https://github.com/jquense/yup)

### Web

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [Tailwind](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Hook Form](https://react-hook-form.com)
- [Axios](https://axios-http.com)
- [yup](https://github.com/jquense/yup)

### Mobile

- [React](https://reactjs.org)
- [React Native](https://reactnative.dev)
- [Expo](https://docs.expo.dev/index.html)
- [React Navigation](https://reactnavigation.org)
- [Axios](https://axios-http.com)

## Alterações minhas incluem

- Responsividade no aplicativo Web
- Validação de dados no backend e na Web
- Slider para os games na Web

## Meu [Linkedin](https://www.linkedin.com/in/leonardomonti/)
