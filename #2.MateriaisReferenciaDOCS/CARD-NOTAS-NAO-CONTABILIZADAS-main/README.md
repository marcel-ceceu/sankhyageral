# Projeto: Card notas não contabilizadas 
![Logo da ArgoFruta](https://argofruta.com/wp-content/uploads/2021/05/Logo-text-white-1.png)

# Visão Geral
Este código JSP (JavaServer Pages) gera um relatório de notas fiscais não contabilizadas no sistema Sankhya, filtrando por usuário responsável e data. O relatório exibe informações sobre notas fiscais de entrada (tipo movimento 'C') que ainda não foram contabilizadas.

# Funcionalidades Principais
- Lista notas fiscais do dia anterior que não foram contabilizadas

- Filtra notas por usuário responsável (seja pelo centro de custo principal ou por rateios)

- Permite abrir a Central de Notas diretamente clicando no número único da nota

- Exibe informações como valor, empresa, centro de resultado e status

 # Estrutura do Código
Configurações Iniciais

```
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8" isELIgnored="false"%>

```
# Define a página como JSP com codificação UTF-8

Habilita Expression Language (EL) com isELIgnored="false"

# Bibliotecas e Tags Importadas
Importa classes Java como java.util.* e br.com.sankhya.modelcore.auth.AuthenticationInfo

Utiliza taglibs JSTL (Core e Format) e tags customizadas do Sankhya (snk)

# Autenticação

```
<%
    String idUsuario = ((AuthenticationInfo) session.getAttribute("usuarioLogado")).getUserID().toString();
%>

```
- Obtém o ID do usuário logado a partir da sessão

# Consulta SQL
- A consulta principal (CabecalhoNota) realiza:

- Cria uma CTE (WITH) para obter rateios associados ao usuário

- Seleciona notas fiscais de entrada (TGFTOP.TIPMOV = 'C') do dia anterior

# Filtra por:

- Status 'L' (liberada)

- Usuário responsável pelo centro de custo principal OU com rateios associados

- Calcula valores proporcionais quando há rateio

- Verifica se a nota foi contabilizada (via TCBINT)

 # Interface do Usuário
Tabela HTML responsiva com Bootstrap

# Colunas:

- Número Único (link para Central de Notas)

- Número da Nota

- Valor (formatado como moeda)

- Código e Nome da Empresa

- Centro de Resultado

- Parceiro

- Status (Contabilizada/Não contabilizada)

- Data de Entrada/Saída

  # JavaScript
  
```
function abrirCentralNotas(nunota) {
    openApp('br.com.sankhya.com.mov.CentralNotas', {NUNOTA: nunota});
}

```


# Função para abrir a Central de Notas do Sankhya passando o número único como parâmetro

Dependências
- Bootstrap CSS (assets/bootstrap/css/bootstrap.css)

- CSS customizado (assets/css/style.css)

- Bibliotecas do Sankhya (via tag <snk:load/>)

# Como Usar
- Acesse a página no sistema Sankhya

- O relatório será gerado automaticamente mostrando as notas do dia anterior não contabilizadas

- Clique no número único para abrir a nota na Central de Notas

### USUARIOS 
- USUARIO RESPONSAVEL: Valdemi Andrade
- EMAIL : valdemi.filho@argofruta.com
