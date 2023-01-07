# Ignite Node | Microserviços | Dezembro 2022

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=red&style=for-the-badge" #vitrinedev/>
</p>

## Sumário

* [Tecnologias](#tecnologias)
* [Ferramentas](#ferramentas)
* [Projeto](#projeto)
* [Instalação](#instalação)
   - [Nvm](##nvm)
   - [Git Clone](##git-clone)
   - [Variável de Ambiente](##variável-de-ambiente)
   - [Instalar Dependências](##instalar-dependências)
   - [Migration](##migration)
* [Testes](#testes)
* [Executar](#executar)
* [Conceitos](#conceitos)
   - [Factory](#factory)
   - [Mappers](#mappers)
* [Tsconfig](#tsconfig)


## Tecnologias

<p>Tecnologias utilizadas no projeto:</p>

<ul><b>
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

<p>Neste Ignite da Rocketseat foi criado um microserviço com NestJs.</p>

<p>O caso de uso é o envio de notificações.</p>

<p>Aplicação foi divida em dois diretórios:</p>

<ul>
<li>src >> application</li>
<li>src >> infra<li>
</ul>

<p>No diretório <b>src >> aplications</b> temos as entitades, os repositórios e os casos de uso. Tudo que for independente da camada externa da aplicação.</p>

<p>No diretório <b>src >> infra</b> é referente a camada externa da aplicação. Como por exemplo Banco de dados, Controllers e serviços de mensageria</p>.


## Instalação

## Máquina Virtual

Utilizei o serviço da [Digital Ocean](https://www.digitalocean.com/) para criar 01 Droplet.
Neste Droplet será instalado o NVM para gerenciar o Node.


### NVM

<p>Gerenciador de instalação no NodeJs.</p>

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

### Git Clone

<p>Clonar o projeto:</p>

``` git
$
```

### Variável de Ambiente

<p>Criar o arquivo <b>.env</b> no diretório notifications e incluir as seguintes informações:</p>

``` env
DATABASE_URL="file:./dev.db"
```

### Instalar as Dependências

<p>Instalar as dependências: </p>

```
$ npm install
```

### Migration

<p>Criar a migartion com base no arquivo "prisma >> schema.prisma". O comando irá solicitar um nome para migration:</p>

```
$ npx prisma migrate dev
```

<p>Prisma Studio:</p>

``` bash
npx prisma studio
```

## Testes 

<p>Executar os testes criados nos diretórios <b>application >> enities</b> e <b>application >> use-cases</b>:</p>

``` cli
$ npm run test
```

<p>Para visualizar a cobertura dos testes:</p>

``` ts
$ npm run test:cov
```

<p>Por padrão o Jest vem configurado no package.json.</p>
<p>Neste laboratório o Jest foi configuardo na raiz do projeto com onome <b>jest.config.ts</b>.


## Executar

<p>Executar o projeto:</p>

``` cli
$ npm run start:dev
```

## Conceitos

### Factory
<p>Exemplo da chamada da factory:</p>

``` ts
await notificationRepository.create(makeNotification({ recipientId : 'recipient-1'}),);
await notificationRepository.create(makeNotification({ recipientId : 'recipient-1'}),);
await notificationRepository.create(makeNotification({ recipientId : 'recipient-2'}),);
```

### Mappers

<p>Mappers auxilia na representação de entidades em diversas camadas.</p>
<p>Como Exemplo a entidade Notificação dessa aplicação é representada de diferentes formas.</p>
<p>Mappers realiza a conversão e adaptação desses dados dados.</p>

<p>Mappers aplicado no retorno da inclusão de uma notificação:</p>

``` ts
import { Notification } from '@application/entities/notifications';

export class NotificationViewModel{
    static toHTTP(notification: Notification){
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId        
        }
    }   
}
```

<p>Dentro do metódo create do controller:</p>

``` ts
return {
    notification: NotificationViewModel.toHTTP(notification),
}
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

