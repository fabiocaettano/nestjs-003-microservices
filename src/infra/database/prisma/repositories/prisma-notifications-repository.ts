import { Injectable } from "@nestjs/common"
import { Notification } from "src/application/entities/notifications"
import { NotificationsRepository } from "src/application/repository/notifications-repository"
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository{

    constructor(private prismaService: PrismaService){}

    async create(notification: Notification): Promise<void>{

        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.create({
            data: raw
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