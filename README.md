# Reservas Online

## Visão Geral

Projeto desenvolvido para facilitar reservas de determinados espaços e evitar conflito de horários.

## Tecnologias Utilizadas

- Node.js
- Express
- EJS
- bcrypt
- dotenv
- express-ejs-layout
- jsonwebtoken
- pg
- sequelize

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/JoaoBibito/reservaespaco-fiap.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd reservas
   ```
3. Instale as dependências:
   ```bash
      npm  install
   ```
4. Configure as variaveis de ambiente:

   ```bash
      hostDB=''
      userDB=''
      passDB=''
      portDB=''
      SECRET_JWT=''
   ```

5. Inicie o servidor:
   ```bash
      npm start
   ```

## Estrutura do projeto
```shell
  $ tree
├── controllers
│ ├── espacoController.js
│ ├── middleware.js
│ ├── reservaController.js
│ ├── userController.js
├── models
│ ├── config.js
│ ├── espaco.js
│ ├── reserva.js
│ ├── user.js
├── node_modules
├── public
│ ├── css
│ │ └── main.css
│ ├── img
│ │ └── noise-bg.png
│ ├── js
│ │ └── main.js
├── routes
│ ├── espacoRoutes.js
│ ├── reservaRoutes.js
│ ├── userRoutes.js
│ ├── viewsRoutes.js
├── views
│ ├── layout
│ │ └── main.ejs
│ ├── partials
│ │ └── header.ejs
│ │ └── footer.ejs
│ ├── 404.ejs
│ ├── addEspaco.ejs
│ ├── cadastro.ejs
│ ├── deletEspaco.ejs
│ ├── deletReserva.ejs
│ ├── editEspaco.ejs
│ ├── home.ejs
│ ├── login.ejs
│ ├── minhasReservas.ejs
│ ├── reservaEspaco.ejs
│ ├── todasReservas.ejs
├── .env
├── .gitignore
├── index.js
├── peckage-lock.json
├── peckage.json
├── README.md
```
### Documentação de pastas

#### Estrutura do Projeto

```markdown
## Estrutura do Projeto
```
