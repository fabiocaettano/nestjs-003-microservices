

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

<p>Configurando Jest:</p>

``` ts
import { Config } from "jest";
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
    "moduleFileExtensions": ["js","json","ts"],      
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths,{
        prefix: '<rootDir>/',
    }),
};
```