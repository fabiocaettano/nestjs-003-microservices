import { Injectable } from "@nestjs/common"
import { Notification } from "src/application/entities/notifications"
import { NotificationsRepository } from "src/application/repository/notifications-repository"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository{

    constructor(private prismaService: PrismaService){}

    async create(notification: Notification): Promise<void>{

        await this.prismaService.notification.create({
            data: {
                id: notification.id,
                category: notification.category,                
                content: notification.content.value,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt
            }
        })
    }

   async delete(id: string): Promise<void>{
        await this.prismaService.notification.delete({
            where:{
                id : id
            }
        })
   }    

   async count(id: string): Promise<any>{

        const number  = await this.prismaService.notification.count({where: {id: id}})
                
        return{
            number
        }
    }   
}