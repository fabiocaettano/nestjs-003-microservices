import { IsUUID } from "class-validator";

export class FindNotificationParam{

    @IsUUID()
    id: string;
}