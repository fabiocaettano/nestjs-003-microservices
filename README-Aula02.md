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

<p>Criar uma classe para validar o atributo contents</p>

