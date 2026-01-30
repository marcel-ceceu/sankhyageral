window.App = window.App || {};

function initDom() {
  App.dom = {
    grid: document.getElementById('gridScroll'),
    popup: document.getElementById('popup'),
    chkCotacaoRapida: document.getElementById('chkCotacaoRapida'),
    globalSearch: document.getElementById('globalSearch'),
    btnToggleCols: document.getElementById('btnToggleCols'),
    menuCols: document.getElementById('menuCols'),
    btnRefresh: document.getElementById('btnRefresh'),
    btnClear: document.getElementById('btnClear'),
    btnExport: document.getElementById('btnExport'),
    pageSize: document.getElementById('pageSize'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    pageInfo: document.getElementById('pageInfo'),
    selectionInfo: document.getElementById('selectionInfo'),
    totalInfo: document.getElementById('totalInfo'),
    loading: document.getElementById('loading'),
    appToast: document.getElementById('appToast'),
    tooltip: document.getElementById('tooltipSimilar'),
  };
}

function showToast(msg, ms) {
  var dom = App.dom || {};
  if (!dom.appToast) return;
  dom.appToast.textContent = msg || '';
  dom.appToast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () {
    dom.appToast.classList.remove('show');
  }, ms || 1800);
}

function flashOk(el, ms) {
  if (!el) return;
  el.classList.add('flash-ok');
  setTimeout(function () { el.classList.remove('flash-ok'); }, ms || 900);
}

function mostrarTip(el, html) {
  var dom = App.dom || {};
  if (!dom.tooltip) return;
  dom.tooltip.innerHTML = html;
  dom.tooltip.classList.add('show');
  var r = el.getBoundingClientRect();
  var x = r.right + 8;
  var y = r.top - 4;
  if (x + 320 > innerWidth) x = r.left - 320;
  if (y + dom.tooltip.offsetHeight > innerHeight) y = innerHeight - dom.tooltip.offsetHeight - 8;
  dom.tooltip.style.cssText = 'left:' + Math.max(8, x) + 'px;top:' + Math.max(8, y) + 'px';
}

function esconderTip() {
  var dom = App.dom || {};
  if (dom.tooltip) dom.tooltip.classList.remove('show');
}

function getSimilares(row) {
  var utils = App.utils;
  var dataFull = App.data.DATA_FULL || [];
  var ref = utils.normalize(row.CODREF).trim();
  var cod = utils.normalize(row.CODSIS).trim();
  if (!ref) return [];

  var byMarca = new Map();
  dataFull.forEach(function (r) {
    if (utils.normalize(r.CODREF).trim() !== ref) return;
    if (utils.normalize(r.CODSIS).trim() === cod) return;

    var qtd = utils.parsePtNumber(r.ORIG_ETQ);
    if (!(qtd > 0)) return;

    var marca = utils.normalize(r.MARCA).trim() || '(sem marca)';
    byMarca.set(marca, (byMarca.get(marca) || 0) + qtd);
  });

  return Array.from(byMarca.entries())
    .map(function (entry) { return { marca: entry[0], qtd: entry[1] }; })
    .sort(function (a, b) { return b.qtd - a.qtd; });
}

function tipHtml(ref, itens, simTotal, rowData) {
  var utils = App.utils;
  var dataFull = App.data.DATA_FULL || [];
  var header =
    '<div class="tooltip-similar-header">Similares — Ref: ' +
    utils.escapeHtml(ref) + ' (SIM: ' + utils.formatValue(simTotal, 'number') + ' un.)</div>';

  var todosSimulares = dataFull.filter(function (r) {
    var rRef = utils.normalize(r.CODREF).trim();
    return rRef === utils.normalize(ref).trim();
  }).sort(function (a, b) {
    return utils.parsePtNumber(b.ORIG_ETQ) - utils.parsePtNumber(a.ORIG_ETQ);
  });

  if (todosSimulares.length === 0) {
    return header + '<div style="padding:8px 0;color:#6b7280">Nenhum similar encontrado.</div>';
  }

  var lista = todosSimulares.map(function (r) {
    var codsis = r.CODSIS || r.CODPROD || '-';
    var marca = r.MARCA || '-';
    var etq = utils.parsePtNumber(r.ORIG_ETQ);
    var isOriginal = rowData && String(r.CODSIS) === String(rowData.CODSIS);
    var tagOriginal = isOriginal ? ' <span style="color:#f59e0b;font-weight:600">(ATUAL)</span>' : '';
    var corEtq = etq > 0 ? 'color:#22c55e;font-weight:600' : 'color:#9ca3af';

    return '<div style="padding:5px 0;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center">' +
      '<span><b style="color:var(--pri)">' + utils.escapeHtml(marca) + '</b> — Cód: ' + utils.escapeHtml(codsis) + tagOriginal + '</span>' +
      '<span style="' + corEtq + '">' + utils.formatValue(etq, 'number') + ' un.</span>' +
    '</div>';
  }).join('');

  var totalGeral = todosSimulares.reduce(function (acc, r) {
    return acc + utils.parsePtNumber(r.ORIG_ETQ);
  }, 0);
  var footer = '<div style="padding:6px 0;font-weight:600;text-align:right;border-top:2px solid #ddd;margin-top:4px">' +
    'Total: ' + utils.formatValue(totalGeral, 'number') + ' un. em ' + todosSimulares.length + ' produto(s)' +
  '</div>';

  return header + lista + footer;
}

