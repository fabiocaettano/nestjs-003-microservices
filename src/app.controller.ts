import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';
import { DeleteNotificationParam } from './delete-notification-param';
import { FindNotificationParam } from './find-notification-param';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  listAll()  {
    return this.prisma.notification.findMany();
  }

  @Get(':id')
  async findById(@Param() param: FindNotificationParam){
     
    const { id } = param;

    //search notification  
    const totalNotification = await this.prisma.notification.count({where: {id: id}});

    if (totalNotification == 0){
      return{
        "message" : "Notification Not Found"
      }
    }

    return this.prisma.notification.findUnique({
      where: {
        id : id
      }
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    
    const { recipientId, content, category } = body;
    const id = randomUUID();
    
    await this.prisma.notification.create({
      data: {
        id: id,
        content,
        category,
        recipientId
      }
    })

    return{
      "id":id,
      content,
      category,
      recipientId
    }
  }

  @Delete(':id')
  async delete(@Param() param: DeleteNotificationParam ){        

    const { id } = param;    
    
    //search notification  
    const totalNotification = await this.prisma.notification.count({where: {id: id}});

    if (totalNotification == 0){
      return{
        "message" : "Notification Not Found"
      }
    }
    
    //delete notification
    const deleteNotification = await this.prisma.notification.delete({where: {id: id}});

    return{      
      deleteNotification
    }
  }
}