import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { UnreadNotification } from "./unread-notifications";

describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        
        const notificationsRepository = new InMemoryNotificationRepository();
        
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readtAt: new Date(),
        });

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id,
        });                

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to unread a notification when it does not exist', () =>{

        const notificationsRepository = new InMemoryNotificationRepository();        
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(()=>{
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);       

    });
}) 