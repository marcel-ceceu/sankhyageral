# Sk Ação Util

## Briefing

Esté é um tutorial detalhado da utilização interna na plataforma Sankhya Om.

**Nota**: Os exemplos serão baseados encima do código mais comprimido possível.

**Nota**: O código possui JSDoc em inglês para o caso de disseminação pura do arquivo e facilitação de leitura multi-lingual.

## Comandos

### _App_

`new App ()`

Este é o ambiente onde será montado o background da aplicação

**_Parâmetros_**

- `[VAZIO]` : _null_

**_Retorno_**

- `application`: _App_ - Retorna a aplicação por sí mesma

```js
var application = new App ();
```

---

`App.start (callback)`

Este método inicia a aplicação para o processamento das informações.

**_Parâmetros_**

- `callback`: _Function_ - Método que irá conter o contexto da aplicação

**_Retorno_**

- `application`: _App_ - Retorna a aplicação por sí mesma

```js
// Instancia uma nova aplicação
var application = new App ();

// Estrutura da lógica de negócios
function callback (app) {
    // Bloco de processamento aqui
    app.alert ('Hi, planet!');
};

// Starta a aplicação com a lógica de negócios
application.start (callback);
```

Versão comprimida

```js
(new App).start (function (app) {
    app.alert ('Hi, planet!');
});
```

---

`App.selection (apenasPrimeiro)`

Este método retorna toda a seleção das linhas da tabela corrente.

**_Notas_**

- O `Array <Record>` ou o `Record` selecionado por esse método não possibilita o acesso dos valores internos do objeto.

**_Parâmetros_**

- `[VAZIO]` ou `apenasPrimeiro`: _null_ | _Boolean_ - Váriavel ou condição para buscar apenas UM (o primeiro) registro ou todos os selecionados. Se _vazio_ (null), assume-se o valor FALSE.

**_Retorno_**

- `registrosSelecionados`: _Record_ | _Array \<Record\>_ - Retorna um ou mais registros das linhas selecionadas. Se não houver linhas selecionadas, retorna um `Array` ou um `Record` vazio.

```js
// Busca apenas um registro
var record = env.selection (true);

app.alert (record.SOME_FIELD);
// app.alert (record.get ('SOME_FIELD'));


// Busca todos os registros
var records = env.selection ();
//  var records = env.selection (false);

var someFieldContainer = '';
// Itera sobre todos os registros
records.forEach (
    function (record) {
        someFieldContainer += record.SOME_FIELD + ', ';
    });

// for (var i = 0; i < records.length; i++) {
//     someFieldContainer += records [i].get ('SOME_FIELD') + ', ';
// }

app.alert (someFieldContainer);
```

---

`App.upperSelection ()`

Este método retorna toda a linha selecionada da tabela pai.

**_Notas_**

- Não totalmente implementado

**_Parâmetros_**

- `[VAZIO]` : _null_

**_Retorno_**

- `registroPaiSelecionado`: _Object_ - Retorna, em estado bruto, a linha selecionada da tabela pai.

```js
// Busca a linha da tabela pai
var upperRecords = env.upperSelection (true);
```

---

`App.param (nome)`

Retorna o valor do parametro requisitado, baseado no nome fornecido.

**_Parâmetros_**

- `nome`: _String_ - Nome do parametro a ser retornado.

**_Retorno_**

- `parametro`: _String_ - Retorna o valor do parametro desejado. Se não encontrado, retorna um texto vazio.

```js
// Busca do parametro
var parameter = app.param ('SOME_PARAMETER');
```

---

`App.systemParam (nome)`

Retorna o valor do parametro do sistema (Preferências), baseado no nome fornecido.

**_Notas_**

- Não totalmente implementado

**_Parâmetros_**

- `nome`: _String_ - Nome do parametro do sistema a ser retornado.

**_Retorno_**

- `parametro`: _String_ - Retorna o valor do parametro desejado. Se não encontrado, retorna um texto vazio.

```js
// Busca do parametro
var systemParameter = app.systemParam ('SOME_SYSTEM_PARAMETER');
```

---

`App.user ()`

Retorna o usuário atualmente logado.

**_Parâmetros_**

- `[VAZIO]` : _null_

**_Retorno_**

- `usuario`: _String_ - Retorna a informação do usuário logado.

```js
// Busca do usuario
var user = app.user ();
```

---

`App.javaImport (nomeClasse)`

Adiciona uma classe Java disponível para uso dinâmico.

**_Notas_**

- Não recomendado o uso. Diferentes linguagens podem trazer diferentes comportamentos para o processamento dos valores
- Não totalmente implementado

**_Parâmetros_**

- `nomeClasse`: _String_ - Nome da classe dinâmica Java a ser importada.

**_Retorno_**

- `classeJava`: _Object_ - Retorna uma instância da classe importada.

```js
// Busca do usuario
var javaClass = app.javaImport ('JavaClass');
```

---

`App.javaStaticImport (nomeClasse)`

Adiciona uma classe Java disponível para uso estático.

**_Notas_**

- Não recomendado o uso. Diferentes linguagens podem trazer diferentes comportamentos de valores!
- Não totalmente implementado.

**_Parâmetros_**

- `nomeClasse`: _String_ - Nome da classe estática Java a ser importada.

**_Retorno_**

- `usuario`: _String_ - Retorna a classe importada.

```js
// Busca do usuario
var javaClass = app.javaImport ('JavaClass');
```

---

`App.alert (mensagem)`

Mostra uma mensagem ao usuário ao final do processamento.

**_Notas_**

- Apenas a última versão da chamada será processada.

**_Parâmetros_**

- `mensagem`: _String_ - Texto da mensagem que aparecerá ao usuário

