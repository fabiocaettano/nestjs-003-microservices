import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { ReadNotification } from "./read-notifications";

describe('Read notification', () => {
    it('should be able to send a notification', async () => {
        
        const notificationsRepository = new InMemoryNotificationRepository();
        
        const readNotification = new ReadNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });                

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date),
        );
    });

    it('should not be able to read a notification when it does not exist', () =>{

        const notificationsRepository = new InMemoryNotificationRepository();        
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(()=>{
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);       

    });
}) 