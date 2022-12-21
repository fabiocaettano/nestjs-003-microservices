import { Module } from "@nestjs/common";
import { NotificationsRepository } from "src/application/repository/notifications-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationsRepositories } from "./prisma/repositories/prisma-notifications-repositories";

@Module({
    providers: [PrismaService,{
        provide: NotificationsRepository,
        useClass: PrismaNotificationsRepositories
    }],
    exports:[
        NotificationsRepository
    ]
})

export class DatabaseModule {}