# Monorepo Debt Manager

## Descrição

Este projeto é um monorepo para uma aplicação de gerenciamento de dívidas que inclui uma API, um front-end web. Utiliza `pnpm` para gerenciamento de pacotes e `Docker` para a Database.

## Requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados no seu sistema:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) ou [Rancher Desktop](https://rancherdesktop.io/)

## Instalação

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/VictorGabriel1/monorepo-debt-manager.git
cd monorepo-debt-manager
```

### Passo 2: Instale as Dependências

```bash
pnpm install
```

### Passo 3: Configure o Ambiente

- Docker: Certifique-se de que o Docker está em execução, pois vamos utilizá-lo para rodar a API.
- Rancher Desktop: Se você estiver usando o Rancher Desktop, inicie-o.

### Passo 4: Execute o Docker

- O Docker está programado para rodar na porta `5432`, verifique se a porta está disponível, pois a API se conecta com o banco nessa porta, em outro caso se for necessário alterar a porta, nos arquivos de config [packages/api/src/config/dataSource.ts](https://github.com/VictorGabriel1/monorepo-debt-manager/tree/master/packages/api/src/config/dataSource.ts) e [packages/api/src/config/typeORMconfig.ts](https://github.com/VictorGabriel1/monorepo-debt-manager/tree/master/packages/api/src/config/typeORMconfig.ts)

- Execute o Docker Compose para iniciar os serviços:
  ```bash
  docker-compose up
  ```

## Executando o Projeto

#### Aqui será necessário rodar todos os serviços em terminais diferentes, para que diminuir a chance de erros e bugs. Caso a API mostre um erro de conexão com o banco de dados, por favor, reinicie o computador e tente novamente, não desita.

- ### Executar a API

  A API estará disponível em `http://localhost:3001`. O Swagger dela estará disponível também, para a visulização e teste de todas as rotas, na em `http://localhost:3001/debt-manager/api#`

  ```bash
  pnpm api
  ```

- ### Executar o Front-end Web

  A aplicação web estará disponível em `http://localhost:3000`.

  ```bash
  pnpm web
  ```

## Funcionalidades
