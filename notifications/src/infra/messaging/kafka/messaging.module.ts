import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';
import { NotificationsController } from './controllers/notifictions.controller';


@Module({
    imports: [DatabaseModule],
    providers: [KafkaConsumerService, SendNotification],
    controllers: [NotificationsController],
})

export class MessagingModule {}