# Aula 01 - Fundamentos do NestJS e Prisma

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge" #vitrinedev/>
</p>

## Sumário

* [NVM](#nvm)
* [NestJS](#nestjs)
* [Prisma](#prisma)
* [Validator](#validator)

## NVM

<p>Executar o script para instalar o NVM:</p>

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

<p>Ativar o NVM: </p>

``` bash
~/. .profile
```

<p>Comandos NVM: </p>

``` bash
nvm list-remote
nvm list
nvm insall versão
nvm use versão
```

[Site do NVM](https://github.com/nvm-sh/nvm)


## NestJS

<p>Instalar o NestJS:</p>

``` bash
$ npm i -g @nestjs/cli
```

<p>Comando para criar o projeto e selecionar o gerenciador de pacote: </p>

``` bash
$ nest new notifications-service
```

<p>Abrir pasta do projeto e execuar:</p>

``` bash
$ cd notifications-service
$ npm run start:dev
```

[Site do NestJS](https://nestjs.com/)


## Prisma

<p>Instalar o Prisma:</p>

``` bash
$ cd notifications-service
$ npm i prisma -D
$ npm install @prisma/client
```

<p>O comando abaixo cria o arquivo "prisma >> schema.prisma" e o "src >> .env" :</p>

``` bash
$ npx prisma init --datasource-provider SQLite
```

<p> No arquivo "prisma >> schema.prisma" criamos a estrutura das tabelas: </p>

``` ts
model Notification {
  id          String @id
  recipientId String
  content     String
  category    String
  readAt      DateTime?
  createdAt   DateTime @default(now())

  @@index([recipientId])
}
```

<p>Já no arquivo <b>.env</b> é incluido uma variável de ambiente para o banco de dados SQLite.</p>

``` env
DATABASE_URL="file:./dev.db"
```

<p>Cria a migration:</p>

```
$ npx prisma migrate dev
```

<p>Prisma Studio:</p>

``` bash
npx prisma studio
```

[Site do Prisma](https://www.prisma.io/)


## Validator

<p>Validar os valores das entidades:</p>

``` bash
$ npm i class-validator class-transformer
```

[Site do Class Validator](https://github.com/typestack/class-validator) |
[Site do Class Transformer](https://github.com/typestack/class-transformer)
