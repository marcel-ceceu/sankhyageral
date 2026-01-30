window.App = window.App || {};

function salvarDropdown(cfg, chaveValor, novoValor) {
  if (typeof JX === 'undefined' || typeof JX.salvar !== 'function') {
    if (App.mock) {
      console.log('🧪 Mock: salvarDropdown ignorado');
      return Promise.resolve(true);
    }
    alert('Erro: Execute dentro do ambiente Sankhya.');
    return Promise.resolve(false);
  }
  return JX.salvar(
    { [cfg.campo]: novoValor || null },
    cfg.instancia,
    { [cfg.chaveNome]: chaveValor }
  ).then(function () {
    console.log('✅ Salvo:', cfg.campo, '=', novoValor);
    return true;
  }).catch(function (err) {
    console.error('❌ Erro ao salvar:', err);
    var msg = err && (err.responseText || err.message || err.statusMessage) ||
      (typeof err === 'string' ? err : JSON.stringify(err));
    alert('Erro ao salvar: ' + msg);
    return false;
  });
}

function carregarDados() {
  var dom = App.dom || {};
  var utils = App.utils;
  if (dom.loading) {
    dom.loading.style.display = 'flex';
    dom.loading.textContent = 'Carregando dados...';
  }

  if (typeof JX === 'undefined') {
    if (App.mock && Array.isArray(App.mockData)) {
      App.data.DATA = App.mockData.slice();
      App.data.DATA_FULL = App.mockData.slice();
      if (dom.loading) dom.loading.style.display = 'none';
      if (App.ui && typeof App.ui.render === 'function') {
        App.ui.render();
      }
      return;
    }
    console.error('❌ ERRO: JX não está definido');
    if (dom.loading) {
      dom.loading.textContent = 'ERRO: Biblioteca JX não carregada. Verifique se está no ambiente Sankhya.';
    }
    return;
  }

  var todosRegistros = [];
  var loteAtual = 1;
  var tamanhoPagina = 5000;
  var continuar = true;

  function carregarProximoLote() {
    if (!continuar) return;

    var offsetInicio = (loteAtual - 1) * tamanhoPagina + 1;
    var offsetFim = loteAtual * tamanhoPagina;

    var sqlPaginado =
      'SELECT * FROM (' +
      '  SELECT ' +
      '    NUREG, NUNOTA, DTNEG, DTINSERT, CODPROD AS CODSIS, COMPLDESC AS CODREF, ' +
      '    DESCRPROD AS PRODUTO, REFFORN AS CODORIG, MARCA, DESCRGRUPOPROD AS GRUPO, ' +
      '    AD_CATCOMPRA AS CATEG_VAL, OPTION_LABEL(\'TGFPRO\',\'AD_CATCOMPRA\', AD_CATCOMPRA) AS CATEG, ' +
      '    AD_STATUSREP_DES AS STATUS, ORIG_COMPRA_ULTI AS COM_DTULT, NOMEPARC AS FORNECEDOR, ' +
      '    ORIG_CUSTO_ULTCO AS COM_ULTCUS, ORIG_RANK AS RNK, ORIG_ABC AS ABC, ORIG_ETQ, ' +
      '    SUM(ORIG_ETQ) OVER (PARTITION BY COMPLDESC) AS SIM_ETQ, ' +
      '    ORIG_PEDVEN_MED AS ORIG_MEDMES, SUGESTAO_COMPRA AS SUGESTAO, STATUS AS AUT_STATUS, ' +
      '    QTDPEDIDO AS USU_QTDPEDIDO, DECISAO AS USU_DECISAO, ' +
      '    ROW_NUMBER() OVER (ORDER BY CODPROD) AS RN ' +
      '  FROM (' +
      '    WITH CTE_ULTIMOS AS (' +
      '      SELECT H.NUREG, H.NUNOTA, H.DTNEG, H.DTINSERT, H.CODPROD, H.COMPLDESC, H.DESCRPROD, ' +
      '        H.REFFORN, H.MARCA, H.DESCRGRUPOPROD, H.AD_STATUSREP_DES, H.ORIG_COMPRA_ULTI, ' +
      '        H.NOMEPARC, H.ORIG_CUSTO_ULTCO, H.ORIG_RANK, H.ORIG_ABC, H.ORIG_PEDVEN_MED, ' +
      '        H.SUGESTAO_COMPRA, H.STATUS, H.QTDPEDIDO, H.DECISAO, P.AD_CATCOMPRA, ' +
      '        ROW_NUMBER() OVER (PARTITION BY H.CODPROD ORDER BY H.NUREG DESC) AS RN ' +
      '      FROM AD_2601COTANEWHIST H ' +
      '      JOIN TGFPRO P ON P.CODPROD = H.CODPROD' +
      '    ), ' +
      '    CTE_COM_ESTOQUE AS (' +
      '      SELECT U.NUREG, U.NUNOTA, U.DTNEG, U.DTINSERT, U.CODPROD, U.COMPLDESC, U.DESCRPROD, ' +
      '        U.REFFORN, U.MARCA, U.DESCRGRUPOPROD, U.AD_STATUSREP_DES, U.ORIG_COMPRA_ULTI, ' +
      '        U.NOMEPARC, U.ORIG_CUSTO_ULTCO, U.ORIG_RANK, U.ORIG_ABC, U.ORIG_PEDVEN_MED, ' +
      '        U.SUGESTAO_COMPRA, U.STATUS, U.QTDPEDIDO, U.DECISAO, U.AD_CATCOMPRA, ' +
      '        COALESCE(E.ESTOQUE, 0) AS ORIG_ETQ ' +
      '      FROM CTE_ULTIMOS U ' +
      '      LEFT JOIN TGFEST E ON E.CODPROD = U.CODPROD AND E.CODEMP = 1 ' +
      '      WHERE U.RN = 1' +
      '    ) ' +
      '    SELECT * FROM CTE_COM_ESTOQUE' +
      '  )' +
      ') WHERE RN >= ' + offsetInicio + ' AND RN <= ' + offsetFim;

    if (dom.loading) {
      dom.loading.textContent = 'Carregando lote ' + loteAtual + ' (' + todosRegistros.length + ' registros)...';
    }

    JX.consultar(sqlPaginado)
      .then(function (resultado) {
        var rows = utils.normalizeRows(utils.extractRows(resultado));

        console.log('📦 Lote ' + loteAtual + ' carregado:', rows.length, 'registros');

        if (!rows || rows.length === 0) {
          finalizarCarregamento();
          return;
        }

        todosRegistros = todosRegistros.concat(rows);

        if (rows.length < tamanhoPagina) {
          finalizarCarregamento();
        } else {
          loteAtual++;
          setTimeout(carregarProximoLote, 100);
        }
      })
      .catch(function (erro) {
        continuar = false;
        var msg = utils.getErrorMessage(erro);
        console.error('❌ Erro ao carregar lote ' + loteAtual + ':', erro);
        if (dom.loading) {
          dom.loading.innerHTML =
            '<div style="color:#dc2626;background:#fee2e2;padding:20px;border-radius:8px;text-align:left;margin:20px;">' +
              '<b>❌ ERRO ao carregar lote ' + loteAtual + ':</b> ' + utils.escapeHtml(msg) +
            '</div>';
        }
      });
  }

  function finalizarCarregamento() {
    continuar = false;

    if (todosRegistros.length === 0) {
      if (dom.loading) {
        dom.loading.innerHTML =
          '<div style="color:#b45309;background:#fef3c7;padding:20px;border-radius:8px;text-align:left;margin:20px;">' +
            '<b>⚠️ Nenhum registro encontrado</b><br>' +
            '<span style="font-size:12px;opacity:.85">Verifique os filtros ou a consulta SQL.</span>' +
          '</div>';
      }
      return;
    }

    App.data.DATA = todosRegistros;
    App.data.DATA_FULL = todosRegistros;

    console.log('✅ CARREGAMENTO COMPLETO:', todosRegistros.length, 'registros');
    console.log('📊 Esperado: ~26.039 registros');

    if (todosRegistros.length >= 20000) {
      console.log('✅ Todos os registros foram carregados com sucesso!');
    } else if (todosRegistros.length >= 5000) {
      console.warn('⚠️ Carregados ' + todosRegistros.length + ' registros. Esperado: ~26.039');
    } else {
      console.error('❌ ATENÇÃO: Apenas ' + todosRegistros.length + ' registros! Verifique a consulta.');
    }

    if (dom.loading) dom.loading.style.display = 'none';
    if (App.ui && typeof App.ui.render === 'function') {
      App.ui.render();
    }
  }

  carregarProximoLote();
}

App.api = {
  carregarDados: carregarDados,
  salvarDropdown: salvarDropdown,
};
