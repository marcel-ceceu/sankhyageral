window.App = window.App || {};

function initEvents() {
  var dom = App.dom || {};
  var state = App.state;
  var ui = App.ui;

  if (dom.btnToggleCols && dom.menuCols) {
    dom.btnToggleCols.addEventListener('click', function (e) {
      e.stopPropagation();
      dom.menuCols.classList.toggle('show');
      if (dom.menuCols.classList.contains('show')) ui.renderMenuCols();
    });
    document.addEventListener('click', function () {
      dom.menuCols.classList.remove('show');
    });
  }

  document.addEventListener('click', function (e) {
    if (dom.popup && dom.popup.classList.contains('show') && !dom.popup.contains(e.target)) {
      ui.closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      ui.esconderTip();
      if (dom.popup && dom.popup.classList.contains('show')) {
        ui.closeMenu();
      }
    }
  });

  document.addEventListener('scroll', ui.esconderTip, true);

  if (dom.globalSearch) {
    dom.globalSearch.addEventListener('input', function () {
      state.globalSearch = dom.globalSearch.value;
      state.currentPage = 1;
      ui.render();
    });
  }

  if (dom.btnRefresh) {
    dom.btnRefresh.addEventListener('click', function () {
      state.selectedIds.clear();
      App.api.carregarDados();
    });
  }

  if (dom.btnClear) {
    dom.btnClear.addEventListener('click', function () {
      state.globalSearch = '';
      if (dom.globalSearch) dom.globalSearch.value = '';
      state.sort = { key: null, dir: null };
      state.selectedIds.clear();
      state.currentPage = 1;

      App.config.COLS.forEach(function (col) {
        state.quickFilters[col.key] = '';
        state.menuFilters[col.key] = {
          operator: 'contains',
          value: '',
          selected: new Set(),
          includeBlanks: true,
        };
      });

      state.filtroCotacaoRapida = false;
      if (dom.chkCotacaoRapida) dom.chkCotacaoRapida.checked = false;

      ui.closeMenu();
      ui.render();
    });
  }

  if (dom.btnExport) {
    dom.btnExport.addEventListener('click', function () {
      var dataToExport = state.selectedIds.size > 0
        ? App.data.DATA.filter(function (r) { return state.selectedIds.has(r.CODSIS); })
        : ui.getVisibleRows();

      if (dataToExport.length === 0) {
        alert('Nenhum dado para exportar!');
        return;
      }

      var headers = App.config.COLS.map(function (c) { return c.label; });
      var csvRows = [headers.join(';')];

      dataToExport.forEach(function (row) {
        var values = App.config.COLS.map(function (col) {
          var val = row[col.key] != null ? row[col.key] : '';
          val = String(val).replace(/"/g, '""');
          return '"' + val + '"';
        });
        csvRows.push(values.join(';'));
      });

      var csvContent = csvRows.join('\n');
      var blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'reposicao_decisao_' + new Date().toISOString().slice(0, 10) + '.csv';
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  if (dom.pageSize) {
    dom.pageSize.addEventListener('change', function () {
      state.pageSize = parseInt(dom.pageSize.value, 10);
      state.currentPage = 1;
      ui.render();
    });
  }

  if (dom.btnPrev) {
    dom.btnPrev.addEventListener('click', function () {
      if (state.currentPage > 1) {
        state.currentPage--;
        ui.render();
      }
    });
  }

  if (dom.btnNext) {
    dom.btnNext.addEventListener('click', function () {
      if (state.currentPage < ui.getTotalPages()) {
        state.currentPage++;
        ui.render();
      }
    });
  }

  if (dom.grid) {
    dom.grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-dec');
      if (!btn) return;

      e.stopPropagation();

      var container = btn.closest('.btns-decisao');
      if (!container) return;

      var nureg = container.dataset.nureg;
      var valorAtual = container.dataset.atual;
      var novoValor = btn.dataset.valor;

      if (valorAtual === novoValor) return;

      var rowData = App.data.DATA.find(function (r) {
        return String(r.NUREG) === String(nureg);
      });
      if (!rowData) {
        console.error('Registro não encontrado:', nureg);
        return;
      }

      var todosBotoes = container.querySelectorAll('.btn-dec');
      todosBotoes.forEach(function (b) { b.disabled = true; });
      btn.classList.add('is-loading');

      var cfg = App.config.DROPDOWN_CONFIG.decisao;
      App.api.salvarDropdown(cfg, nureg, novoValor).then(function (ok) {
        todosBotoes.forEach(function (b) { b.disabled = false; });
        btn.classList.remove('is-loading');

        if (ok) {
          ui.atualizarBotoesDecisao(container, novoValor);
          rowData.USU_DECISAO = novoValor;
          ui.showToast('✅ Salvo');
          ui.flashOk(container);
        }
      });
    });
  }

  if (dom.chkCotacaoRapida) {
    dom.chkCotacaoRapida.addEventListener('change', function () {
      state.filtroCotacaoRapida = dom.chkCotacaoRapida.checked;
      state.currentPage = 1;
      ui.render();
    });
  }
}

App.events = {
  init: initEvents,
};
