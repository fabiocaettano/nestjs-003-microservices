import { Content } from "./content";
import { Replace } from "src/helpers/Replace";

export interface NotificationProps{
    content: Content;
    category: string;
    readtAt?: Date | null;
    createdAt: Date;
    recipientId: string;
}

export class Notification {
    private props: NotificationProps;    
    
    constructor(props: Replace<NotificationProps, { createdAt?: Date}>){
        this.props = {
            ... props,
            createdAt: props.createdAt ?? new Date()
        }
    }

    public set content(content: Content){
        this.props.content = content;
    }

    public get content(): Content{
        return this.props.content;
    }

    public set category(category: string){
        this.props.category = category;
    }

    public get category(): string{
        return this.props.category;
    }

    public set readAt(readAt: Date | null | undefined){
        this.props.readtAt = readAt;
    }

    public get readAt(): Date | null | undefined{
        return this.props.readtAt;
    }

    public get createdAt(): Date{
        return this.props.createdAt;
    }

    public set recipientId(recipientId: string){
        this.props.recipientId = recipientId;
    }

    public get recipientId(): string{
        return this.props.recipientId;
    }
}