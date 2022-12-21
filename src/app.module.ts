import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http-modules';
import { DatabaseModule } from './infra/database/database-module';
import { SendNotification } from './application/use-cases/send-notification';

@Module({
  imports: [HttpModule, DatabaseModule],  
  providers:[SendNotification],
})
export class AppModule {}