function aplicarCorDropdown(select, mapa) {
  Object.values(mapa).forEach(function (c) { select.classList.remove(c); });
  var v = (select.value || '').toString();
  var classe = mapa[v] || mapa[v.toUpperCase()];
  if (classe) select.classList.add(classe);
}

function criarDropdownEditavel(tipo, chaveValor, valorAtual, rowData) {
  var cfg = App.config.DROPDOWN_CONFIG[tipo];
  var select = document.createElement('select');
  select.className = 'edit-select';
  select.dataset.tipo = tipo;
  select.dataset.chave = chaveValor;
  select.dataset.valorOriginal = valorAtual || '';

  cfg.opcoes.forEach(function (opt) {
    var o = document.createElement('option');
    o.value = opt.value;
    o.textContent = opt.label;
    var valUpper = (valorAtual || '').toString().toUpperCase();
    var optUpper = opt.value.toString().toUpperCase();
    if (valUpper === optUpper || valorAtual == opt.value) o.selected = true;
    select.appendChild(o);
  });

  aplicarCorDropdown(select, cfg.cores);

  select.addEventListener('change', function (e) {
    e.stopPropagation();
    var novoValor = select.value;
    var anterior = select.dataset.valorOriginal;

    if (novoValor === anterior) return;

    aplicarCorDropdown(select, cfg.cores);

    var precisaConfirmar = typeof cfg.confirmar === 'function'
      ? cfg.confirmar(novoValor)
      : cfg.confirmar;

    if (precisaConfirmar) {
      var msg = 'Confirmar alteração?\n\nDe: ' + (anterior || '(vazio)') + '\nPara: ' + novoValor;
      if (!confirm(msg)) {
        select.value = anterior;
        aplicarCorDropdown(select, cfg.cores);
        return;
      }
    }

    select.disabled = true;
    App.api.salvarDropdown(cfg, chaveValor, novoValor).then(function (ok) {
      select.disabled = false;
      if (ok) {
        select.dataset.valorOriginal = novoValor;
        var reg = App.data.DATA.find(function (r) {
          return r[cfg.chaveNome] == chaveValor || r.CODSIS == chaveValor;
        });
        if (reg && cfg.atualizarLocal) cfg.atualizarLocal(reg, novoValor);
        showToast('✅ Salvo');
        flashOk(select);
      } else {
        select.value = anterior;
        aplicarCorDropdown(select, cfg.cores);
      }
    });
  });

  select.addEventListener('click', function (e) { e.stopPropagation(); });
  return select;
}

function criarBotoesDecisao(nureg, valorAtual, rowData) {
  var container = document.createElement('div');
  container.className = 'btns-decisao';
  container.dataset.nureg = nureg;
  container.dataset.atual = (valorAtual || '').toUpperCase();

  var botoes = [
    {
      valor: 'IGNORAR',
      icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6L18 18M18 6L6 18"/></svg>',
      titulo: 'Ignorar'
    },
    {
      valor: 'ANALISAR',
      icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15L21 21" stroke-linecap="round"/></svg>',
      titulo: 'Analisar'
    },
    {
      valor: 'PROCESSAR',
      icone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5L10 17L19 7.5"/></svg>',
      titulo: 'Processar'
    }
  ];

  botoes.forEach(function (cfg) {
    var btn = document.createElement('button');
    btn.className = 'btn-dec btn-dec-' + cfg.valor.toLowerCase();
    btn.dataset.valor = cfg.valor;
    btn.title = cfg.titulo;
    btn.innerHTML = cfg.icone;

    if ((valorAtual || '').toUpperCase() === cfg.valor) {
      btn.classList.add('ativo');
    }

    container.appendChild(btn);
  });

  return container;
}

