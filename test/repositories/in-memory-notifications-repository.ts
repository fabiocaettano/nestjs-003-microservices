import { NotificationsRepository } from "src/application/repository/notifications-repository";
import { Notification } from "src/application/entities/notifications";

export class InMemoryNotificationRepository implements NotificationsRepository{    
    
    public notifications: Notification[] = [];
    
    async create(notification: Notification){
        await this.notifications.push(notification);
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find(
            (item) => item.id === notificationId,
        );

        if(!notification){
            return null;
        }

        return notification;
    }
    
    async save(notification: Notification): Promise<void> {
        
        const notificationIndex = this.notifications.findIndex(
            (item) => item.id === notification.id,
        );        

        if(notificationIndex >= 0){
           this.notifications[notificationIndex] = notification;
        }        
    }    

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(
            (notification) => notification.recipientId === recipientId
        ).length;
    }
}