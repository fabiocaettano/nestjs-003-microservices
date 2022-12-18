# NVM

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

``` bash
~/.profile
```

<p>Comandos NVM: </p>
```
nvm list-remote
nvm list
nvm insall versão
nvm use versão
```

[NVM](https://github.com/nvm-sh/nvm)


# NestJS

<p> Instalar o nest </p>

``` bash
$ npm i -g @nestjs/cli
```

<p>criar o projeto e selecionar o gerenciador de pacote: </p>

```
$ nest new notifications-service
```

<p>Abrir pasta do projeto e execuar:</p>

``` bash
cd notifications-service

npm run start dev
```

# Prisma

``` bash
$ npm i prisma -D
$ npm install @prisma/client
```

<p>O comando abaixo vair criar o arquivo "prisma >> schema.prisma" e o "src >> .env" :</p>

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


# Validator

``` bash
$ npm i class-validator class-transformer
```