function atualizarBotoesDecisao(container, novoValor) {
  if (!container) return;

  var valorUpper = (novoValor || '').toUpperCase();
  container.dataset.atual = valorUpper;

  container.querySelectorAll('.btn-dec').forEach(function (btn) {
    var isAtivo = btn.dataset.valor === valorUpper;
    btn.classList.toggle('ativo', isAtivo);
  });
}

function matchesOperator(cellValue, operator, filterValue) {
  var utils = App.utils;
  var cell = utils.normalize(cellValue).toLowerCase();
  var filter = utils.normalize(filterValue).toLowerCase();

  if (!filter && operator !== 'blank' && operator !== 'notBlank') return true;

  switch (operator) {
    case 'contains': return cell.indexOf(filter) !== -1;
    case 'notContains': return cell.indexOf(filter) === -1;
    case 'equals': return cell === filter;
    case 'notEquals': return cell !== filter;
    case 'beginsWith': return cell.indexOf(filter) === 0;
    case 'endsWith': return cell.slice(-filter.length) === filter;
    case 'blank': return utils.isBlank(cellValue);
    case 'notBlank': return !utils.isBlank(cellValue);
    default: return true;
  }
}

function filterData(rows) {
  var utils = App.utils;
  var state = App.state;
  var cols = App.config.COLS;
  var result = rows.slice();

  if (state.filtroCotacaoRapida) {
    result = result.filter(function (row) {
      var autStatus = utils.normalize(row['AUT_STATUS']);
      var statusValido = ['1-CRITICO', '2-ATENCAO', '4-AVALIAR'].indexOf(autStatus) !== -1;

      var categVal = Number(row['CATEG_VAL'] || 0);
      var categValida = categVal === 4 || categVal === 2;

      var decisao = (row['USU_DECISAO'] || '').toString().toUpperCase();
      var naoIgnorado = decisao !== 'IGNORAR';

      var sugestao = Number(row['SUGESTAO'] || 0);
      var temSugestao = sugestao > 0;

      return statusValido && categValida && naoIgnorado && temSugestao;
    });
  }

  var global = state.globalSearch.trim().toLowerCase();
  if (global) {
    result = result.filter(function (row) {
      return cols.some(function (col) {
        return utils.normalize(row[col.key]).toLowerCase().indexOf(global) !== -1;
      });
    });
  }

  result = result.filter(function (row) {
    for (var i = 0; i < cols.length; i++) {
      var col = cols[i];
      var quick = state.quickFilters[col.key].trim().toLowerCase();
      if (quick && utils.normalize(row[col.key]).toLowerCase().indexOf(quick) === -1) return false;
    }
    return true;
  });

  result = result.filter(function (row) {
    for (var i = 0; i < cols.length; i++) {
      var col = cols[i];
      var menu = state.menuFilters[col.key];
      var cellValue = row[col.key];

      if (utils.isBlank(cellValue) && !menu.includeBlanks) return false;
      if (!matchesOperator(cellValue, menu.operator, menu.value)) return false;
      if (menu.selected.size > 0 && !menu.selected.has(utils.normalize(cellValue))) return false;
    }
    return true;
  });

  return result;
}

