import { Content } from "./content";
import { Replace } from "src/helpers/Replace";
import { randomUUID } from "node:crypto";

export interface NotificationProps{
    content: Content;
    category: string;
    readtAt?: Date | null;
    canceledAt?: Date | null;
    createdAt: Date;    
    recipientId: string;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;    
    
    constructor(props: Replace<NotificationProps, { createdAt?: Date}>){
        this._id = randomUUID();
        this.props = {
            ... props,
            createdAt: props.createdAt ?? new Date()
        }
    }

    public get id(){
        return this._id;
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

    public cancel(){
        this.props.canceledAt = new Date();
    }

    public get canceledAt(): Date | null | undefined{
        return this.props.canceledAt;
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