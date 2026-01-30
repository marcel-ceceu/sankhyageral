window.App = window.App || {};

App.config = {
  COLS: [
    // ORDEM PRINCIPAL (conforme solicitado)
    { key: 'CODSIS',        label: 'Cód. Sistema',    width: 90,  align: 'right',  visible: true },
    { key: 'NUNOTA',        label: 'Nº Nota',         width: 90,  align: 'right',  type: 'number',  visible: true },
    { key: 'DTNEG',         label: 'Dt. Neg.',        width: 90,  align: 'center', type: 'date',    visible: true },
    { key: 'DTINSERT',      label: 'Dt. Insert',      width: 130, align: 'center', type: 'datetime', visible: true },
    { key: 'CODREF',        label: 'Cód. Ref.',       width: 150, align: 'left',   visible: true },
    { key: 'MARCA',         label: 'Marca',           width: 100, align: 'left',   visible: true },
    { key: 'CODORIG',       label: 'Cód. Original',   width: 120, align: 'left',   visible: true },
    { key: 'GRUPO',         label: 'Grupo',           width: 120, align: 'left',   visible: true },
    { key: 'PRODUTO',       label: 'Produto',         width: 250, align: 'left',   visible: true },
    { key: 'ABC',           label: 'Curva ABC',       width: 70,  align: 'center', type: 'curva',   visible: true },
    { key: 'RNK',           label: 'Ranking',         width: 80,  align: 'right',  type: 'number',  visible: true },
    { key: 'CATEG_VAL',     label: 'Categ. Valor',    width: 0,   align: 'center', visible: false },
    { key: 'CATEG',         label: 'Categoria',       width: 120, align: 'center', type: 'categoria', editable: true, visible: true },
    { key: 'STATUS',        label: 'Status',          width: 110, align: 'center', type: 'status',  visible: true },
    { key: 'AUT_STATUS',    label: 'Status Auto',     width: 110, align: 'center', type: 'status',  visible: true },
    { key: 'SUGESTAO',      label: 'Sugestão',        width: 85,  align: 'right',  type: 'number',  visible: true },
    { key: 'ORIG_ETQ',      label: 'Etq. Original',   width: 90,  align: 'right',  type: 'number',  visible: true },
    { key: 'SIM_ETQ',       label: 'Etq. Similar',    width: 90,  align: 'right',  type: 'number',  visible: true },
    { key: 'USU_DECISAO',   label: 'Decisão',         width: 145, align: 'center', type: 'decisao',  editable: true, visible: true },

    // --- OUTROS ---
    { key: 'FORNECEDOR',    label: 'Fornecedor',      width: 150, align: 'left',   visible: true },
    { key: 'COM_ULTCUS',    label: 'Custo Ult.',      width: 100, align: 'right',  type: 'currency', visible: true },
    { key: 'ORIG_MEDMES',   label: 'Média/Mês',       width: 90,  align: 'right',  type: 'decimal',  visible: true },
    { key: 'USU_QTDPEDIDO', label: 'Qtd. Pedido',     width: 90,  align: 'right',  type: 'number',   visible: true },
    { key: 'COM_DTULT',     label: 'Cód. Fornec.',    width: 100, align: 'right',  visible: false },
  ],
  SQL_MAIN: "WITH CTE_ULTIMOS AS (SELECT H.NUREG, H.NUNOTA, H.DTNEG, H.DTINSERT, H.CODPROD, H.COMPLDESC, H.DESCRPROD, H.REFFORN, H.MARCA, H.DESCRGRUPOPROD, H.AD_STATUSREP_DES, H.ORIG_COMPRA_ULTI, H.NOMEPARC, H.ORIG_CUSTO_ULTCO, H.ORIG_RANK, H.ORIG_ABC, H.ORIG_PEDVEN_MED, H.SUGESTAO_COMPRA, H.STATUS, H.QTDPEDIDO, H.DECISAO, P.AD_CATCOMPRA, ROW_NUMBER() OVER (PARTITION BY H.CODPROD ORDER BY H.NUREG DESC) AS RN FROM AD_2601COTANEWHIST H JOIN TGFPRO P ON P.CODPROD = H.CODPROD), CTE_COM_ESTOQUE AS (SELECT U.NUREG, U.NUNOTA, U.DTNEG, U.DTINSERT, U.CODPROD, U.COMPLDESC, U.DESCRPROD, U.REFFORN, U.MARCA, U.DESCRGRUPOPROD, U.AD_STATUSREP_DES, U.ORIG_COMPRA_ULTI, U.NOMEPARC, U.ORIG_CUSTO_ULTCO, U.ORIG_RANK, U.ORIG_ABC, U.ORIG_PEDVEN_MED, U.SUGESTAO_COMPRA, U.STATUS, U.QTDPEDIDO, U.DECISAO, U.AD_CATCOMPRA, COALESCE(E.ESTOQUE, 0) AS ORIG_ETQ FROM CTE_ULTIMOS U LEFT JOIN TGFEST E ON E.CODPROD = U.CODPROD AND E.CODEMP = 1 WHERE U.RN = 1) SELECT NUREG, NUNOTA, DTNEG, DTINSERT, CODPROD AS CODSIS, COMPLDESC AS CODREF, DESCRPROD AS PRODUTO, REFFORN AS CODORIG, MARCA, DESCRGRUPOPROD AS GRUPO, AD_CATCOMPRA AS CATEG_VAL, OPTION_LABEL('TGFPRO','AD_CATCOMPRA', AD_CATCOMPRA) AS CATEG, AD_STATUSREP_DES AS STATUS, ORIG_COMPRA_ULTI AS COM_DTULT, NOMEPARC AS FORNECEDOR, ORIG_CUSTO_ULTCO AS COM_ULTCUS, ORIG_RANK AS RNK, ORIG_ABC AS ABC, ORIG_ETQ, SUM(ORIG_ETQ) OVER (PARTITION BY COMPLDESC) AS SIM_ETQ, ORIG_PEDVEN_MED AS ORIG_MEDMES, SUGESTAO_COMPRA AS SUGESTAO, STATUS AS AUT_STATUS, QTDPEDIDO AS USU_QTDPEDIDO, DECISAO AS USU_DECISAO FROM CTE_COM_ESTOQUE ORDER BY CODPROD",
  DROPDOWN_CONFIG: {
    categoria: {
      instancia: 'Produto',
      campo: 'AD_CATCOMPRA',
      chaveNome: 'CODPROD',
      opcoes: [
        { value: '', label: '- Selecione -' },
        { value: '1', label: '1. REPASSE' },
        { value: '2', label: '2. REPO RAPIDA' },
        { value: '3', label: '3. REPO DEVAGAR' },
        { value: '4', label: '4. PENDENTE' },
      ],
      cores: { '1': 'categ-1', '2': 'categ-2', '3': 'categ-3', '4': 'categ-4' },
      confirmar: false,
      atualizarLocal: (row, val) => {
        row.CATEG_VAL = val;
        const mapa = { '1': '1. REPASSE', '2': '2. REPO RAPIDA', '3': '3. REPO DEVAGAR', '4': '4. PENDENTE' };
        row.CATEG = mapa[val] || '';
      }
    },
    decisao: {
      instancia: 'AD_2601COTANEWHIST',
      campo: 'DECISAO',
      chaveNome: 'NUREG',
      atualizarLocal: (row, val) => { row.USU_DECISAO = val; }
    }
  }
};
