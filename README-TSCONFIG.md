

<p>A validação dos atributos ficará mais criteriosa. Exemplo na validação do atributo readAT da classe Notification:</p>
``` json
"strict": false,
"strictNullChecks": true
```

<p>Criação de alias para os diretórios.</p>

``` json
"paths":{
      "@application/*": ["./src/application/*"],
      "@helpers/*": ["./src/helpers/*"],
      "@infra/*": ["./src/infra/*"],
      "@test/*": ["./test/*"],
    }
```

<p>Checar errors referente ao TypeScript:</p>
```
$ npx tsc --noEmit
```