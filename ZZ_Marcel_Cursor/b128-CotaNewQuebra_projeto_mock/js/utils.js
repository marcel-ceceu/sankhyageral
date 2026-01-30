window.App = window.App || {};

function normalize(v) { return (v ?? '').toString(); }
function isBlank(v) { return normalize(v).trim() === ''; }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function escapeHtml(s) {
  return normalize(s).replace(/[&<>"']/g, function (m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]);
  });
}

function safeStringify(obj) {
  try { return JSON.stringify(obj); } catch (e) {}
  try { return String(obj); } catch (e) {}
  return '[obj]';
}

function getErrorMessage(err) {
  if (!err) return 'Erro desconhecido';
  if (typeof err === 'string') return err;
  return err.responseText || err.statusMessage || err.message || safeStringify(err);
}

function extractRows(resultado) {
  if (!resultado) return [];
  if (Array.isArray(resultado)) return resultado;
  if (Array.isArray(resultado.retorno)) return resultado.retorno;
  if (resultado.data) {
    if (Array.isArray(resultado.data)) return resultado.data;
    if (Array.isArray(resultado.data.rows)) return resultado.data.rows;
    if (Array.isArray(resultado.data.result)) return resultado.data.result;
    if (Array.isArray(resultado.data.retorno)) return resultado.data.retorno;
  }
  if (Array.isArray(resultado.rows)) return resultado.rows;
  if (Array.isArray(resultado.result)) return resultado.result;
  if (Array.isArray(resultado.resultado)) return resultado.resultado;
  if (typeof resultado.responseText === 'string') {
    try { return extractRows(JSON.parse(resultado.responseText)); } catch (e) {}
  }
  return [];
}

function normalizeRowKeys(row) {
  if (!row || typeof row !== 'object') return row;
  var out = Object.assign({}, row);
  Object.keys(row).forEach(function (k) {
    var up = k.toUpperCase();
    if (!(up in out)) out[up] = row[k];
  });
  return out;
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(normalizeRowKeys);
}

function parsePtNumber(value) {
  if (value == null) return 0;
  if (typeof value === 'number') return isFinite(value) ? value : 0;
  var s = String(value).trim();
  if (!s) return 0;
  var cleaned = s.replace(/[^\d.,-]/g, '');
  var normalized = cleaned.replace(/\./g, '').replace(',', '.');
  var n = Number(normalized);
  return isFinite(n) ? n : 0;
}

function formatValue(value, type) {
  if (isBlank(value)) return '';

  switch (type) {
    case 'date': {
      var strValue = normalize(value).trim();
      if (strValue.match(/^\d{8}/)) {
        var dia = strValue.substring(0, 2);
        var mes = strValue.substring(2, 4);
        var ano = strValue.substring(4, 8);
        return dia + '/' + mes + '/' + ano;
      }
      var date = new Date(value);
      if (isNaN(date.getTime())) return escapeHtml(value);
      return date.toLocaleDateString('pt-BR');
    }
    case 'datetime': {
      var s = normalize(value).trim();
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
        var DD = String(ddY).padStart(2, '0');
        var MM = String(mmY).padStart(2, '0');
        var YYYY = String(yyyy);
        var HH = digits.length >= 10 ? digits.slice(8, 10) : '00';
        var MI = digits.length >= 12 ? digits.slice(10, 12) : '00';
        if (digits.length >= 12) return DD + '/' + MM + '/' + YYYY + ' ' + HH + ':' + MI;
        return DD + '/' + MM + '/' + YYYY;
      }

      if (digits.length >= 14) {
        var dd = digits.slice(0, 2);
        var mm = digits.slice(2, 4);
        var yyyy2 = digits.slice(4, 8);
        var HH2 = digits.slice(8, 10);
        var MI2 = digits.slice(10, 12);
        return dd + '/' + mm + '/' + yyyy2 + ' ' + HH2 + ':' + MI2;
      }
      if (digits.length >= 12) {
        var dd2 = digits.slice(0, 2);
        var mm2 = digits.slice(2, 4);
        var yyyy3 = digits.slice(4, 8);
        var HH3 = digits.slice(8, 10);
        var MI3 = digits.slice(10, 12);
        return dd2 + '/' + mm2 + '/' + yyyy3 + ' ' + HH3 + ':' + MI3;
      }
      if (digits.length >= 8) {
        var dd3 = digits.slice(0, 2);
        var mm3 = digits.slice(2, 4);
        var yyyy4 = digits.slice(4, 8);
        return dd3 + '/' + mm3 + '/' + yyyy4;
      }

      var d = new Date(value);
      if (isNaN(d.getTime())) return escapeHtml(value);
      var dia2 = String(d.getDate()).padStart(2, '0');
      var mes2 = String(d.getMonth() + 1).padStart(2, '0');
      var ano2 = d.getFullYear();
      var hora = String(d.getHours()).padStart(2, '0');
      var minuto = String(d.getMinutes()).padStart(2, '0');
      return dia2 + '/' + mes2 + '/' + ano2 + ' ' + hora + ':' + minuto;
    }
    case 'currency':
      return 'R$ ' + Number(value).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    case 'number':
      return Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    case 'decimal':
      return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'dias': {
      var dias = Number(value);
      if (dias >= 999) return '<span class="text-muted">-</span>';
      if (dias <= 15) return '<span class="text-danger">' + dias + '</span>';
      if (dias <= 30) return '<span class="text-warning">' + dias + '</span>';
      return '<span class="text-success">' + dias + '</span>';
    }
    case 'curva': {
      var curvaClasses = { 'A': 'badge-danger', 'B': 'badge-warning', 'C': 'badge-info' };
      return '<span class="badge ' + (curvaClasses[value] || 'badge-muted') + '">' + escapeHtml(value) + '</span>';
    }
    case 'status': {
      var statusClasses = {
        '1-CRITICO': 'badge-danger',
        '2-ATENCAO': 'badge-warning',
        '3-OK': 'badge-success',
        '4-AVALIAR': 'badge-info',
        '8-IGNORAR': 'badge-muted',
        '9-REPASSE': 'badge-muted',
      };
      return '<span class="badge ' + (statusClasses[value] || 'badge-muted') + '">' + escapeHtml(value) + '</span>';
    }
    case 'decisao': {
      var val = normalize(value).toUpperCase();
      var classes = {
        'PROCESSAR': 'badge-success',
        'IGNORAR': 'badge-muted',
        'ANALISAR': 'badge-warning',
      };
      if (!val) return '<span class="text-muted">-</span>';
      return '<span class="badge ' + (classes[val] || 'badge-muted') + '">' + escapeHtml(value) + '</span>';
    }
    case 'categoria': {
      var mapa = {
        '1. REPASSE': 'badge-muted',
        '2. REPO RAPIDA': 'badge-success',
        '3. REPO DEVAGAR': 'badge-warning',
        '4. PENDENTE': 'badge-info',
      };
      var classe = mapa[value] || 'badge-muted';
      if (!value) return '<span class="text-muted">-</span>';
      return '<span class="badge ' + classe + '">' + escapeHtml(value) + '</span>';
    }
    default:
      return escapeHtml(value);
  }
}

App.utils = {
  normalize: normalize,
  isBlank: isBlank,
  clamp: clamp,
  escapeHtml: escapeHtml,
  safeStringify: safeStringify,
  getErrorMessage: getErrorMessage,
  extractRows: extractRows,
  normalizeRowKeys: normalizeRowKeys,
  normalizeRows: normalizeRows,
  parsePtNumber: parsePtNumber,
  formatValue: formatValue,
};
