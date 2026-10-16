# Gerenciador-de-Tarefas

aplicação web de gerenciamento de tarefas desenvolvida com next.js, React, e typeScript no frontend, integrada a uma API backend desenvolvida com Node.js e express. possui funcionalidades de gerenciamento de usuarios e tarefas, autenticação JWT e banco de dados relacional com Sequelize e login social com GitHub.
A.Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos de backend como REST APIs, banco de dados e autenticação.

## Tecnologias utilizadas:

Backend: Node.js, Express, Sequelize, MySQL, JWT, Swagger e dotenv.
### Frontend
Next.js, React, TypeScript e Tailwind CSS.

### Autenticação 
NextAuth.js e GitHub OAuth.

### Comunicação 
Fetch API e HTTP/REST.

### Versionamento 
Git e GitHub


## Funcionalidades:

cadastro, consulta, atualização, deleção e autenticação de usuários

cadastro, consulta, atualização e deleção de tarefas

Proteção de rotas com JWT

Documentação da API com Swagger


## Autenticação

A aplicação possui dois fluxos de autenticação:

- Email e senha: o frontend envia as credenciais para a API backend, que realiza a autenticação e retorna a resposta correspondente.
- GitHub OAuth: o NextAuth.js gerencia o fluxo de autenticação com o GitHub. Após a autenticação, uma rota interna do Next.js intermedeia a comunicação com o backend para concluir o login na aplicação.

O backend utiliza JWT para autenticar as requisições protegidas. O token é transportado por cookie conforme a configuração da aplicação.

## Como rodar o projeto

Como executar o projeto

Pré-requisitos

- Node.js e npm instalados.
- MySQL configurado e em execução.
- Banco de dados criado e variáveis de ambiente configuradas.
- Credenciais do GitHub OAuth configuradas, caso deseje testar o login social.

git clone https://github.com/Eric-Silva-Aprendiz/Gerenciador-de-Tarefas.git

Backend

Na raiz do repositório(gerenciador_de_tarefas), entre na pasta backend:

cd backend
npm install

Configure as variáveis de ambiente e o banco de dados conforme a configuração do projeto.

Execute as migrations:

npx sequelize-cli db:migrate

Execute os seeders:

npx sequelize-cli db:seed:all

Os seeders inserem um usuário administrador.

Inicie o servidor:

node index.js

Frontend

Em outro terminal, entre na pasta do frontend:

cd frontend
npm install

Configure as variáveis de ambiente necessárias e execute o comando de desenvolvimento definido no "package.json", normalmente:

npm run dev

## Tratamento de erros

O cliente trata erros de requisição HTTP, exibindo:

Status da resposta
Mensagem de erro da API
Erros de rede

## Documentação da API

Disponível em:

http://localhost:3000/api-docs (é necessário que o servidor esteja rodando)

## Exemplos de endpoints

Host: localhost:3000

Rota base: /api/users/ 

### Usuarios

POST /signin

POST /git/user

GET /logout

GET /session

POST /

PUT /

DELETE /

## Testes

O projeto possui estrutura para testes automatizados na pasta:

/testes

npx jest

## Frontend

### Componentes

Os componentes são responsáveis pela interface da aplicação e pela interação com o usuário. A aplicação utiliza componentes React com Next.js e TypeScript, incluindo componentes client-side para interações e componentes server-side para operações executadas no servidor.


### Main

Componente responsável pela página inicial da aplicação, exibindo o título do gerenciador de tarefas.


### NavBar

Barra de navegação principal da aplicação. Permite acessar a página inicial e a página Sobre, além de disponibilizar opções de autenticação conforme o estado da sessão do usuário.

Exibe o nome do usuário autenticado.

Disponibiliza a opção de entrar na aplicação.

Permite encerrar a sessão do usuário.


### Login

Componente responsável pela autenticação dos usuários.

Permite autenticação por email e senha utilizando a API do backend.

Disponibiliza autenticação por meio do GitHub utilizando NextAuth.

Exibe indicadores de carregamento durante as operações.

Redireciona o usuário após a autenticação bem-sucedida.


### Cadastro

Componente responsável pelo cadastro de novos usuários, coletando nome, email e senha e enviando os dados para a API do backend.

Após o cadastro bem-sucedido, o usuário é redirecionado para a página de login.


### User

Componente responsável pela atualização dos dados cadastrais do usuário autenticado.

Permite informar novos dados de perfil.

Envia as alterações para o backend.

Exibe o estado de carregamento durante a requisição.

Redireciona o usuário após a atualização bem-sucedida.


### About

Componente responsável por exibir as informações do usuário autenticado, incluindo nome e email.

Também disponibiliza opções para editar o perfil e solicitar a exclusão da conta.


### SessionProvider

Componente responsável por disponibilizar o contexto de sessão do NextAuth aos componentes clientes que utilizam useSession.


### GitHubCallback

Componente responsável pela etapa final do fluxo de autenticação via GitHub no frontend.

Após o redirecionamento do NextAuth, o componente envia uma requisição POST para o endpoint interno "/api/auth/github", que realiza a comunicação com o backend para autenticar o usuário na aplicação.

Quando a autenticação é concluída com sucesso, o usuário é redirecionado para a página inicial.


### Rota interna "/api/auth/github"

Endpoint interno do Next.js responsável por intermediar a autenticação entre o NextAuth e o backend.

Responsabilidades:

- Recuperar o token de autenticação armazenado pelo NextAuth.
- Verificar se o token de acesso do GitHub está disponível.
- Enviar o token de acesso ao endpoint de autenticação do backend.
- Repassar ao frontend a resposta do backend e o cookie de autenticação recebido.

Essa rota permite que o frontend utilize um endpoint interno do Next.js para iniciar a comunicação com o backend durante a autenticação via GitHub.

### Services

A camada de serviços centraliza as operações de comunicação com o backend e as operações relacionadas à autenticação.


### Client Services

Contém funções utilizadas no cliente para realizar requisições HTTP à API.

Principais operações:


createUser: envia os dados para cadastrar um usuário.

updateUser: solicita a atualização dos dados do usuário autenticado.

login: realiza a autenticação por email e senha.

signOutServer: solicita o encerramento da autenticação no backend.

deleteUser: solicita a exclusão da conta do usuário e inicia o encerramento das sessões de autenticação.


### Server Services

Contém funções executadas no servidor Next.js, incluindo operações relacionadas aos cookies de autenticação e consultas à API.

Principais operações:


getTokem: obtém os tokens presentes nos cookies de autenticação.

TokemExiste: verifica a existência do cookie de autenticação do usuário.

getCustomSession: consulta os dados da sessão no backend.

listarUsuarios: solicita a listagem de usuários utilizando o token administrativo.

exibirUsuarios: solicita os dados de um usuário específico.


### Páginas

A aplicação utiliza o sistema de rotas baseado em arquivos do Next.js App Router.

Página e Responsabilidade

signin: Tela de autenticação por email e senha ou GitHub.
cadastro: Tela de cadastro de usuários.
about: Exibe as informações do usuário autenticado.
meu_perfil: Permite atualizar os dados cadastrais do usuário.
sobre: Apresenta informações sobre o projeto e suas funcionalidades.
Rota dinâmica de usuáriosExibe os dados de um usuário específico e suas tarefas. 

As páginas utilizam componentes reutilizáveis para organizar a interface e, quando necessário, funções da camada de serviços para consultar ou modificar dados.


## Observações

O Backend precisa estar rodando antes do frontend


Autor

Eric Silva

Este projeto é de uso educacional.