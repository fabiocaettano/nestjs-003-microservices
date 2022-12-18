import { IsNotEmpty , IsUUID } from "class-validator";

export class DeleteNotificationParam{

    @IsUUID()
    id: string;
}