function sortData(rows) {
  var state = App.state;
  var utils = App.utils;
  var cols = App.config.COLS;
  var key = state.sort.key;
  var dir = state.sort.dir;

  function getColType(k) {
    var col = cols.find(function (c) { return c.key === k; });
    return col ? col.type : null;
  }

  function dateSortKey(v) {
    if (v == null) return null;
    if (v instanceof Date) {
      var t = v.getTime();
      return isNaN(t) ? null : t;
    }
    var s = utils.normalize(v).trim();
    if (!s) return null;
    var digits = s.replace(/[^\d]/g, '');
    var yyyy = Number(digits.slice(0, 4));
    var mmY = Number(digits.slice(4, 6));
    var ddY = Number(digits.slice(6, 8));

    var isYMD =
      digits.length >= 8 &&
      yyyy >= 1900 && yyyy <= 2200 &&
      mmY >= 1 && mmY <= 12 &&
      ddY >= 1 && ddY <= 31;

    if (isYMD) {
      if (digits.length >= 14) return Number(digits.slice(0, 14));
      return Number(digits.slice(0, 8));
    } else {
      if (digits.length >= 14) {
        var d = digits.slice(0, 2), m = digits.slice(2, 4), y = digits.slice(4, 8), t = digits.slice(8, 14);
        return Number('' + y + m + d + t);
      }
      if (digits.length >= 8) {
        var d2 = digits.slice(0, 2), m2 = digits.slice(2, 4), y2 = digits.slice(4, 8);
        return Number('' + y2 + m2 + d2);
      }
    }
    var dt = new Date(s);
    var tt = dt.getTime();
    return isNaN(tt) ? null : tt;
  }

  if (state.filtroCotacaoRapida) {
    if (key && dir) {
      var multiplier = dir === 'asc' ? 1 : -1;
      var colType = getColType(key);
      return rows.slice().sort(function (a, b) {
        var va = a[key];
        var vb = b[key];

        if (colType === 'date' || colType === 'datetime') {
          var da = dateSortKey(va);
          var db = dateSortKey(vb);
          if (da != null && db != null) return (da - db) * multiplier;
        }

        var na = Number(va);
        var nb = Number(vb);
        if (!isNaN(na) && !isNaN(nb) && va !== '' && vb !== '') return (na - nb) * multiplier;

        var sa = utils.normalize(va).toLowerCase();
        var sb = utils.normalize(vb).toLowerCase();
        if (sa < sb) return -1 * multiplier;
        if (sa > sb) return 1 * multiplier;
        return 0;
      });
    }

    return rows.slice().sort(function (a, b) {
      var statusA = utils.normalize(a.AUT_STATUS);
      var statusB = utils.normalize(b.AUT_STATUS);
      var prioridadeStatus = { '1-CRITICO': 1, '2-ATENCAO': 2, '4-AVALIAR': 3 };
      var prioA = prioridadeStatus[statusA] || 999;
      var prioB = prioridadeStatus[statusB] || 999;
      if (prioA !== prioB) return prioA - prioB;

      var rankA = Number(a.RNK || 999999);
      var rankB = Number(b.RNK || 999999);
      return rankA - rankB;
    });
  }

  if (!key || !dir) return rows;

  var multiplier2 = dir === 'asc' ? 1 : -1;
  var colType2 = getColType(key);

  return rows.slice().sort(function (a, b) {
    var va = a[key];
    var vb = b[key];

    if (colType2 === 'date' || colType2 === 'datetime') {
      var da = dateSortKey(va);
      var db = dateSortKey(vb);
      if (da != null && db != null) return (da - db) * multiplier2;
    }

    var na = Number(va);
    var nb = Number(vb);
    if (!isNaN(na) && !isNaN(nb) && va !== '' && vb !== '') return (na - nb) * multiplier2;

    var sa = utils.normalize(va).toLowerCase();
    var sb = utils.normalize(vb).toLowerCase();
    if (sa < sb) return -1 * multiplier2;
    if (sa > sb) return 1 * multiplier2;
    return 0;
  });
}

function toggleSort(colKey) {
  var state = App.state;
  if (state.sort.key !== colKey) {
    state.sort.key = colKey;
    state.sort.dir = 'asc';
  } else {
    state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
  }
  render();
}

function getVisibleRows() {
  return sortData(filterData(App.data.DATA || []));
}

function getPagedRows() {
  var state = App.state;
  var all = getVisibleRows();
  var start = (state.currentPage - 1) * state.pageSize;
  return all.slice(start, start + state.pageSize);
}

function getTotalPages() {
  var state = App.state;
  return Math.ceil(getVisibleRows().length / state.pageSize) || 1;
}

function updatePagination() {
  var state = App.state;
  var utils = App.utils;
  var dom = App.dom || {};
  var total = getTotalPages();
  state.currentPage = utils.clamp(state.currentPage, 1, total);

  if (dom.pageInfo) dom.pageInfo.textContent = state.currentPage + ' de ' + total;
  if (dom.btnPrev) dom.btnPrev.disabled = state.currentPage <= 1;
  if (dom.btnNext) dom.btnNext.disabled = state.currentPage >= total;

  var visible = getVisibleRows();
  if (dom.totalInfo) dom.totalInfo.textContent = visible.length + ' registro(s)';
  if (dom.selectionInfo) dom.selectionInfo.textContent = state.selectedIds.size + ' selecionado(s)';
}

