import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy{

    constructor(){
        super({
            client: {
                clientId: 'test-producer',
                brokers: ['holy-tahr-14571-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'aG9seS10YWhyLTE0NTcxJPReW3mmIXGfH-ryYerbQsdX533yB-ZYs9keMtwuOpU',
                    password: 'c60977d2264449a9a8ec2ef730f58503',
                },
                ssl: true,
            }
        });    
    }

    async onModuleDestroy() {
        await this.close();
    }
}