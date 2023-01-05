# Producer

Este script **producer.js** enviará mensagens para serem consumidas pela aplicação notificação.

## 1. Serveless for Kafka

O site da [Upstash](https://upstash.com/) disponibiliza um serviço para o registro de mensagens.
<p>Ideal para aplicações assíncronas.</p>
<p>Neste serviço você criará um cluster e o tópico, é será disponibilizado algumas informações para autenticação, como broker, username e password.</p>

## 2. Variável de Ambiente

<p>Instalar dependência para não expor dados sensíveis:</p>

``` cli
npm i dotenv
```

<p>Criar o arquivo <b>.env</b> :</p>

``` env
brokers=*****
username=*****
password=*****
```

## 3. Mensagem

<p>Enviar mensagem para registrar uma notificação: </p>

``` cli
$ node producer.js
```






