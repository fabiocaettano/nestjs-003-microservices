# Ignite Node | Microserviços | Dezembro 2022

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=red"/>
</p>

## Sumário

* [Tecnologias](#tecnologias)
* [Ferramentas](#ferramentas)
* [Projeto](#projeto)
* [Instalação](#instalação)
   - [Nvm](##nvm)
   - [Configurar Git](#configurar-git)
   - [Git Clone](##git-clone)
   - [Variável de Ambiente](##variável-de-ambiente)
   - [Dependências](##instalar-dependências)
   - [Migration](##migration)
   - [Upstash](##upstash)
* [Tsconfig](#tsconfig)
* [Testes](#testes)
* [Executar](#executar)
* [Insomnia](#insonmnia)
   - [Project](#project)
   - [Collection](#collection)
   - [Environment](#environment)
   - [Http Request](#http-request)
* [Consumir Mensagens](#consumir-mensagens)
   


## Tecnologias

<p>Tecnologias utilizadas no projeto:</p>

<ul>
<li><b>Jest:</b> framework para testes em JavaScript.</li>
<li><b>Apache Kafka:</b> O Apache Kafka é uma plataforma distribuída de transmissão de dados que é capaz de publicar, subscrever, armazenar e processar fluxos de registro em tempo real.</li>
<li><b>NestJS:</b> É um framework back-end que auxilia o desenvolvimento de aplicações eficientes. escaláveis e confiáveis em cima do Node.js.</li>
<li><b>NodeJS:</b> Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web. A principal característica do Node.js é sua arquitetura assíncrona e orientada por eventos</li>
<li><b>Prisma:</b> É um ORM (Object Relational Mapper) de última geração.</li>
<li><b>TypeScript:</b> é uma linguagem de código aberto desenvolvida pela Microsoft que foi construída em cima do Javascript, que é muito difundido atualmente. Então esse “superset” foi criado para adicionar recursos de tipagem estáticas à linguagem original.</li>
</ul>

<p>Além das tecnologias utilizadas foram incluidas as seguintes dependências no projeto:</p>
<ul>
<li>Class-Transformer</li>
<li>Class-Validator</li>
</ul>

## Ferramentas

<ul>
<li>Insomnia</li>
<li>UpStash</li>
<li>VsCode</li>
</ul>

## Projeto 

Neste Ignite da Rocketseat foi criado um microserviço com NestJs.

O caso de uso é o envio de notificações.

Aplicação foi divida em dois diretórios: **application** e **infra**.

No diretório **src >> aplications** temos as entitades, os repositórios e os casos de uso. Tudo que for independente da camada externa da aplicação.

No diretório **src >> infra** é referente a camada externa da aplicação. Como por exemplo Banco de dados, Controllers e serviços de mensageria.


## Instalação

## Máquina Virtual

Utilizei o serviço da [Digital Ocean](https://www.digitalocean.com/) para criar 01 Droplet.

Configuração do Droplet:
1. Ubuntu 20.04;
2. 1 CPU;
3. 2 GB Memória;

Neste Droplet será instalado o NVM para gerenciar o Node.


### NVM

Gerenciador de instalação no NodeJs.

Executar o script para instalar o [NVM](https://github.com/nvm-sh/nvm) :

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

Ativar o NVM:

``` bash
~/. .profile
```

Visualizar as versões disponiveis:

``` bash
nvm list-remote
``` 

Instalar uma versão:
``` bash
nvm install vXX.XX.X
```

Checar as versões locais:

``` bash
nvm list
```

Selecionar uma versão:

```
nvm use vXX.XX.X
```

## Configurar Git

``` bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### Git Clone

Clonar o projeto:

``` git
$ https://github.com/fabiocaettano/nestjs-003-microservices.git
```

### Variável de Ambiente

Criar o arquivo <b>.env</b> no diretório notifications:

``` env
cd notifications
touch .env
```

Incluir a seguinte informação do banco de dados Prisma:

``` env
DATABASE_URL="file:./dev.db"
```

### Dependências

Instalar as dependências do aplicativo notificaions:

```
$ cd notifications
$ npm install
```

Instalar as dependências do diretório kafka-producer:

``` bash
$ cd kafka-producer
$ npm install
```

### Migration

Criar a migartion com base no arquivo "prisma >> schema.prisma". O comando irá solicitar um nome para migration:

```
$ cd notifications
$ npx prisma migrate dev
```

Prisma Studio:

``` bash
npx prisma studio
```

### Upstash

O [Upstash](https://upstash.com/) é um Serverless Data para Kafka.

Na página utilizar a opção **Console**, para criar o Cluster e o Tópico.

Será disponibilizado credencias para conectar no cluster, como brokers, username e password.

Como são dados sensiveis incluir no arquivo **.env"":

``` env
DATABASE_URL="file:./dev.db"
brokers=******
username=******
password=******
```

## Tsconfig

<p>Checar errors referente ao TypeScript:</p>

```
$ npx tsc --noEmit
```

<p>Criação de alias para os diretórios.</p>

``` json
"paths":{
      "@application/*": ["./src/application/*"],
      "@helpers/*": ["./src/helpers/*"],
      "@infra/*": ["./src/infra/*"],
      "@test/*": ["./test/*"],
    }
```

<p>A validação dos atributos ficará mais criteriosa.</p>
<p>Exemplo na validação do atributo readAT da classe Notification:</p>

``` json
"strict": false,
"strictNullChecks": true
```

## Testes 

Executar os testes criados nos diretórios <b>application >> enities</b> e <b>application >> use-cases</b>:

``` cli
$ npm run test
```

Para visualizar a cobertura dos testes:

``` ts
$ npm run test:cov
```

Por padrão o Jest vem configurado no package.json.
Neste laboratório o Jest foi configuardo na raiz do projeto com onome <b>jest.config.ts.


## Executar

Executar o projeto:

``` cli
$ cd notifications
$ npm run start:dev
```

## Insomnia

### Project
Criar um Projeto.

### Collection

Criar uma Collection.

### Environment

Clicar em "No Environment", em seguida clicar em "Manage Environments" para criar um atalho para o ip da aplicação:

Configurar o ip da aplicação:

``` bash
{
	"ip": "http://0.0.0.0:3000/"
}
```

### Http Request

Agorar criar um Http Request.

Registrar uma notificação:

``` 
Metódo: POST 
Url: {{ _.ip }}notifications 
JSON: {
	"recipientId" : "395bfedb-a518-48f0-8f9e-4e91ffcc1d22",
	"content" : "teste sete",
	"category": "categoria sete"
}
```

Contar notificações:

```
Metódo: Get
Url: {{ _.ip }}notifications/count/from/idDoRecipient
```

Pesquisar RecipientId:

```
Metódo: Get
Url: {{ _.ip }}notifications/from/idDoRecipient
```

Read:

```
{{ _.ip }}notifications/idDoRecipient/read
```

Unread:

```
{{ _.ip }}notifications/idDoRecipient/unread
```

## Consumir Mensagens

Enviar mensagem para registrar uma notificação:

``` cli
$ cd kafka-producer
$ node producer.js
```

No site do Upstah pode ser visualida o total de mensagen com status de Produced e Consumed.

