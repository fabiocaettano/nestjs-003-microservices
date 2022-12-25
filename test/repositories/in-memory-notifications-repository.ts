import { NotificationsRepository } from "src/application/repository/notifications-repository";
import { Notification } from "src/application/entities/notifications";

export class InMemoryNotificationRepository implements NotificationsRepository{

    public notifications: Notification[] = [];
    
    async create(notification: Notification): Promise<void>{
        await this.notifications.push(notification);
    }

    async delete(id: string): Promise<void>{
        await this.notifications.length;
    }

    async count(id: string): Promise<any>{
        await this.notifications.length;
    }
    
}