# Aula 03 - 

* [Mappers](#mappers)

## Mappers

<p>Mappers auxilia na representação de entidades em diversas camadas.</p>
<p>Como Exemplo a entidade Notificação dessa aplicação é representada de diferentes formas.</p>
<p>Mappers realiza a conversão e adaptação desses dados dados.</p>

<p>Mappers aplicado no retorno da inclusão de uma notificação:</p>

``` ts
import { Notification } from '@application/entities/notifications';

export class NotificationViewModel{
    static toHTTP(notification: Notification){
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId        
        }
    }   
}
```

<p>Dentro do metódo create do controller:</p>

``` ts
return {
    notification: NotificationViewModel.toHTTP(notification),
}
```


## Casos de Usos

### Cancel Notifications

<p>Implementado a classe NotificationNotFound, por ser um erro genérico e assim podendo ser reaproveitado.</p>

``` ts
export class NotificationNotFound extends Error {
    constructor(){
        super('Notification Not Found');
    }
}
```

<p>Incluido na classe NotificationRepository</p>

``` ts
abstract findById(notificationId: string): Promise<Notification | null>;
abstract save(notification : Notification): Promise<void>;
```

<p>Incluido o campo canceledAt na tabela Notification:</p>

``` prisma
model Notification {
  id          String @id
  recipientId String
  content     String
  category    String
  readAt      DateTime?
  canceledAt  DateTime?
  createdAt   DateTime @default(now())

  @@index([recipientId])
}
``` 

<p>Atualizar a base de dados. O comando abaixo irá solicitar um nome para o migrate:</p>

``` prisma
$ npx prisma migrate dev
```

<p>Incluido canceledAt na classe Notification:</p>

``` ts
public canceledAt(){
    this.props.canceledAt = new Date();
}

public get canceledAt(): Date | null | undefined{
    return this.props.canceledAt;
}
```

<p>Implementado o caso de uso CancelNotification:</p>

``` ts
@Injectable()
export class CancelNotification {

    constructor(private notificationsRepository: NotificationsRepository){}

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse>{

        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if(!notification){
            //throw new Error('Notification not found');
            throw new NotificationNotFound();
        }

        notification.cancel();
    }
}
```

### Count Notifications

