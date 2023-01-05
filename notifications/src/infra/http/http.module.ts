import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountRecipientNotifications } from "@application/use-cases/count-recipientid-notifications";
import { GetRecipientNotifications } from "@application/use-cases/get-recipient-notifications";
import { ReadNotification } from "@application/use-cases/read-notifications";
import { UnreadNotification } from "@application/use-cases/unread-notifications";
import { Module } from "@nestjs/common";
import { SendNotification } from "../../application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationController } from "./controller/notification-controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationController],
    providers: [
        SendNotification,
        CancelNotification,
        ReadNotification,
        UnreadNotification,
        CountRecipientNotifications        ,
        GetRecipientNotifications
    ]    
})
export class HttpModule {}