function getVisibleCols() {
  return App.config.COLS.filter(function (c) { return c.visible; });
}

function getGridTemplate() {
  var visibleCols = getVisibleCols();
  var cols = ['var(--select-width)'].concat(visibleCols.map(function (c) { return c.width + 'px'; }));
  return cols.join(' ');
}

function render() {
  var dom = App.dom || {};
  var utils = App.utils;
  var state = App.state;
  var cols = App.config.COLS;
  try {
    var template = getGridTemplate();
    dom.grid.innerHTML = '';

    var header = document.createElement('div');
    header.className = 'row row-header';
    header.style.gridTemplateColumns = template;

    var selectAllCell = document.createElement('div');
    selectAllCell.className = 'cell cell-select';
    var cbAll = document.createElement('input');
    cbAll.type = 'checkbox';

    var pageRows = getPagedRows();
    cbAll.checked = pageRows.length > 0 && pageRows.every(function (r) { return state.selectedIds.has(r.CODSIS); });

    cbAll.addEventListener('change', function () {
      if (cbAll.checked) pageRows.forEach(function (r) { state.selectedIds.add(r.CODSIS); });
      else pageRows.forEach(function (r) { state.selectedIds.delete(r.CODSIS); });
      renderBody();
      updatePagination();
    });

    selectAllCell.appendChild(cbAll);
    header.appendChild(selectAllCell);

    var visibleCols = getVisibleCols();
    visibleCols.forEach(function (col) {
      var colIdx = cols.indexOf(col);
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('data-col-idx', colIdx);

      var content = document.createElement('div');
      content.className = 'header-content';

      var label = document.createElement('div');
      label.className = 'header-label';
      label.draggable = true;

      label.innerHTML =
        '<span>' + utils.escapeHtml(col.label) + '</span>' +
        '<span class="sort-icon ' + (state.sort.key === col.key ? 'active' : '') + '">' +
        (state.sort.key === col.key ? (state.sort.dir === 'asc' ? '▲' : '▼') : '▲') +
        '</span>';

      label.addEventListener('click', function () { toggleSort(col.key); });

      label.addEventListener('dragstart', function (e) {
        state.dragColumn = colIdx;
        e.dataTransfer.effectAllowed = 'move';
      });

      cell.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      cell.addEventListener('drop', function (e) {
        e.preventDefault();
        var fromIdx = state.dragColumn;
        var toIdx = colIdx;
        if (fromIdx !== null && fromIdx !== toIdx) {
          var moved = cols.splice(fromIdx, 1)[0];
          cols.splice(toIdx, 0, moved);
          render();
        }
        state.dragColumn = null;
      });

      var resizer = document.createElement('div');
      resizer.className = 'resizer';
      resizer.addEventListener('mousedown', function (e) { startResize(e, colIdx); });

      content.appendChild(label);
      content.appendChild(resizer);
      cell.appendChild(content);
      header.appendChild(cell);
    });

    dom.grid.appendChild(header);

    var filterRow = document.createElement('div');
    filterRow.className = 'row row-filter';
    filterRow.style.gridTemplateColumns = template;

    var filterSelectCell = document.createElement('div');
    filterSelectCell.className = 'cell cell-select';
    filterSelectCell.innerHTML = '<span class="text-muted">✓</span>';
    filterRow.appendChild(filterSelectCell);

    visibleCols.forEach(function (col) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.padding = '2px 6px';

      var wrap = document.createElement('div');
      wrap.className = 'filter-cell-wrap';

      var input = document.createElement('input');
      input.type = 'text';
      input.className = 'filter-input';
      input.placeholder = 'Filtrar...';
      input.value = state.quickFilters[col.key];
      input.addEventListener('input', function () {
        state.quickFilters[col.key] = input.value;
        state.currentPage = 1;
        renderBody();
        updatePagination();
      });

      var menuBtn = document.createElement('button');
      menuBtn.className = 'menu-btn';

      var mf = state.menuFilters[col.key];
      var hasFilter = mf.value || mf.selected.size > 0 || mf.operator !== 'contains' || mf.includeBlanks === false;
      if (hasFilter) menuBtn.classList.add('has-filter');

      menuBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<circle cx="12" cy="5" r="2"></circle>' +
          '<circle cx="12" cy="12" r="2"></circle>' +
          '<circle cx="12" cy="19" r="2"></circle>' +
        '</svg>';
      menuBtn.title = 'Filtro avançado';
      menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openMenu(col, menuBtn);
      });

      wrap.appendChild(input);
      wrap.appendChild(menuBtn);
      cell.appendChild(wrap);
      filterRow.appendChild(cell);
    });

    dom.grid.appendChild(filterRow);

    renderBody();
    updatePagination();
  } catch (err) {
    console.error('❌ Erro no render()', err);
    try {
      if (dom.loading) {
        dom.loading.style.display = 'flex';
        dom.loading.innerHTML =
          '<div style="color:#dc2626;background:#fee2e2;padding:20px;border-radius:8px;text-align:left;margin:20px;">' +
            '<b>❌ Erro ao renderizar a grade</b><br>' +
            utils.escapeHtml(utils.getErrorMessage(err)) +
            '<div style="margin-top:10px;font-size:12px;opacity:.85">' +
              'Abra o console (F12) para ver o stacktrace e os logs.' +
            '</div>' +
          '</div>';
      }
    } catch (e) {}
    try { showToast('❌ Erro ao renderizar (ver console)', 3000); } catch (e) {}
  }
}

