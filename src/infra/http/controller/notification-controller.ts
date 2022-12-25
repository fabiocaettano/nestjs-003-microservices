import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { DeleteNotification } from 'src/application/use-cases/delete-notification';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { DeleteNotificationParam } from '../dto/delete-notification-param';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {

  constructor(
    private sendNotification: SendNotification,
    private deleteNotification: DeleteNotification
    ){}

  @Post()
  async create(@Body() body: CreateNotificationBody){

    const { recipientId, content, category } = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    }
  }  

  @Delete(':id')
  async delete(@Param() param: DeleteNotificationParam){

    const { id } = param;

    await this.deleteNotification.execute({id});

    return{
      id
    }

  }
}