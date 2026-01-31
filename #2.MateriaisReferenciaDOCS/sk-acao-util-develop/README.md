# Sk Ação Util

## Briefing

Este projeto visa facilitar o processo de criação de botões de ação internos em Script nas tabelas do Sankhya Om.

<br>

## Instalação

Basta apenas colocar o código completo do arquivo na primeira linha.

```js
"use strict";function _typeof(t){}... // Aqui vai o código minificado
```
Obs.: 
- O arquivo que deverá ser introduzido no código deverá estar no início, tendo em visto que o core do Ecmascript como o Hoisting não está presente.
- Deverá ser colocado o código minificado, pois o arquivo original contém caractéres especiais que impedem o funcionamento no sistema.

<br>

## Exemplos de Uso
```js
"use strict";function _typeof(t){}...

// Geração da instancia da aplicação
(new App).start (function (app) {

    // Criação de um novo objeto de persistência
    var record = new Record ({}).set ({ a: 'b', c: 'd' });

    // Mensagem final (e única) para o usuário
    app.alert (record.a);

});
```

Maiores informções de uso, acesse o [Tutorial](/../../tree/master/TUTORIAL.md)

## Contribuições

Para melhoria do código, será bem vindo commits que não confitem com o código atual e que tragam a melhor forma possível de resolução que a funcionalidade tenha como objetivo.

<br>

## Licensa de Uso

[UNLICENSE](https://unlicense.org) - Totalmente livre o uso, compartilhamento, modificação e comercialização.
