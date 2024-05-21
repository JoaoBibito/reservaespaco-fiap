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

1. Estrutura de pastas

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

## Documentação de pastas

### controllers

Contém os controllers onde vai a logica de negócio do projeto, processamento de dados, interação com as models e formata para o frontend.

### models

Responsável pela lógica de dados, onde cada model é uma tabela no banco de dados.

### view

Contém os arquivos .EJS que são renderizados pelo servidos apra definir a interface de usuário.

- layout - Arquivo principal onde fica a base do HTML
- partials - arquivos .ejs que são reutilizaveis: header e footer

### .env

Arquivo onde fica as variaveis de ambientte do projto

### .gitignore

Arquivo que descreve quais arquivos e pastas no qual devem ser ignoradas pelo git

### index.js

Arquivo principal do servidor

### peckage.json

Descreve todos os dados do projeto como titulo, descrição, licença, autor, dependencias

## Endpoints

### Views Router:

##### GET /

Renderiza a pagina Home

#### GET /login

Renderiza a pagina de login

#### GET/ cadastro

Renderiza a pagina de cadastro

### User Router:

#### POST /login

requisição

```
Header: {
"Content-Type": "application/json"
}
body:{
   email:"",
   senha:""
}
```

resposta

```
{
   nome:"qualque",
   user_id:"10",
   user_tipo:"Operador",
   token:"token"
}
```

#### POST /cadastro

requisição

```
Header: {
"Content-Type": "application/x-www-form-urlencoded",
}
body:{
   nome:"",
   email:"",
   seha:""
}
```

resposta

```
status(200).OK
```

#### GET /minhasReservas

Renderiza pagina Minhas Reservas

#### POST /minhasReservas

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
token:"token"
}
```

resposta
renderiza cards com cada reserva

```
{
reservas:[
      {
         descricao:"Descrição reserva",
         reserva_inicio:"dd/MM/aaaa",
         reserva_fim:"dd/MM/aaaa"
      }
   ]
}
```

### Reserva Router:

#### GET /reservaEspaco/:id

Renderiza a pagina de reservar espaço

#### POST /reservaEspaço

requisição

```
Header: {
"Content-Type": "application/x-www-form-urlencoded",
}
body:{
   descricao:"Descrição reserva",
         reserva_inicio:"dd/MM/aaaa",
         reserva_fim:"dd/MM/aaaa",
         espaco_id:"1",
         user_id:"1"
}
```

resposta

```
{
res:"Reserva criada com sucesso"
}
```

#### POST/buscaReservasPorEspaco

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   espaco_id:"1"
   }
```

resposta

renderiza lista de reservas em um determinado espaço

```
{
reservas:[
   {
   title:"reserva",
   start:"dd/MM/aaaa",
   end:"dd/MM/aaaa"
   }
]
}
```

#### POST /buscarReservasPorDia

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   espaco_id:"1",
   reserva_inicio: "dd/MM/aaaa",
      reserva_fim: "dd/MM/aaaa"
      }
```

resposta

renderiza lista de horários reservados de um dia em um determinado espaço

```
{
reservas:[
   {
   title:"reserva",
   start:"dd/MM/aaaa",
   end:"dd/MM/aaaa"
   }
]
}
```

#### POST /lerReservas

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   reserva_id:"1"
   }
```

resposta

```
{
reserva:
   {
   title:"reserva",
   user_id:"1",
   espaco_id:"1"
   start:"dd/MM/aaaa",
   end:"dd/MM/aaaa"
   }

}
```

#### GET /todasReservas

Caso usuário logado for Admin renderiza a pagina com todas as reservas

#### POST /todasReservas

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   token:"token"
   }
```

resposta

se o usuario for Admin retorna as reservas

```
{
reservas:[
 {
   title:"reserva",
   user_id:"1",
   espaco_id:"1"
   start:"dd/MM/aaaa",
   end:"dd/MM/aaaa"
   }
]


}
```

#### GET /deletReserv/:id

Renderiza a pagina de exclusão de reserva

#### POST /deletReserva

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   token:"token",
   reserva_id:"1"
   }
```

resposta

```
{
status(200).OK
}
```

### Espaço Router:

#### GET /addEspaco

Renderiza paginda de Criação de espaço, somente para Admin

#### POST /addEspaco

requisição

```
Header: {
"Content-Type": "application/x-www-form-urlencoded",
}
body:{
   nome:"Qualquer",
   descricao:"Descrição reserva",
   capacidade:"10",
   imagem:"link",
   local:"rua ..",
}
```

resposta

renderiza home

```
{
status(200).OK
}
```

#### GET /lerEspaco

Renderiza cards de espaços criados

#### POST /lerEspaco

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   espaco_id:"1"
}
```

resposta

```
{
  nome:"Qualquer",
   descricao:"Descrição reserva",
   capacidade:"10",
   imagem:"link",
   local:"rua ..",
}
```

#### GET /deletEspaco/:id

Renderiza pagina de exclusão de espaço, somente para Admin

#### POST /deletEspaco

requisição

```
Header: {
"Content-Type": "application/json",
}
body:{
   espaco_id:"1"
}
```

resposta

```
{
status(200).OK
}
```