function renderBody() {
  var dom = App.dom || {};
  var utils = App.utils;
  var state = App.state;
  try {
    var existing = dom.grid.querySelectorAll('.row-data');
    existing.forEach(function (el) { el.remove(); });

    var template = getGridTemplate();
    var rows = getPagedRows();

    rows.forEach(function (rowData) {
      var row = document.createElement('div');
      row.className = 'row row-data';
      if (state.selectedIds.has(rowData.CODSIS)) row.classList.add('selected');
      row.style.gridTemplateColumns = template;

      var selectCell = document.createElement('div');
      selectCell.className = 'cell cell-select';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = state.selectedIds.has(rowData.CODSIS);
      cb.addEventListener('change', function () {
        if (cb.checked) state.selectedIds.add(rowData.CODSIS);
        else state.selectedIds.delete(rowData.CODSIS);
        row.classList.toggle('selected', cb.checked);
        updatePagination();
      });
      selectCell.appendChild(cb);
      row.appendChild(selectCell);

      var visibleCols = getVisibleCols();
      visibleCols.forEach(function (col) {
        var cell = document.createElement('div');
        cell.className = 'cell';
        if (col.align === 'right') cell.classList.add('cell-right');
        if (col.align === 'center') cell.classList.add('cell-center');

        var value = rowData[col.key];

        if (col.editable && col.type === 'categoria') {
          if (rowData.CODSIS) {
            cell.appendChild(criarDropdownEditavel('categoria', rowData.CODSIS, rowData.CATEG_VAL, rowData));
          } else {
            cell.innerHTML = '<span class="text-muted">-</span>';
          }
        } else if (col.editable && col.type === 'decisao') {
          if (rowData.NUREG) {
            cell.appendChild(criarBotoesDecisao(rowData.NUREG, value, rowData));
          } else {
            cell.innerHTML = '<span class="text-muted">-</span>';
          }
        } else {
          if (col.key === 'SUGESTAO') {
            var numSug = utils.parsePtNumber(value);
            var qtd = utils.formatValue(value, 'number');

            var wrap = document.createElement('div');
            wrap.style.display = 'flex';
            wrap.style.alignItems = 'center';
            wrap.style.justifyContent = col.align === 'right' ? 'flex-end' : 'flex-start';
            wrap.style.width = '100%';
            wrap.style.gap = '4px';

            if (numSug > 0) {
              var seta = document.createElement('span');
              seta.className = 'sugestao-arrow';
              seta.textContent = '⬆';
              seta.title = 'Sugestão de compra';
              wrap.appendChild(seta);
            }

            var spanVal = document.createElement('span');
            spanVal.innerHTML = qtd;
            wrap.appendChild(spanVal);

            cell.innerHTML = '';
            cell.appendChild(wrap);
            cell.title = utils.normalize(value);
          } else if (col.key === 'SIM_ETQ') {
            var qtd2 = utils.formatValue(value, 'number');
            var simTotal = utils.parsePtNumber(value);
            var similares = simTotal > 0 ? getSimilares(rowData) : [];

            var wrap2 = document.createElement('div');
            wrap2.style.display = 'flex';
            wrap2.style.alignItems = 'center';
            wrap2.style.justifyContent = col.align === 'right' ? 'flex-end' : 'flex-start';
            wrap2.style.width = '100%';
            wrap2.style.gap = '6px';

            var spanVal2 = document.createElement('span');
            spanVal2.innerHTML = qtd2;

            wrap2.appendChild(spanVal2);

            if (simTotal > 0) {
              var lupa = document.createElement('span');
              lupa.className = 'lupa-similar on';
              lupa.textContent = '🔍';

              lupa.addEventListener('mouseenter', function () {
                mostrarTip(lupa, tipHtml(rowData.CODREF, similares, simTotal, rowData));
              });
              lupa.addEventListener('mouseleave', esconderTip);

              wrap2.appendChild(lupa);
            }

            cell.innerHTML = '';
            cell.appendChild(wrap2);
            cell.title = utils.normalize(value);
          } else if (col.key === 'ORIG_ETQ') {
            var wrap3 = document.createElement('div');
            wrap3.style.display = 'flex';
            wrap3.style.alignItems = 'center';
            wrap3.style.justifyContent = col.align === 'right' ? 'flex-end' : 'flex-start';
            wrap3.style.width = '100%';
            wrap3.style.gap = '4px';

            var icon = document.createElement('span');
            icon.className = 'estoque-icon';
            icon.textContent = '📦';
            icon.title = 'Estoque (original)';
            wrap3.appendChild(icon);

            var spanVal3 = document.createElement('span');
            spanVal3.innerHTML = utils.formatValue(value, 'number');
            wrap3.appendChild(spanVal3);

            cell.innerHTML = '';
            cell.appendChild(wrap3);
            cell.title = utils.normalize(value);
          } else {
            var cellContent = utils.formatValue(value, col.type);
            cell.innerHTML = cellContent;
            cell.title = utils.normalize(value);
          }
        }

        row.appendChild(cell);
      });

      dom.grid.appendChild(row);
    });
  } catch (err) {
    console.error('❌ Erro no renderBody()', err);
    try { showToast('❌ Erro ao montar linhas (ver console)', 3500); } catch (e) {}
    try {
      if (dom.loading) {
        dom.loading.style.display = 'flex';
        dom.loading.innerHTML =
          '<div style="color:#dc2626;background:#fee2e2;padding:20px;border-radius:8px;text-align:left;margin:20px;">' +
            '<b>❌ Erro ao montar as linhas</b><br>' +
            utils.escapeHtml(utils.getErrorMessage(err)) +
          '</div>';
      }
    } catch (e) {}
  }
}

