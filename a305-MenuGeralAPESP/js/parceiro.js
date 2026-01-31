/* ==========================================================
   PARCEIRO.JS - Cadastro de Novo Parceiro
   Menu Geral APESP - Arquitetura Modular
   ========================================================== */

var CIDADES_POPUP = [];
var LOGRADOUROS_POPUP = [];
var cidadeIndexPopup = -1;
var logradouroIndexPopup = -1;
var ultimoParceiroInserido = {};
var ID_ROTINA_PARCEIRO = 128;

// ══════════════════════════════════════════════════════════════
// CARREGAR DADOS PARA LOOKUPS
// ══════════════════════════════════════════════════════════════
function carregarDadosParceiro() {
    JX.consultar("SELECT CODCID, NOMECID, UF FROM TSICID ORDER BY NOMECID")
        .then(function(r) { 
            CIDADES_POPUP = r || []; 
            console.log('[Parceiro] Cidades carregadas:', CIDADES_POPUP.length);
        })
        .catch(function(e) { console.error('[Parceiro] Erro cidades:', e); });

    JX.consultar("SELECT CODEND, NOMEEND, TIPO FROM TSIEND ORDER BY NOMEEND")
        .then(function(r) { 
            LOGRADOUROS_POPUP = r || []; 
            console.log('[Parceiro] Logradouros carregados:', LOGRADOUROS_POPUP.length);
        })
        .catch(function(e) { console.error('[Parceiro] Erro logradouros:', e); });
}

// ══════════════════════════════════════════════════════════════
// ABRIR / FECHAR POPUP
// ══════════════════════════════════════════════════════════════
function abrirPopupNovoParceiro() {
    document.getElementById('popupNovoParceiro').classList.add('show');
    setTimeout(function() { 
        document.getElementById('parc_nome').focus(); 
    }, 100);
}

function fecharPopupNovoParceiro() {
    document.getElementById('popupNovoParceiro').classList.remove('show');
    limparCamposParceiro();
}

function limparCamposParceiro() {
    var campos = ['parc_nome','parc_cpf','parc_telefone','parc_cep','parc_codcid','parc_cidade_input','parc_codend','parc_logradouro_input','parc_numero'];
    for (var i = 0; i < campos.length; i++) {
        var el = document.getElementById(campos[i]);
        if (el) el.value = '';
    }
    var listaCid = document.getElementById('parc_lista_cidade');
    var listaLog = document.getElementById('parc_lista_logradouro');
    if (listaCid) listaCid.classList.remove('show');
    if (listaLog) listaLog.classList.remove('show');
    cidadeIndexPopup = -1;
    logradouroIndexPopup = -1;
}

// ══════════════════════════════════════════════════════════════
// LOOKUP CIDADE
// ══════════════════════════════════════════════════════════════
function mostrarListaCidadePopup() {
    cidadeIndexPopup = -1;
    var lista = document.getElementById('parc_lista_cidade');
    if (!CIDADES_POPUP.length) {
        lista.innerHTML = '<div class="lookup-popup-loading">Carregando cidades...</div>';
        lista.classList.add('show');
        return;
    }
    renderizarListaCidadePopup(CIDADES_POPUP.slice(0, 50));
}

function buscarCidadePopup(termo) {
    cidadeIndexPopup = -1;
    if (!termo) { mostrarListaCidadePopup(); return; }
    var t = termo.toLowerCase();
    var filtrados = CIDADES_POPUP.filter(function(c) {
        return String(c.CODCID).indexOf(termo) >= 0 || 
               c.NOMECID.toLowerCase().indexOf(t) >= 0;
    });
    renderizarListaCidadePopup(filtrados);
}

function renderizarListaCidadePopup(filtrados) {
    var lista = document.getElementById('parc_lista_cidade');
    if (!filtrados.length) {
        lista.innerHTML = '<div class="lookup-popup-empty">Nenhuma cidade encontrada</div>';
    } else {
        var html = '';
        var max = Math.min(filtrados.length, 50);
        for (var i = 0; i < max; i++) {
            var c = filtrados[i];
            var nomeEsc = (c.NOMECID || '').replace(/'/g, "\\'");
            html += '<div class="lookup-popup-item" data-index="' + i + '" ' +
                'onclick="selecionarCidadePopup(' + c.CODCID + ',\'' + nomeEsc + '\',\'' + (c.UF || '') + '\')">' +
                '<span class="lookup-popup-item-cod">' + c.CODCID + '</span>' +
                '<span class="lookup-popup-item-desc">' + c.NOMECID + ' - ' + (c.UF || '') + '</span></div>';
        }
        lista.innerHTML = html;
    }
    lista.classList.add('show');
}

function navegarListaCidadePopup(e) {
    var lista = document.getElementById('parc_lista_cidade');
    var items = lista.querySelectorAll('.lookup-popup-item[data-index]');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        cidadeIndexPopup = Math.min(cidadeIndexPopup + 1, items.length - 1);
        atualizarItemAtivoLookup(items, cidadeIndexPopup);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        cidadeIndexPopup = Math.max(cidadeIndexPopup - 1, 0);
        atualizarItemAtivoLookup(items, cidadeIndexPopup);
    } else if (e.key === 'Enter' && cidadeIndexPopup >= 0) {
        e.preventDefault();
        items[cidadeIndexPopup].click();
    } else if (e.key === 'Escape') {
        lista.classList.remove('show');
    }
}

