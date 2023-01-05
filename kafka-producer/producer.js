const { Kafka } = require('kafkajs')
const { randomUUID } = require('node:crypto')
require("dotenv").config()

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: [`${process.env.brokers}`],
    sasl: {
      mechanism: 'scram-sha-256',
      username: `${process.env.username}`,
      password: `${process.env.password}`
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      },
    ],
  })

  await producer.disconnect()
}

bootstrap()
