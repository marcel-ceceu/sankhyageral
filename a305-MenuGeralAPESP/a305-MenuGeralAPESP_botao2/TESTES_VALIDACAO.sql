-- ============================================================
-- TESTES DE VALIDAÇÃO - Menu Geral APESP
-- Execute TODOS no Sankhya antes de implementar
-- Copie os resultados e informe quais falharam
-- ============================================================

-- ════════════════════════════════════════════════════════════
-- TESTE 1: ROTINA 128 - CADASTRO PARCEIRO (CRÍTICO!)
-- Deve retornar 1 linha. Se retornar vazio, rotina não existe.
-- ════════════════════════════════════════════════════════════
SELECT NUCOD, DESCRICAO, TIPO, ATIVO 
FROM TSIARE 
WHERE NUCOD = 128;

-- Alternativa se TSIARE não funcionar:
-- SELECT IDBOTAO, DESCRICAO FROM TSIBTA WHERE IDBOTAO = 128;


-- ════════════════════════════════════════════════════════════
-- TESTE 2: LOOKUPS - QUANTIDADE DE REGISTROS
-- Todos devem retornar QTD > 0
-- ════════════════════════════════════════════════════════════
SELECT 'CIDADES' AS TABELA, COUNT(*) AS QTD FROM TSICID
UNION ALL
SELECT 'LOGRADOUROS', COUNT(*) FROM TSIEND
UNION ALL
SELECT 'MARCAS', COUNT(*) FROM TGFMAR
UNION ALL
SELECT 'GRUPOS_PRODUTO', COUNT(*) FROM TGFGRU WHERE ATIVO = 'S';


-- ════════════════════════════════════════════════════════════
-- TESTE 3: VALORES FIXOS DO PRODUTO
-- Todos devem retornar EXISTE = 1
-- ════════════════════════════════════════════════════════════
SELECT 'CODLOCAL_101' AS PARAMETRO, 
       CASE WHEN COUNT(*) > 0 THEN 'OK' ELSE 'FALHOU' END AS STATUS
FROM TGFLOC WHERE CODLOCAL = 101
UNION ALL
SELECT 'CODFORMPREC_3',
       CASE WHEN COUNT(*) > 0 THEN 'OK' ELSE 'FALHOU' END
FROM TGFFOP WHERE CODFORMPREC = 3
UNION ALL
SELECT 'GRUPOICMS_60',
       CASE WHEN COUNT(*) > 0 THEN 'OK' ELSE 'FALHOU' END
FROM TGFGRI WHERE CODGRUPOICMS = 60;


-- ════════════════════════════════════════════════════════════
-- TESTE 4: AMOSTRA DOS LOOKUPS (verificar estrutura)
-- ════════════════════════════════════════════════════════════

-- Cidades (3 primeiras)
SELECT CODCID, NOMECID, UF FROM TSICID WHERE ROWNUM <= 3 ORDER BY NOMECID;

-- Logradouros (3 primeiros)
SELECT CODEND, NOMEEND, TIPO FROM TSIEND WHERE ROWNUM <= 3 ORDER BY NOMEEND;

-- Marcas (3 primeiras)
SELECT CODIGO, DESCRICAO FROM TGFMAR WHERE ROWNUM <= 3 ORDER BY DESCRICAO;

-- Grupos (3 primeiros ativos)
SELECT CODGRUPOPROD, DESCRGRUPOPROD FROM TGFGRU WHERE ATIVO = 'S' AND ROWNUM <= 3 ORDER BY DESCRGRUPOPROD;


-- ════════════════════════════════════════════════════════════
-- CHECKLIST DE RESULTADOS
-- ════════════════════════════════════════════════════════════
/*
Copie e preencha:

TESTE 1 - Rotina 128:
[ ] Retornou linha? (S/N): ___
[ ] ATIVO = 'S'? (S/N): ___

TESTE 2 - Lookups:
[ ] CIDADES qty: ___
[ ] LOGRADOUROS qty: ___
[ ] MARCAS qty: ___
[ ] GRUPOS_PRODUTO qty: ___

TESTE 3 - Valores Fixos:
[ ] CODLOCAL_101: ___
[ ] CODFORMPREC_3: ___
[ ] GRUPOICMS_60: ___

Se ROTINA 128 não existir, informar para criar alternativa com JX.salvar
*/