function selecionarCidadePopup(cod, nome, uf) {
    document.getElementById('parc_codcid').value = cod;
    document.getElementById('parc_cidade_input').value = cod + ' - ' + nome + ' (' + uf + ')';
    document.getElementById('parc_lista_cidade').classList.remove('show');
    // Foca no próximo campo
    document.getElementById('parc_logradouro_input').focus();
}

// ══════════════════════════════════════════════════════════════
// LOOKUP LOGRADOURO
// ══════════════════════════════════════════════════════════════
function mostrarListaLogradouroPopup() {
    logradouroIndexPopup = -1;
    var lista = document.getElementById('parc_lista_logradouro');
    if (!LOGRADOUROS_POPUP.length) {
        lista.innerHTML = '<div class="lookup-popup-loading">Carregando logradouros...</div>';
        lista.classList.add('show');
        return;
    }
    renderizarListaLogradouroPopup(LOGRADOUROS_POPUP.slice(0, 50));
}

function buscarLogradouroPopup(termo) {
    logradouroIndexPopup = -1;
    if (!termo) { mostrarListaLogradouroPopup(); return; }
    var t = termo.toLowerCase();
    var filtrados = LOGRADOUROS_POPUP.filter(function(l) {
        return String(l.CODEND).indexOf(termo) >= 0 || 
               l.NOMEEND.toLowerCase().indexOf(t) >= 0;
    });
    renderizarListaLogradouroPopup(filtrados);
}

function renderizarListaLogradouroPopup(filtrados) {
    var lista = document.getElementById('parc_lista_logradouro');
    if (!filtrados.length) {
        lista.innerHTML = '<div class="lookup-popup-empty">Nenhum logradouro encontrado</div>';
    } else {
        var html = '';
        var max = Math.min(filtrados.length, 50);
        for (var i = 0; i < max; i++) {
            var l = filtrados[i];
            var nomeEsc = (l.NOMEEND || '').replace(/'/g, "\\'");
            html += '<div class="lookup-popup-item" data-index="' + i + '" ' +
                'onclick="selecionarLogradouroPopup(' + l.CODEND + ',\'' + nomeEsc + '\')">' +
                '<span class="lookup-popup-item-cod">' + l.CODEND + '</span>' +
                '<span class="lookup-popup-item-desc">' + (l.TIPO || '') + ' ' + l.NOMEEND + '</span></div>';
        }
        lista.innerHTML = html;
    }
    lista.classList.add('show');
}

function navegarListaLogradouroPopup(e) {
    var lista = document.getElementById('parc_lista_logradouro');
    var items = lista.querySelectorAll('.lookup-popup-item[data-index]');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        logradouroIndexPopup = Math.min(logradouroIndexPopup + 1, items.length - 1);
        atualizarItemAtivoLookup(items, logradouroIndexPopup);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        logradouroIndexPopup = Math.max(logradouroIndexPopup - 1, 0);
        atualizarItemAtivoLookup(items, logradouroIndexPopup);
    } else if (e.key === 'Enter' && logradouroIndexPopup >= 0) {
        e.preventDefault();
        items[logradouroIndexPopup].click();
    } else if (e.key === 'Escape') {
        lista.classList.remove('show');
    }
}

function selecionarLogradouroPopup(cod, nome) {
    document.getElementById('parc_codend').value = cod;
    document.getElementById('parc_logradouro_input').value = cod + ' - ' + nome;
    document.getElementById('parc_lista_logradouro').classList.remove('show');
    // Foca no próximo campo
    document.getElementById('parc_numero').focus();
}

// ══════════════════════════════════════════════════════════════
// FUNÇÃO AUXILIAR LOOKUP
// ══════════════════════════════════════════════════════════════
function atualizarItemAtivoLookup(items, idx) {
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }
    if (idx >= 0 && items[idx]) {
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ block: 'nearest' });
    }
}

