import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';
import { NotificationController } from '@infra/http/controller/notification-controller';
import { ReadNotification } from '@application/use-cases/read-notifications';
import { UnreadNotification } from '@application/use-cases/unread-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipientid-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Module({
    imports: [DatabaseModule],
    providers: [KafkaConsumerService, SendNotification, ReadNotification, UnreadNotification, CountRecipientNotifications,GetRecipientNotifications, CancelNotification],
    controllers: [NotificationController],
})

export class MessagingModule {}