export interface NotificationProps{
    content: string;
    category: string;
    readtAt?: Date | null;
    createdAt: Date;
    recepientId: string;
}

export class Notification {
    private props: NotificationProps;    
    
    constructor(props: NotificationProps){
        this.props = props;
    }

    public set content(content: string){
        this.props.content = content;
    }

    public get content(): string{
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
        this.props.recepientId = recipientId;
    }

    public get recipientId(): string{
        return this.props.recepientId;
    }
}