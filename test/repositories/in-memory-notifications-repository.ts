import { NotificationsRepository } from "src/application/repository/notifications-repository";
import { Notification } from "src/application/entities/notifications";

export class InMemoryNotificationRepository implements NotificationsRepository{

    public notifications: Notification[] = [];
    
    async create(notification: Notification){
        await this.notifications.push(notification);
    }
}