**_Retorno_**

- `[VAZIO]` : _null_

```js
// Alerta ao usuario
app.alert ('Message to show to user!');
```

---

`App.error (mensagem)`

Mensagem de erro que será mostrada ao usuário.

**_Notas_**

- A execução da aplicação será encerrada logo que mostrada a mensagem ao usuário.

**_Parâmetros_**

- `mensagem`: _String_ - Texto da mensagem de erro que aparecerá ao usuário

**_Retorno_**

- `[VAZIO]` : _null_

```js
// Mensagem de erro
app.error ('This is an error!');
```

---

`App.assert (condicao, mensagem)`

Verifica se determinada condição é verdadeira, senão mostra uma mensagem de erro.

**_Notas_**

- A execução da aplicação será encerrada logo que mostrada um dos erros for disparado.

**_Parâmetros_**

- `condicao`: _Boolean_ - Condição que deverá ser validada como verdadeira.
- `mensagem`: _String_ - Mensagem de erro caso a condição seja FALSA.

**_Retorno_**

- `aplicacao`: _App_ - Retorna a aplicação por sí mesma

```js
// Validacao de condicao
app.assert (1 === 2, 'This message will be shown!');

// Possibilidade de encadeamento
app.
    assert (1 === 1, 'This message will not be shown!').
    assert (2 === 3, 'But this will!');
```

---

`App.confirm (titulo, mensagem)`

Mostra um alerta de confirmação para proseguir com o fluxo da aplicação. Útil como um debugger para o usuário diante de diferentes etapas.

**_Notas_**

- A execução da aplicação será encerrada logo que não aceito a confirmação da continuidade da aplicação.

**_Parâmetros_**

- `titulo`    : _String_ - Título a aparecer no alerta.
- `mensagem`  : _String_ - Mensagem a ser mostrada no alerta.

**_Retorno_**

- `aplicacao` : _App_ - Retorna a aplicação por sí mesma

```js
// Confirmacao do usuario
app.confirm ('Do You want to go ahead?');
```

---

`App.yesNo (titulo, mensagem)`

Mostra um alerta de confirmação (SIM, NÃO e CANCELAR) para tratar os dois estados da ação: SIM e NÃO.

**_Notas_**

- A execução da aplicação será encerrada se escolhida a opção Cancel (Cancelar).

**_Parâmetros_**

- `titulo`    : _String_ - Título a aparecer no alerta.
- `mensagem`  : _String_ - Mensagem a ser mostrada no alerta.

**_Retorno_**

- `aplicacao` : _Boolean_ - Retorna o resultado escolhido

```js
// Alerta de confirmacao ao usuario com SIM e NAO
if (app.yesNo ('App says', 'Do You really want to go ahead?')) {
    app.alert ('You did it!');
}
else {
    app.alert ('You gave up!');
}
```

---

`App.openPage (opcoes)`

Abre uma nova tela nativa interna do sistema.

**_Notas_**

- Não poderá ser chamada o `App.alert`, `App.error` e `App.sendTxt` após a chamada da nova página.

**_Parâmetros_**

- `opcoes`    : _Object_ - Configuração para a abertura na nova tela.
  - `id`      : _String_ - ResourceID da página a ser executada.
  - `pk`      : _Object_ - Chaves primárias a serem passadas a nova tela.
  - `params`  : _Object_ - Parâmetros a serem passados a nova tela.

**_Retorno_**

- `[VAZIO]` : _null_

```js
// Configuracao a ser passada a tela
var opt = {
    // ResourceID
    id: 'system.page.ID',
    // Chaves Primarias
    pk: {
        PK: app.selection (true).get ('ONE_COLUMN'),
        other_pk: 999
    },
    // Parâmetros
    params: {
        one_param: 'ONE_PARAM'),
        ANOTHER_param: app.selection (true).get ('ANOTHER_PARAM')
    }
}

// Chamada da tela
app.openPage (opt);
```

---

`App.sendTxt (opcoes)` **[_EXPERIMENTAL_]**

Envia mensagens de texto por Whatsapp.

**_Notas_**

- Não poderá ser chamada o `App.alert`, `App.error` e `App.openPage` após a chamada da nova página.
- É necessário o recurso rodando em um ponto de acesso configurado com o serviço.
- **Recurso não oficial da Facebook Corporation!**

**_Parâmetros_**

- `opcoes`     : _Object_ - Configuração para a requisição do envio da mensagem.
  - `ip`     : _String_ - IP do acesso ao serviço no host.
  - `port`   : _String_ - Porta de acesso ao serviço no host.
  - `session`: _String_ - Sessão atual autenticada.
  - `number` : _String_ - Número do celular alvo a ser enviado a mensagem.
  - `message`: _String_ - Mensagem a ser enviada.
  - `alert`  : _String_ - Mensagem a ser mostrada no aviso da tela.

**_Retorno_**

- `[VAZIO]` : _null_

```js
// Configuracao a ser passada para o servico de envio
var opt = {
    ip      : '192.168.0.1',
    port    : '123',
    session : 'session',
    number  : '550087654321', // Verificar nono digito no whatsapp logado
    message : 'This is a message',
    alert   : 'The message has successfully be sent'
}
// Chamada do servico de envio
app.sendTxt (opt)
```

---

### _Query_

`new Query ()`

Este é o gerenciador de comunicação com o banco de dados

**_Notas_**

- Não aconselhado iniciar uma nova instância, por ser necessário a configuração e fechamento da mesma. Use a instância do `App.query`.

**_Parâmetros_**

- `[VAZIO]` : _null_

**_Retorno_**

- `query`: _Query_ - Retorna uma nova instância do gerenciador

```js
var query = new Query ();
```

---