// ══════════════════════════════════════════════════════════════
// MÁSCARAS DE INPUT
// ══════════════════════════════════════════════════════════════
function mascaraCPF(input) {
    var v = input.value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 9) {
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (v.length > 6) {
        v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (v.length > 3) {
        v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    input.value = v;
}

function mascaraTelefone(input) {
    var v = input.value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    input.value = v;
}

function mascaraCEP(input) {
    var v = input.value.replace(/\D/g, '').substring(0, 8);
    if (v.length > 5) {
        v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    input.value = v;
}

// ══════════════════════════════════════════════════════════════
// SALVAR PARCEIRO
// ══════════════════════════════════════════════════════════════
function salvarParceiro() {
    var nome = document.getElementById('parc_nome').value.trim();
    var cpf = document.getElementById('parc_cpf').value.replace(/\D/g, '');
    var telefone = document.getElementById('parc_telefone').value.replace(/\D/g, '');
    var cep = document.getElementById('parc_cep').value.replace(/\D/g, '');
    var codcid = document.getElementById('parc_codcid').value;
    var codend = document.getElementById('parc_codend').value;
    var numero = document.getElementById('parc_numero').value.trim();

    // Validação
    var erros = [];
    if (!nome) erros.push('Nome é obrigatório');
    if (!telefone) erros.push('Telefone é obrigatório');
    if (!cep) erros.push('CEP é obrigatório');
    if (!codcid) erros.push('Cidade é obrigatória');
    if (!codend) erros.push('Logradouro é obrigatório');
    if (!numero) erros.push('Número é obrigatório');

    if (erros.length) {
        alert('Campos obrigatórios:\n\n' + erros.join('\n'));
        return;
    }

    // Montar parâmetros para rotina Java
    var params = {
        NOME: nome,
        TELEFONE: telefone,
        CEP: cep,
        CODCID: parseInt(codcid),
        CODEND: parseInt(codend),
        NUMERO: numero
    };

    // CPF opcional
    if (cpf && cpf.length === 11) {
        params.CPF = cpf;
    }

    // Feedback visual
    var btnSalvar = document.querySelector('#popupNovoParceiro .btn-popup-salvar');
    var textoOriginal = btnSalvar.textContent;
    btnSalvar.textContent = 'Salvando...';
    btnSalvar.disabled = true;

    // Chamar rotina Java
    JX.executarAcao(ID_ROTINA_PARCEIRO, params)
        .then(function(resultado) {
            console.log('[Parceiro] Retorno rotina:', resultado);

            var codparc = null;
            if (resultado && resultado.CODPARC) {
                codparc = resultado.CODPARC;
            } else if (resultado && resultado.pk && resultado.pk.CODPARC) {
                codparc = resultado.pk.CODPARC;
            } else if (resultado && resultado.mensagemRetorno) {
                var match = resultado.mensagemRetorno.match(/CODPARC[:\s]*(\d+)/i);
                if (match) codparc = match[1];
            }

            if (!codparc) {
                return JX.consultar("SELECT MAX(CODPARC) AS CODPARC FROM TGFPAR WHERE NOMEPARC = '" + nome.replace(/'/g, "''") + "'")
                    .then(function(r) {
                        return (r && r[0]) ? r[0].CODPARC : 'N/A';
                    });
            }
            return codparc;
        })
        .then(function(codparc) {
            ultimoParceiroInserido = {
                CODPARC: codparc,
                NOME: nome,
                TELEFONE: telefone
            };

            btnSalvar.textContent = textoOriginal;
            btnSalvar.disabled = false;

            fecharPopupNovoParceiro();
            mostrarPopupSucessoParceiro();
        })
        .catch(function(erro) {
            console.error('[Parceiro] Erro ao cadastrar:', erro);
            btnSalvar.textContent = textoOriginal;
            btnSalvar.disabled = false;
            alert('Erro ao cadastrar parceiro:\n\n' + (erro.message || erro));
        });
}

// ══════════════════════════════════════════════════════════════
// POPUP SUCESSO PARCEIRO
// ══════════════════════════════════════════════════════════════
function mostrarPopupSucessoParceiro() {
    var texto = 'CODPARC:   ' + ultimoParceiroInserido.CODPARC + '\n' +
                'NOME:      ' + ultimoParceiroInserido.NOME + '\n' +
                'TELEFONE:  ' + ultimoParceiroInserido.TELEFONE;
    document.getElementById('parc_sucesso_code').textContent = texto;
    document.getElementById('popupSucessoParceiro').classList.add('show');
}

function fecharPopupSucessoParceiro() {
    document.getElementById('popupSucessoParceiro').classList.remove('show');
}

function copiarDadosParceiro() {
    var texto = 'CODPARC: ' + ultimoParceiroInserido.CODPARC + ' | NOME: ' + ultimoParceiroInserido.NOME + ' | TEL: ' + ultimoParceiroInserido.TELEFONE;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function() {
            mostrarBotaoCopiado('popupSucessoParceiro');
        });
    } else {
        var ta = document.createElement('textarea');
        ta.value = texto;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        mostrarBotaoCopiado('popupSucessoParceiro');
    }
}

function mostrarBotaoCopiado(popupId) {
    var btn = document.querySelector('#' + popupId + ' .btn-popup-copiar');
    if (!btn) return;
    btn.textContent = 'Copiado!';
    btn.classList.add('copiado');
    setTimeout(function() {
        btn.textContent = 'Copiar';
        btn.classList.remove('copiado');
    }, 2000);
}
