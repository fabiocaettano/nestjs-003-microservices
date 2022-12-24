import { Notification } from "../entities/notifications";

export abstract class NotificationsRepository{
    abstract create(notification: Notification): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract count(id: string): Promise<any>;
}