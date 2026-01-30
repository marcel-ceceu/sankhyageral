// Debug simples e centralizado para diagnóstico rápido
(function initDebug() {
  window.App = window.App || {};

  var enabled = window.__APP_DEBUG__ !== false;
  var maxLogEntries = 200;
  var logs = [];

  function nowIso() {
    try { return new Date().toISOString(); } catch (e) { return ''; }
  }

  function safeStringify(obj) {
    try { return JSON.stringify(obj); } catch (e) {}
    try { return String(obj); } catch (e) {}
    return '[obj]';
  }

  function extractMessage(err) {
    if (!err) return '';
    if (typeof err === 'string') return err;
    if (err.message) return err.message;
    if (err.statusMessage) return err.statusMessage;
    if (err.responseText) return err.responseText;
    return safeStringify(err);
  }

  function extractStatus(err) {
    if (!err || typeof err !== 'object') return null;
    return err.status || (err.response && err.response.status) || err.statusCode || null;
  }

  function pushLog(entry) {
    logs.push(entry);
    if (logs.length > maxLogEntries) logs.shift();
  }

  function baseInfo(err, ctx) {
    var msg = extractMessage(err);
    var status = extractStatus(err);
    var url = (ctx && ctx.url) || err && err.config && err.config.url || err && err.url || '';
    return { msg: msg, status: status, url: url };
  }

  function diagnose(info) {
    var msg = (info.msg || '').toLowerCase();
    var url = info.url || '';
    var status = info.status;
    var actions = [];

    if (status === 414 || msg.indexOf('414') !== -1) {
      actions.push('Status 414 (URL longa). Reduza o tamanho da URL e prefira POST para parâmetros extensos.');
      actions.push('Verifique se tokens/sessões estão indo na query string; mova para header.');
      actions.push('Revise filtros/parametros enviados para evitar excesso.');
    }

    if (msg.indexOf('token ausente') !== -1 || msg.indexOf('token inválido') !== -1 || msg.indexOf('token invalido') !== -1) {
      actions.push('Token ausente ou inválido. Refaça login ou recupere o token no ambiente Sankhya.');
      actions.push('Confirme se o token está sendo enviado no header esperado.');
    }

    if (msg.indexOf('cors') !== -1 || msg.indexOf('access-control-allow-origin') !== -1) {
      actions.push('CORS bloqueado. Configure o backend para permitir o domínio atual.');
      actions.push('Se não controlar o backend, use proxy ou hospede o front no mesmo domínio.');
    }

    if (msg.indexOf('network error') !== -1) {
      actions.push('Erro de rede. Verifique conexão, DNS, VPN, firewall e bloqueios do navegador.');
      actions.push('Se a chamada é cross-domain, verifique CORS e certificados HTTPS.');
    }

    if (status === 404 || msg.indexOf('404') !== -1) {
      actions.push('Recurso não encontrado (404). Verifique caminhos relativos e se os arquivos foram publicados.');
      actions.push('Confirme se a URL base do HTML está apontando para a pasta correta.');
    }

    if (url && url.indexOf('account-api.sankhya.com.br/notification/by_user') !== -1) {
      actions.push('Endpoint de notificações retornou erro. Reduza parâmetros e confirme se a sessão está válida.');
    }

    if (actions.length === 0) {
      actions.push('Verifique o console e os detalhes do erro para identificar a causa raiz.');
    }

    return actions;
  }

  function logDiagnosis(err, ctx) {
    if (!enabled) return;
    var info = baseInfo(err, ctx);
    var actions = diagnose(info);
    var entry = {
      time: nowIso(),
      message: info.msg || '(sem mensagem)',
      status: info.status,
      url: info.url,
      context: ctx || {},
      actions: actions,
    };
    pushLog(entry);

    try {
      console.groupCollapsed('🧭 Diagnóstico', entry.message);
      console.log('Status:', entry.status || '(n/a)');
      if (entry.url) console.log('URL:', entry.url);
      if (ctx && Object.keys(ctx).length) console.log('Contexto:', ctx);
      console.log('O que fazer:');
      actions.forEach(function (a, i) { console.log((i + 1) + '.', a); });
      console.groupEnd();
    } catch (e) {}
  }

  function onErrorEvent(event) {
    try {
      if (event && event.target) {
        var tag = event.target.tagName;
        var isResource = tag === 'SCRIPT' || tag === 'LINK' || tag === 'IMG';
        if (isResource) {
          var url = event.target.src || event.target.href || '';
          logDiagnosis('Falha ao carregar recurso', { type: 'resource', tag: tag, url: url });
          return;
        }
      }
      var err = (event && event.error) || (event && event.message) || event;
      logDiagnosis(err, {
        type: 'error-event',
        file: event && event.filename,
        line: event && event.lineno,
        col: event && event.colno,
      });
    } catch (e) {}
  }

  function onUnhandledRejection(event) {
    try {
      var reason = (event && event.reason) || event;
      logDiagnosis(reason, { type: 'unhandledrejection' });
    } catch (e) {}
  }

  window.addEventListener('error', onErrorEvent, true);
  window.addEventListener('unhandledrejection', onUnhandledRejection);

  App.debug = {
    enabled: enabled,
    reportError: logDiagnosis,
    getLogs: function () { return logs.slice(); },
    clearLogs: function () { logs = []; },
  };
})();
