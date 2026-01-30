// =============================================
// DASHBOARD FINANCEIRO - ES5 COMPATÍVEL
// =============================================
// DICA: em ambiente Sankhya embed, JX pode estar em window.parent ou window.top.

// ===== DADOS MOCK (baseado na imagem) =====
// APRENDIDO: remover mocks em produção e carregar via JX.consultar().
// REGRA: normalizar chaves do retorno (NUNOTA vs nunota).
var mockData = [
  { status: 'Pendente', nufin: 125296, nunota: 104915, codparc: 3487, parceiro: 'MARCIANO PREVIATTELI DA SILVA', iniciais: 'MS', cor: 'hsl(280, 70%, 50%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 380.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Pendente', nufin: 125293, nunota: 104945, codparc: 3487, parceiro: 'MARCIANO PREVIATTELI DA SILVA', iniciais: 'MS', cor: 'hsl(280, 70%, 50%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 135.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Vencido', nufin: 125292, nunota: 104944, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 16.00, recdesp: 'Rec', natureza: '<SEM NATUREZA>', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125290, nunota: 104941, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 4.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pendente', nufin: 125286, nunota: 104939, codparc: 50, parceiro: 'CARLOS ROBERTO FABRINI (B...', iniciais: 'CR', cor: 'hsl(340, 70%, 50%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 220.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Vencido', nufin: 125276, nunota: 104937, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 80.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125275, nunota: 104936, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 8.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125274, nunota: 104935, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 56.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125272, nunota: 104934, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 124.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125271, nunota: 104933, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 160.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125270, nunota: 104932, codparc: 3487, parceiro: 'MARCIANO PREVIATTELI DA SI...', iniciais: 'MS', cor: 'hsl(280, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 25.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Vencido', nufin: 125269, nunota: 104931, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 41.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pendente', nufin: 125243, nunota: 104929, codparc: 1892, parceiro: 'VL COMERCIO DE PECAS LTDA', iniciais: 'VL', cor: 'hsl(120, 60%, 40%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 25.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Pago', nufin: 125240, nunota: 104927, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 80.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pendente', nufin: 125239, nunota: 104926, codparc: 26, parceiro: 'LEANDRO DIAS PRADO', iniciais: 'LP', cor: 'hsl(45, 90%, 45%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 120.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Pago', nufin: 125238, nunota: 104925, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 8.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pago', nufin: 125236, nunota: 104923, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 50.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pago', nufin: 125234, nunota: 104921, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 184.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pago', nufin: 125233, nunota: 104920, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 190.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pendente', nufin: 125232, nunota: 104919, codparc: 3487, parceiro: 'MARCIANO PREVIATTELI DA SI...', iniciais: 'MS', cor: 'hsl(280, 70%, 50%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 39.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Pendente', nufin: 125231, nunota: 104918, codparc: 192, parceiro: 'DARIO ANTONIO STOCCO', iniciais: 'DS', cor: 'hsl(15, 80%, 50%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 320.50, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Pendente', nufin: 125229, nunota: 104917, codparc: 658, parceiro: 'JEAM LUIZ PIVETTA', iniciais: 'JP', cor: 'hsl(180, 60%, 40%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 1594.50, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Pago', nufin: 125225, nunota: 104914, codparc: 12000, parceiro: 'CONSUMIDOR FINAL', iniciais: 'CF', cor: 'hsl(200, 70%, 50%)', tipo: 'DINHEIRO - EE', tipoClass: 'dinheiro', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 41.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CAIXINHA APSP', origem: 'E' },
  { status: 'Pendente', nufin: 125220, nunota: 104911, codparc: 3360, parceiro: 'OSMAR ANTUNES DE LIMA 33...', iniciais: 'OA', cor: 'hsl(60, 70%, 40%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 101.00, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' },
  { status: 'Vencido', nufin: 125216, nunota: 4799, codparc: 1093, parceiro: 'LUIZ DA SILVA ROCHA', iniciais: 'LR', cor: 'hsl(320, 60%, 45%)', tipo: 'CREDITO CEDIDO -...', tipoClass: 'credito', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '', valor: 47.00, recdesp: 'Desp', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDITO A PAGAR P/ TERCEI...', origem: 'E' },
  { status: 'Pago', nufin: 125212, nunota: 4798, codparc: 3770, parceiro: 'ROBERTO LOPES', iniciais: 'RL', cor: 'hsl(240, 60%, 50%)', tipo: 'CREDITO CEDIDO -...', tipoClass: 'credito', vencimento: '23/01/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 93.00, recdesp: 'Desp', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDITO A PAGAR P/ TERCEI...', origem: 'E' },
  { status: 'Pago', nufin: 125210, nunota: 32549, codparc: 289, parceiro: 'GIOVANI GODOI', iniciais: 'GG', cor: 'hsl(100, 50%, 40%)', tipo: 'PROMISSORIA A RE...', tipoClass: 'promissoria', vencimento: '22/02/2026', negociacao: '23/01/2026', dhbaixa: '23/01/2026', valor: 144.43, recdesp: 'Rec', natureza: 'VENDA DE PRODUTOS', descricao: 'CREDIARIO FISICO', origem: 'E' }
];

// ===== ESTADO DA PAGINAÇÃO =====
// REGRA: pageSize deve bater com o <select> marcado no HTML.
var state = {
  currentPage: 1,
  pageSize: 800,
  totalCount: mockData.length,
  totalPages: 1
};

// ===== ELEMENTOS DO DOM =====
// REGRA: IDs precisam existir no HTML (senão o JS quebra).
var tableBody = document.getElementById('tableBody');
var selectAllCheckbox = document.getElementById('selectAll');
var pageInput = document.getElementById('pageInput');
var pageSizeSelect = document.getElementById('pageSize');
var btnFirst = document.getElementById('btnFirst');
var btnPrev = document.getElementById('btnPrev');
var btnNext = document.getElementById('btnNext');
var btnLast = document.getElementById('btnLast');
var recordStart = document.getElementById('recordStart');
var recordEnd = document.getElementById('recordEnd');
var recordTotal = document.getElementById('recordTotal');
var totalPagesEl = document.getElementById('totalPages');
var selectionCountEl = document.getElementById('selectionCount');
var clearSelectionBtn = document.getElementById('clearSelection');
var columnFilterDropdown = document.getElementById('columnFilterDropdown');
var columnFilterList = document.getElementById('columnFilterList');
var columnFilterSearch = document.getElementById('columnFilterSearch');

// ===== ESTADO DE FILTRO =====
// DICA: filtros de coluna precisam dos mesmos data-column do <th>.
var filteredData = mockData.slice();
var columnFilters = {};
var activeFilterColumn = null;
var activeFilterHeader = null;

// ===== FUNÇÕES AUXILIARES =====
// DICA: formatCurrency assume número; sanitize antes se vier string.
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getBadgeClass(status) {
  if (status === 'Pago') return 'badge-pago';
  if (status === 'Vencido') return 'badge-vencido';
  return 'badge-pendente';
}

function getTipoTituloIcon(tipoClass) {
  var icons = {
    dinheiro: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
    promissoria: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
    credito: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    boleto: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h2v8H7z"/><path d="M11 8h1v8h-1z"/><path d="M15 8h2v8h-2z"/></svg>',
    pix: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
  };
  return icons[tipoClass] || icons.dinheiro;
}

function getRecDespTag(recdesp) {
  if (recdesp === 'Rec') {
    return '<span class="tag-recdesp tag-receita">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>' +
      'Rec</span>';
  } else {
    return '<span class="tag-recdesp tag-despesa">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>' +
      'Desp</span>';
  }
}

// ===== RENDERIZAR TABELA =====
function renderTable() {
  var startIndex = (state.currentPage - 1) * state.pageSize;
  var endIndex = Math.min(startIndex + state.pageSize, state.totalCount);
  var pageData = filteredData.slice(startIndex, endIndex);

  var html = '';
  for (var i = 0; i < pageData.length; i++) {
    var row = pageData[i];
    var isPago = row.status === 'Pago';
    var isReceita = row.recdesp === 'Rec';

    var rowClass = isReceita ? 'receita-row' : 'despesa-row';
    if (isPago) rowClass += ' paid-row';

    var valorPrefix = isReceita ? '+R$ ' : '-R$ ';
    var valorClass = isReceita ? 'value-positive' : 'value-negative';

    html += '<tr class="' + rowClass + '">';
    html += '<td><input type="checkbox" class="checkbox row-checkbox"></td>';
    html += '<td><span class="badge ' + getBadgeClass(row.status) + '">' + row.status + '</span></td>';
    html += '<td>' + row.nufin + '</td>';
    html += '<td>' + row.nunota + '</td>';
    html += '<td>' + row.codparc + '</td>';
    html += '<td><div class="partner-cell">';
    html += '<div class="avatar" style="background-color: ' + row.cor + ';">' + row.iniciais + '</div>';
    html += '<span class="partner-name">' + row.parceiro + '</span>';
    html += '</div></td>';
    html += '<td><div class="tipo-titulo-cell tipo-' + row.tipoClass + '">';
    html += '<div class="tipo-titulo-icon">' + getTipoTituloIcon(row.tipoClass) + '</div>';
    html += '<span>' + row.tipo + '</span>';
    html += '</div></td>';
    html += '<td>' + row.vencimento + '</td>';
    html += '<td>' + row.negociacao + '</td>';
    html += '<td>' + (row.dhbaixa || '-') + '</td>';
    html += '<td><span class="' + valorClass + '">' + valorPrefix + formatCurrency(row.valor) + '</span></td>';
    html += '<td>' + getRecDespTag(row.recdesp) + '</td>';
    html += '<td>' + row.natureza + '</td>';
    html += '<td>' + row.descricao + '</td>';
    html += '<td>' + row.origem + '</td>';
    html += '</tr>';
  }

  tableBody.innerHTML = html;
  bindRowCheckboxes();
  updateSelectAllState();
}

// ===== ATUALIZAR PAGINAÇÃO =====
function updatePagination() {
  state.totalPages = Math.ceil(state.totalCount / state.pageSize);
  if (state.totalPages < 1) state.totalPages = 1;
  if (state.currentPage > state.totalPages) state.currentPage = state.totalPages;

  var startRecord = state.totalCount === 0 ? 0 : (state.currentPage - 1) * state.pageSize + 1;
  var endRecord = state.totalCount === 0 ? 0 : Math.min(state.currentPage * state.pageSize, state.totalCount);

  recordStart.textContent = startRecord.toLocaleString('pt-BR');
  recordEnd.textContent = endRecord.toLocaleString('pt-BR');
  recordTotal.textContent = state.totalCount.toLocaleString('pt-BR');

  pageInput.value = state.currentPage;
  pageInput.max = state.totalPages;
  totalPagesEl.textContent = state.totalPages;

  btnFirst.disabled = state.currentPage === 1;
  btnPrev.disabled = state.currentPage === 1;
  btnNext.disabled = state.currentPage === state.totalPages;
  btnLast.disabled = state.currentPage === state.totalPages;
}

// ===== NAVEGAÇÃO =====
function goToPage(page) {
  var newPage = Math.max(1, Math.min(page, state.totalPages));
  if (newPage !== state.currentPage) {
    state.currentPage = newPage;
    updatePagination();
    renderTable();
  }
}

function goToFirst() { goToPage(1); }
function goToPrev() { goToPage(state.currentPage - 1); }
function goToNext() { goToPage(state.currentPage + 1); }
function goToLast() { goToPage(state.totalPages); }

// ===== CHECKBOX SELECT ALL =====
function bindRowCheckboxes() {
  var rowCheckboxes = document.querySelectorAll('.row-checkbox');
  for (var i = 0; i < rowCheckboxes.length; i++) {
    rowCheckboxes[i].addEventListener('change', function() {
      var row = this.closest('tr');
      if (row) {
        if (this.checked) {
          row.classList.add('selected');
        } else {
          row.classList.remove('selected');
        }
      }
      updateSelectAllState();
    });
  }
}

function updateSelectAllState() {
  var rowCheckboxes = document.querySelectorAll('.row-checkbox');
  var allChecked = true;
  var someChecked = false;
  var selectedCount = 0;

  for (var i = 0; i < rowCheckboxes.length; i++) {
    if (rowCheckboxes[i].checked) {
      someChecked = true;
      selectedCount++;
    } else {
      allChecked = false;
    }
  }

  selectAllCheckbox.checked = allChecked && rowCheckboxes.length > 0;
  selectAllCheckbox.indeterminate = someChecked && !allChecked;
  if (selectionCountEl) {
    selectionCountEl.textContent = selectedCount + ' selecionado(s)';
  }
  if (clearSelectionBtn) {
    clearSelectionBtn.disabled = selectedCount === 0;
  }
}

selectAllCheckbox.addEventListener('change', function() {
  var rowCheckboxes = document.querySelectorAll('.row-checkbox');
  for (var i = 0; i < rowCheckboxes.length; i++) {
    rowCheckboxes[i].checked = selectAllCheckbox.checked;
    var row = rowCheckboxes[i].closest('tr');
    if (row) {
      if (selectAllCheckbox.checked) {
        row.classList.add('selected');
      } else {
        row.classList.remove('selected');
      }
    }
  }
  updateSelectAllState();
});

if (clearSelectionBtn) {
  clearSelectionBtn.addEventListener('click', function() {
    var rowCheckboxes = document.querySelectorAll('.row-checkbox');
    for (var i = 0; i < rowCheckboxes.length; i++) {
      rowCheckboxes[i].checked = false;
      var row = rowCheckboxes[i].closest('tr');
      if (row) row.classList.remove('selected');
    }
    updateSelectAllState();
  });
}

// ===== FILTRO POR COLUNA =====
function getColumnValue(row, columnKey) {
  // REGRA: este switch deve casar com data-column no <th>.
  switch (columnKey) {
    case 'status': return row.status;
    case 'nufin': return String(row.nufin);
    case 'nunota': return String(row.nunota);
    case 'codparc': return String(row.codparc);
    case 'parceiro': return row.parceiro;
    case 'tipo': return row.tipo;
    case 'vencimento': return row.vencimento;
    case 'negociacao': return row.negociacao;
    case 'dhbaixa': return row.dhbaixa || '-';
    case 'valor':
      return (row.recdesp === 'Rec' ? '+R$ ' : '-R$ ') + formatCurrency(row.valor);
    case 'recdesp': return row.recdesp;
    case 'natureza': return row.natureza;
    case 'descricao': return row.descricao;
    case 'origem': return row.origem;
    default: return '';
  }
}

function getUniqueValues(columnKey) {
  var unique = {};
  for (var i = 0; i < mockData.length; i++) {
    var value = getColumnValue(mockData[i], columnKey);
    if (!unique[value]) unique[value] = true;
  }
  var values = [];
  for (var key in unique) {
    if (unique.hasOwnProperty(key)) values.push(key);
  }
  return values;
}

function ensureFilterState(columnKey, values) {
  if (!columnFilters[columnKey]) {
    var selected = {};
    for (var i = 0; i < values.length; i++) {
      selected[values[i]] = true;
    }
    columnFilters[columnKey] = { selected: selected, sort: 'asc', search: '' };
  } else {
    for (var j = 0; j < values.length; j++) {
      if (columnFilters[columnKey].selected[values[j]] === undefined) {
        columnFilters[columnKey].selected[values[j]] = true;
      }
    }
  }
}

function getSortedValues(values, sort) {
  var list = values.slice();
  list.sort(function(a, b) {
    var aVal = a.toLowerCase();
    var bVal = b.toLowerCase();
    if (aVal < bVal) return sort === 'desc' ? 1 : -1;
    if (aVal > bVal) return sort === 'desc' ? -1 : 1;
    return 0;
  });
  return list;
}

function renderFilterList(columnKey) {
  var values = getUniqueValues(columnKey);
  ensureFilterState(columnKey, values);
  var filter = columnFilters[columnKey];
  var sortedValues = getSortedValues(values, filter.sort);
  var searchText = filter.search.toLowerCase();
  var html = '';

  for (var i = 0; i < sortedValues.length; i++) {
    var value = sortedValues[i];
    if (searchText && value.toLowerCase().indexOf(searchText) === -1) continue;
    var checked = filter.selected[value] ? ' checked' : '';
    html += '<label class="column-filter-item">' +
      '<input type="checkbox" class="column-filter-checkbox" data-value="' + value + '"' + checked + '>' +
      '<span>' + value + '</span>' +
      '</label>';
  }

  columnFilterList.innerHTML = html;
  var checkboxes = columnFilterList.querySelectorAll('.column-filter-checkbox');
  for (var j = 0; j < checkboxes.length; j++) {
    checkboxes[j].addEventListener('change', function() {
      var val = this.getAttribute('data-value');
      columnFilters[columnKey].selected[val] = this.checked;
      applyColumnFilters();
    });
  }
}

function applyColumnFilters() {
  filteredData = mockData.filter(function(row) {
    for (var key in columnFilters) {
      if (!columnFilters.hasOwnProperty(key)) continue;
      var value = getColumnValue(row, key);
      if (!columnFilters[key].selected[value]) {
        return false;
      }
    }
    return true;
  });
  state.totalCount = filteredData.length;
  state.currentPage = 1;
  updatePagination();
  renderTable();
}

function openColumnFilter(headerEl, columnKey) {
  activeFilterHeader = headerEl;
  activeFilterColumn = columnKey;
  renderFilterList(columnKey);
  columnFilterSearch.value = columnFilters[columnKey].search || '';
  columnFilterDropdown.classList.add('open');

  var rect = headerEl.getBoundingClientRect();
  var dropdownWidth = columnFilterDropdown.offsetWidth || 240;
  var left = rect.left + window.scrollX;
  var top = rect.bottom + window.scrollY + 6;
  if (left + dropdownWidth > window.innerWidth) {
    left = window.innerWidth - dropdownWidth - 8;
  }
  if (left < 8) left = 8;
  columnFilterDropdown.style.left = left + 'px';
  columnFilterDropdown.style.top = top + 'px';
}

function closeColumnFilter() {
  activeFilterColumn = null;
  activeFilterHeader = null;
  columnFilterDropdown.classList.remove('open');
}

function initColumnFilters() {
  var headerCells = document.querySelectorAll('th[data-column] .table-header-cell');
  for (var i = 0; i < headerCells.length; i++) {
    headerCells[i].addEventListener('click', function(e) {
      var th = this.closest('th');
      if (!th || !th.dataset.column) return;
      if (e.target.classList.contains('resize-handle')) return;
      e.stopPropagation();
      if (activeFilterColumn === th.dataset.column && columnFilterDropdown.classList.contains('open')) {
        closeColumnFilter();
        return;
      }
      openColumnFilter(th, th.dataset.column);
    });
  }

  columnFilterDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  document.addEventListener('click', function() {
    if (columnFilterDropdown.classList.contains('open')) {
      closeColumnFilter();
    }
  });

  columnFilterSearch.addEventListener('input', function() {
    if (!activeFilterColumn) return;
    columnFilters[activeFilterColumn].search = columnFilterSearch.value;
    renderFilterList(activeFilterColumn);
  });

  var sortButtons = columnFilterDropdown.querySelectorAll('[data-sort]');
  for (var j = 0; j < sortButtons.length; j++) {
    sortButtons[j].addEventListener('click', function() {
      if (!activeFilterColumn) return;
      columnFilters[activeFilterColumn].sort = this.getAttribute('data-sort');
      renderFilterList(activeFilterColumn);
    });
  }

  var selectButtons = columnFilterDropdown.querySelectorAll('[data-select]');
  for (var k = 0; k < selectButtons.length; k++) {
    selectButtons[k].addEventListener('click', function() {
      if (!activeFilterColumn) return;
      var values = getUniqueValues(activeFilterColumn);
      var mode = this.getAttribute('data-select');
      for (var i2 = 0; i2 < values.length; i2++) {
        columnFilters[activeFilterColumn].selected[values[i2]] = mode === 'all';
      }
      renderFilterList(activeFilterColumn);
      applyColumnFilters();
    });
  }
}

// ===== RESIZE DE COLUNAS =====
function initColumnResize() {
  var resizeHandles = document.querySelectorAll('.resize-handle');

  for (var i = 0; i < resizeHandles.length; i++) {
    (function(handle) {
      var isResizing = false;
      var startX = 0;
      var startWidth = 0;
      var th = null;

      handle.addEventListener('mousedown', function(e) {
        isResizing = true;
        th = handle.parentElement;
        startX = e.pageX;
        startWidth = th.offsetWidth;
        handle.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        var width = startWidth + (e.pageX - startX);
        if (width >= 50) {
          th.style.width = width + 'px';
        }
      });

      document.addEventListener('mouseup', function() {
        if (isResizing) {
          isResizing = false;
          handle.classList.remove('active');
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        }
      });
    })(resizeHandles[i]);
  }
}

// ===== EVENT LISTENERS =====
btnFirst.addEventListener('click', goToFirst);
btnPrev.addEventListener('click', goToPrev);
btnNext.addEventListener('click', goToNext);
btnLast.addEventListener('click', goToLast);

pageInput.addEventListener('change', function() {
  var page = parseInt(pageInput.value);
  if (!isNaN(page)) {
    goToPage(page);
  }
});

pageSizeSelect.addEventListener('change', function() {
  state.pageSize = parseInt(pageSizeSelect.value);
  state.currentPage = 1;
  updatePagination();
  renderTable();
});

// ===== ATALHOS DE TECLADO =====
document.addEventListener('keydown', function(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

  if (e.altKey) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToFirst();
        break;
      case 'End':
        e.preventDefault();
        goToLast();
        break;
    }
  }
});

// ===== INICIALIZAÇÃO =====
// APRENDIDO: na versão com JX, carregar dados antes de renderizar.
function init() {
  state.totalCount = filteredData.length;
  updatePagination();
  renderTable();
  initColumnResize();
  initColumnFilters();
  console.log('Dashboard Financeiro - ES5 carregado!');
  console.log('Total de registros: ' + mockData.length);
  console.log('Atalhos: Alt+← (anterior), Alt+→ (próxima), Alt+Home (primeira), Alt+End (última)');
}

init();