function openMenu(col, anchorEl) {
  var dom = App.dom || {};
  var utils = App.utils;
  var state = App.state;
  var rect = anchorEl.getBoundingClientRect();
  var left = Math.min(window.innerWidth - 360, rect.left);
  var top = Math.min(window.innerHeight - 450, rect.bottom + 8);

  dom.popup.style.left = left + 'px';
  dom.popup.style.top = top + 'px';
  dom.popup.classList.add('show');

  var menu = state.menuFilters[col.key];
  var distinctValues = Array.from(new Set(App.data.DATA.map(function (r) {
    return utils.normalize(r[col.key]);
  }))).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  dom.popup.innerHTML =
    '<div class="popup-header">' +
      '<div class="popup-title">' + utils.escapeHtml(col.label) + '</div>' +
      '<button class="popup-close" id="popupClose">✕</button>' +
    '</div>' +
    '<div class="popup-section">' +
      '<div class="popup-label">Selecionar Valores</div>' +
      '<input type="text" class="value-search" id="popupSearch" placeholder="Buscar valores...">' +
      '<div class="value-list" id="popupValueList"></div>' +
    '</div>' +
    '<div class="popup-footer">' +
      '<button class="btn" id="popupClear">Limpar</button>' +
      '<button class="btn btn-primary" id="popupApply">Aplicar</button>' +
    '</div>';

  var closeBtn = document.getElementById('popupClose');
  var search = document.getElementById('popupSearch');
  var valueList = document.getElementById('popupValueList');
  var clear = document.getElementById('popupClear');
  var apply = document.getElementById('popupApply');

  function renderValueList() {
    var searchValue = search.value.toLowerCase();
    var filtered = distinctValues.filter(function (v) {
      return v.toLowerCase().indexOf(searchValue) !== -1;
    });

    valueList.innerHTML = '';

    var blankItem = document.createElement('div');
    blankItem.className = 'value-item';
    blankItem.innerHTML =
      '<input type="checkbox" ' + (menu.selected.has('') || menu.selected.size === 0 ? 'checked' : '') + '>' +
      '<span><em>(Vazios)</em></span>';
    blankItem.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.selected.has('')) menu.selected.delete('');
      else menu.selected.add('');
      renderValueList();
    });
    valueList.appendChild(blankItem);

    filtered.forEach(function (val) {
      if (val === '') return;

      var item = document.createElement('div');
      item.className = 'value-item';
      var checked = menu.selected.size === 0 || menu.selected.has(val);
      item.innerHTML =
        '<input type="checkbox" ' + (checked ? 'checked' : '') + '>' +
        '<span>' + utils.escapeHtml(val) + '</span>';
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        if (menu.selected.has(val)) {
          menu.selected.delete(val);
        } else {
          if (menu.selected.size === 0) {
            distinctValues.forEach(function (v) { if (v !== val) menu.selected.add(v); });
          } else {
            menu.selected.add(val);
          }
        }
        renderValueList();
      });
      valueList.appendChild(item);
    });
  }

  search.addEventListener('input', renderValueList);
  renderValueList();

  closeBtn.addEventListener('click', closeMenu);

  clear.addEventListener('click', function () {
    state.menuFilters[col.key] = {
      operator: 'contains',
      value: '',
      selected: new Set(),
      includeBlanks: true,
    };
    closeMenu();
    render();
  });

  apply.addEventListener('click', function () {
    state.currentPage = 1;
    closeMenu();
    render();
  });
}

