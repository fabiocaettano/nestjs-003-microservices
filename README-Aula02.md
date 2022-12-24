# Aula 02 - Dominio, casos de uso e regras de negócio.

<p align="center">
   <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge" #vitrinedev/>
</p>

<p>Laboratório de NodeJS realizado pela Rockeseat no mês de Dezembro 2022.</p>
<p>Chamado de Ignite.</p>

## Sumário

* [Organizando os diretórios](#organizando-os-diretórios) 
* [Entidade Notification](#entidade-notification)
* [Classe Content](#classe-content)
* [Testes](#testes)
* [Helpers](#helpers)
* [Banco de Dados em Memória](#banco-de-dados-em-memória)
* [Banco de Dados SQLite](#banco-de-dados-sqlite)


## Organizando os diretórios

<p>Tudo que é relacionado a camada externa da aplicação foi colocado no diretório "src >> infra". Exemplo: Banco de dados, rotas e dtos (objeto de transferência de dados).</p>

<p>Já no diretório "src >> application" foram colocados os arquivos que são indenpendentes da camada externa da aplicação.</p>


## Entidade Notification

<p>Uma Entidade não precisa ser a cópia de uma tabela na base de dados.</p>

<p>Foi implementado Getters e Setters nesta entidade.</p>

``` ts
public set content(content: string){
    this.props.content = content;
}

public get content(): string{
    return this.props.content;
}

```

<p>Para não ocorrer conflito entre o nome do atributo e do metódo foi implementado um classe do tipo Interface para os atributos.</p> Os atritubos serão acessados através de <b>this.props</b>. Exemplo: </p>

``` ts
export interface NotificationProps{
    content: string;
    category: string;
    readtAt?: Date | null;
    createdAt: Date;
    recepientId: string;
}
```

<p>O atributo readAt possui o ponto de interrogação no final da palavra, isso indica que ele é opcional.</p>

``` ts
readtAt?: Date | null;
``` 

## Classe Content

<p>A classe Content é utilizada para validar o atributo content da entidade Notification.</p>
<p>Ao invés de string como tipo de dados para o atributo content, será utilizado a classe Content.</p>
<p>Isto deixa a classe Notification mas limpa.</p>

``` ts
export class Content {
    private readonly content: string;

    get value(): string{
        return this.content;
    }

    private validateContentLength(content: string): boolean{
        return content.length >= 5 && content.length <= 240;
    }

    constructor(content: string){
        
        const isContentLengthValid = this.validateContentLength(content);

        if (!isContentLengthValid){
            throw new Error('Content length error.');
        }

        this.content = content;
    }
}
```


## Testes

<p>Por padrão o Nest traz o JEST dentro do arquivo package.json.</p>

<p>Neste laboratório o JEST será extraido para o arquivo jest.config.ts e excluido do package.json.</p>

<p>Exemplo do arquivo content.spec.ts:</p>

``` ts
describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('você recebeu uma solicitação de amizade');      
        expect(content).toBeTruthy();
    });
    
    it('should not be able to create a notification conten with less than 5 character', () =>{    
        expect(() => new Content('aaa')).toThrow();
    });
    
    it('should not be able to create a notification conten with more than 240 character', () =>{    
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});
```
<p>Para executar o teste:</p>

``` ts
$ npm run test
```

<p>Para visualizar a cobertura dos testes:</p>

``` ts
$ npm run test:cov
```

## Helpers

<p>O atributo createdAt da classe notification não é opcional.</p>
<p>Mas este valor não deve ser instanciado.</p>
<p>Para resolver este conflito pode ser utilizado o Helpers.</p>

<p>Helpers foi configurado no diretório "src >> helpers >> Replace.ts":</p>

``` ts
export type Replace<T, R> = Omit<T, keyof R> & R;
``` 

<p> Configuração no construtor da classe Notification.</p>

```ts
constructor(props: Replace<NotificationProps, { createdAt?: Date}>){
    this.props = {
        ... props,
        createdAt: props.createdAt ?? new Date()
    }
}
```

<p>No teste abaixo o atributo createdAt não é instanciado.</p>

``` ts
describe('Notification', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação de amizade'),
            category: 'social',
            recipientId: 'example-recipient-id',
        });
        expect(notification).toBeTruthy();
    });    
});
```

## Banco de dados em memória

<p>Foi implementado a classe NotificationsRepository, no diretório "applicatio >> repository".</p>

<p>É implementado o conceito de injenção de dependência.</p>

<p>A classe InMemoryNotificationRepository irá implementar NotificationRepository. Com isso ela deve implemntar o metódo create, com a classe Notification como atributo.</p>

<p>Podendo assim regitrar o dado.</p>

``` ts
export abstract class NotificationsRepository{
    abstract create(notification: Notification): Promise<void>;
}
```

<p>Esta classe InMemoryNotificationRepository simula uma base dados. Configurado no " diretório test >> repositories".</p>

``` ts
export class InMemoryNotificationRepository implements NotificationsRepository{

    public notifications: Notification[] = [];
    
    async create(notification: Notification){
        await this.notifications.push(notification);
    }
}
```

<p>Teste para comprovar o conceito:</p>

``` ts
describe('Send Notification', () => {
    
    it('should be able to send a notification', async () =>{

    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);


    const { notification } = await sendNotification.execute({
        content: 'This is a notification',
        category: 'social',
        recipientId: 'example-recipeint-id'
    });
    
    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);

    });
});
```

## Banco de dados SQlite

<p>Na documentação do NestJs orienta que para utilizar o Prisma juntamente com o NestJs, é necessário implementar a classe PrismaService no código.</p>

<p>A classe <b>Prisma Service</b> foi implementada no diretório "src >> infra >> database >> prisma"".</p>


``` ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

<p>A classe PrimaService é configurada como providers no arquivo database-modueles.ts</p>

``` ts
@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationsRepository,
            useClass: PrismaNotificationsRepository
        },
    ],
    exports:[
        NotificationsRepository
    ],
})

export class DatabaseModule {}
``` 

<p>A classe NotificationController recebe a requisição via protocolo Http.</p>
<p>Os dados são interceptadados pelo anotação @Body, sendo seu tipo um DTO (CrateNotificationBody)</p>
<p>O controller chama a classe SendNotification</p>

``` ts
@Post()
  async create(@Body() body: CreateNotificationBody){

    const { recipientId, content, category } = body;
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return {
      notification
    }
  }  
```

<p>A classe SendNotification é um caso de uso e implementa NotificationsRepository.</p>

``` ts
@Injectable()
export class SendNotification {

    constructor(private notificationsRepository: NotificationsRepository){}

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse>{

        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });        

        await this.notificationsRepository.create(notification);

        return {
            notification,
        };
    }
}
```

<p> A classe NotificationsRepository é uma classe abstrata. </p> 

``` ts
export abstract class NotificationsRepository{
    abstract create(notification: Notification): Promise<void>;
}
```

<p>A classe PrismaNotificationsRepository implementa a classe NotificationsRepository.</p>

<p>A classe PrismaNotificationsRepository fica no diretório "infra >> database >> prima":</p>

``` ts
@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository{

    constructor(private prismaService: PrismaService){}

    async create(notification: Notification): Promise<void>{

        await this.prismaService.notification.create({
            data: {
                id: notification.id,
                category: notification.category,                
                content: notification.content.value,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt
            }
        })
    }
}
```