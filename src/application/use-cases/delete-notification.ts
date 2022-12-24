import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notifications";
import { NotificationsRepository } from "../repository/notifications-repository";

interface DeleteNotificationRequest {
    id: string;    
}

interface DeleteNotificationResponse {
    id: string
}

@Injectable()
export class DeleteNotification {

    constructor(private notificationsRepository: NotificationsRepository){}

    async execute(request: DeleteNotificationRequest): Promise<DeleteNotificationResponse>{

        var { id } = request;  
        var message = "";             

        const { number } = await this.notificationsRepository.count(id);                

        if ( number > 0) {                        
            await this.notificationsRepository.delete(id);            
            message = "Successfully deleted"
        }else{
            message = "Id Not Found"
        }        

        console.log(message)
        
        return {
            id            
        };
    }
}