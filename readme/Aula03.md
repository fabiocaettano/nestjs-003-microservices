# Aula 03 - 

* [Mappers](#mappers)
* [Factory](#factory)
* [Casos de Uso](#casos-de-uso)
    - [Cancel Notification](##cancel-notifications)
    - [Count Recipeint Notifications](##count-recipient-notifications)

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
## Factory

<p>Abstrai criação de objetos da classe Notification:</p>

``` ts
type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}){
    return new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'recipient-2',
        ...override,
    })
}
```


<p>Exemplo da chamada da factory:</p>

``` ts
await notificationRepository.create(makeNotification({ recipientId : 'recipient-1'}),);
await notificationRepository.create(makeNotification({ recipientId : 'recipient-1'}),);
await notificationRepository.create(makeNotification({ recipientId : 'recipient-2'}),);
```


## Casos de Usos

### Cancel Notifications

<p>Implementado a classe NotificationNotFound, por ser um erro genérico e assim podendo ser reaproveitado.</p>

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

### Count Recipient Notification




