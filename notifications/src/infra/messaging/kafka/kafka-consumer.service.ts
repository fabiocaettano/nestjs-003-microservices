import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";
require('dotenv').config();

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy{

    constructor(){
        super({
            client: {
                clientId: 'test-producer',
                brokers: [`${process.env.BROKERS_UPSTASH}`],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: `${process.env.USERNAME_UPSTASH}`,
                    password: `${process.env.PASSWORD_UPSTASH}`,
                },
                ssl: true,
            }
        });    
    }

    async onModuleDestroy() {
        await this.close();
    }
}