function closeMenu() {
  var dom = App.dom || {};
  if (dom.popup) dom.popup.classList.remove('show');
}

var resizing = null;

function startResize(e, colIdx) {
  var state = App.state;
  e.preventDefault();
  e.stopPropagation();

  resizing = {
    idx: colIdx,
    startX: e.clientX,
    startWidth: App.config.COLS[colIdx].width,
  };

  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
}

function onResize(e) {
  if (!resizing) return;
  var utils = App.utils;
  var diff = e.clientX - resizing.startX;
  var newWidth = utils.clamp(resizing.startWidth + diff, 60, 600);
  App.config.COLS[resizing.idx].width = newWidth;
  render();
}

function stopResize() {
  resizing = null;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

function renderMenuCols() {
  var dom = App.dom || {};
  var utils = App.utils;
  if (!dom.menuCols) return;
  dom.menuCols.innerHTML = App.config.COLS.map(function (col, i) {
    return '<label class="dropdown-item">' +
      '<input type="checkbox" ' + (col.visible ? 'checked' : '') + ' data-idx="' + i + '">' +
      utils.escapeHtml(col.label) +
    '</label>';
  }).join('');

  dom.menuCols.querySelectorAll('input').forEach(function (cb) {
    cb.addEventListener('change', function () {
      App.config.COLS[cb.dataset.idx].visible = cb.checked;
      render();
    });
  });
}

App.ui = {
  initDom: initDom,
  showToast: showToast,
  flashOk: flashOk,
  mostrarTip: mostrarTip,
  esconderTip: esconderTip,
  getSimilares: getSimilares,
  tipHtml: tipHtml,
  aplicarCorDropdown: aplicarCorDropdown,
  criarDropdownEditavel: criarDropdownEditavel,
  criarBotoesDecisao: criarBotoesDecisao,
  atualizarBotoesDecisao: atualizarBotoesDecisao,
  matchesOperator: matchesOperator,
  filterData: filterData,
  sortData: sortData,
  toggleSort: toggleSort,
  getVisibleRows: getVisibleRows,
  getPagedRows: getPagedRows,
  getTotalPages: getTotalPages,
  updatePagination: updatePagination,
  getVisibleCols: getVisibleCols,
  getGridTemplate: getGridTemplate,
  render: render,
  renderBody: renderBody,
  openMenu: openMenu,
  closeMenu: closeMenu,
  renderMenuCols: renderMenuCols,
};
