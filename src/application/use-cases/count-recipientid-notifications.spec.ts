import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notifications";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipientid-notifications";

describe('Count Recipient Notification', () => {   

    it('should be able to count recipient notification', async()=>{

        const notificationRepository = new InMemoryNotificationRepository();

        const countRecipientNotification = new CountRecipientNotifications(
            notificationRepository
        );

        await notificationRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade'),
                recipientId: 'recipient-1'
            }),
        );

        await notificationRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade'),
                recipientId: 'recipient-1'
            }),
        );

        await notificationRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade'),
                recipientId: 'recipient-2'
            }),
        );

        const { count } = await countRecipientNotification.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);

    });
});