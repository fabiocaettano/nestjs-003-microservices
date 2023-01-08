import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";
require('dotenv').config();

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy{

    constructor(){
        super({
            client: {
                clientId: 'test-producer',
                brokers: [`${process.env.brokers}`],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: `${process.env.username}`,
                    password: `${process.env.password}`,
                },
                ssl: true,
            }
        });    
    }

    async onModuleDestroy() {
        await this.close();
    }
}