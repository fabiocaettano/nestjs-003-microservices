import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { SendNotification } from './application/use-cases/send-notification';
import { MessagingModule } from '@infra/messaging/kafka/messaging.module';

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],  
  providers:[SendNotification],
})
export class AppModule {}
