# Aula 02 - Dominio, casos de uso e regras de negócio.

## Organizando os diretórios

<p>Tudo que é relacionado a uma camada externa da aplicação será colocado no diretório "src >> infra". Exemplo: Banco de dados, rotas.</p>

<p>No diretório "src >> application" são colocados os arquivos que são indenpendentes a camada externa da aplicação.</p>

## Criando a Entidade Notification

<p>Não necessariamente uma Entidade precisa ser a cópia de uma tabela na base de dados.</p>

<p>Implementação Getters e Setters.</p>

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

## Value Objects

<p>A classe Content é utilizada para validar o atributo content.</p>
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

