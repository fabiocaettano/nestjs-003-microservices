import { SendNotification } from "./send-notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";

/*const notifications: Notification[] = [];

const notificationsRepository = {
    async create(notification: Notification){
        notifications.push(notification);
    },
}*/

describe('Send Notification', () => {
    
    it('should be able to send a notification', async () =>{

    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);


    const { notification } = await sendNotification.execute({
        content: 'This is a notification',
        category: 'social',
        recipientId: 'example-recipeint-id'
    });
    
    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);

    });
});