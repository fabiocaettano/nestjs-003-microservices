import { Module } from "@nestjs/common";
import { DeleteNotification } from "src/application/use-cases/delete-notification";
import { SendNotification } from "../../application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationController } from "./controller/notification-controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationController],
    providers: [
        SendNotification,
        DeleteNotification
    ]    
})
export class HttpModule {}