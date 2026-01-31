# Menu Geral APESP - Cadastros

## Arquivos Novos

```
a305-MenuGeralAPESP/
├── TESTES_VALIDACAO.sql   ← Execute ANTES de implementar
├── index.html             ← Atualizado (substitui o atual)
├── css/
│   └── cadastros.css      ← NOVO - estilos dos popups
└── js/
    ├── parceiro.js        ← NOVO - cadastro de parceiro
    └── produto.js         ← NOVO - cadastro de produto
```

## Passo a Passo

### 1. VALIDAR AMBIENTE (obrigatório)

Execute o arquivo `TESTES_VALIDACAO.sql` no Sankhya e anote os resultados:

```sql
-- TESTE CRÍTICO: Rotina 128 deve existir
SELECT NUCOD, DESCRICAO, TIPO, ATIVO FROM TSIARE WHERE NUCOD = 128;
```

**Se a rotina 128 NÃO existir**, informe para criarmos alternativa com `JX.salvar()`.

### 2. COPIAR ARQUIVOS

1. Copie `css/cadastros.css` para a pasta `css/` do projeto
2. Copie `js/parceiro.js` e `js/produto.js` para a pasta `js/`
3. Substitua o `index.html` pelo novo

### 3. VERIFICAR INCLUSÕES NO HTML

O novo `index.html` já inclui:
- Link para `css/cadastros.css`
- Scripts `js/parceiro.js` e `js/produto.js`

### 4. TESTAR

1. Abra o dashboard no Sankhya
2. Clique em "Cadastrar Novo Parceiro" → deve abrir popup
3. Clique em "Cadastrar Novo Produto" → deve abrir popup
4. Verifique se os lookups carregam (cidades, logradouros, marcas, grupos)

## Arquitetura Modular

Como haverá mais cadastros no futuro, a arquitetura é separada por entidade:

| Arquivo | Responsabilidade |
|---------|------------------|
| `parceiro.js` | Tudo relacionado a parceiro (lookups, validação, salvar) |
| `produto.js` | Tudo relacionado a produto (lookups, validação, salvar) |
| `cadastros.css` | Estilos compartilhados dos popups |

Para adicionar novos cadastros, crie um novo arquivo `js/[entidade].js` seguindo o mesmo padrão.

## Métodos Utilizados

| Cadastro | Método | Observação |
|----------|--------|------------|
| Parceiro | `JX.executarAcao(128, params)` | Rotina Java - requer rotina 128 |
| Produto | `JX.salvar(dados, 'Produto', [{}])` | Direto na entidade - sem dependência |

## Valores Fixos do Produto

Os seguintes valores são inseridos automaticamente:

```javascript
CODVOL: 'UN'
CODVOLCOMPRA: 'UN'
CSTIPIENT: 49
CSTIPISAI: 99
GRUPOICMS: 60
USALOCAL: 'S'
USOPROD: 'R'
TIPSUBST: 'A'
DESCMAX: 99
DECQTD: 2
CODIPI: 5
CLASSUBTRIB: 14
CODFORMPREC: 3
NCM: '84879000'
CODLOCALPADRAO: 101
CALCDIFAL: 'S'
```

Para alterar, edite o arquivo `js/produto.js` na função `salvarProduto()`.

## Ícones Utilizados

- Parceiro: `https://i.ibb.co/F4pdsLCS/7.png`
- Produto: `https://i.ibb.co/PZH4XvBx/buscaprod.png`
