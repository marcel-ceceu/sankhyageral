/* ==========================================================
   PRODUTO.JS - Cadastro de Novo Produto
   Menu Geral APESP - Arquitetura Modular
   Usa JX.salvar() direto na entidade (sem rotina Java)
   ========================================================== */

var MARCAS_POPUP = [];
var GRUPOS_POPUP = [];
var marcaIndexPopup = -1;
var grupoIndexPopup = -1;
var ultimoProdutoInserido = {};

// ══════════════════════════════════════════════════════════════
// CARREGAR DADOS PARA LOOKUPS
// ══════════════════════════════════════════════════════════════
function carregarDadosProduto() {
    JX.consultar("SELECT CODIGO, DESCRICAO FROM TGFMAR ORDER BY DESCRICAO")
        .then(function(r) { 
            MARCAS_POPUP = r || []; 
            console.log('[Produto] Marcas carregadas:', MARCAS_POPUP.length);
        })
        .catch(function(e) { console.error('[Produto] Erro marcas:', e); });

    JX.consultar("SELECT CODGRUPOPROD, DESCRGRUPOPROD FROM TGFGRU WHERE ATIVO = 'S' ORDER BY DESCRGRUPOPROD")
        .then(function(r) { 
            GRUPOS_POPUP = r || []; 
            console.log('[Produto] Grupos carregados:', GRUPOS_POPUP.length);
        })
        .catch(function(e) { console.error('[Produto] Erro grupos:', e); });
}

// ══════════════════════════════════════════════════════════════
// ABRIR / FECHAR POPUP
// ══════════════════════════════════════════════════════════════
function abrirPopupNovoProduto() {
    document.getElementById('popupNovoProduto').classList.add('show');
    setTimeout(function() { 
        document.getElementById('prod_descrprod').focus(); 
    }, 100);
}

function fecharPopupNovoProduto() {
    document.getElementById('popupNovoProduto').classList.remove('show');
    limparCamposProduto();
}

function limparCamposProduto() {
    var campos = ['prod_descrprod','prod_codmarca','prod_nomemarca','prod_marca_input','prod_codgrupoprod','prod_grupo_input','prod_compldesc','prod_refforn'];
    for (var i = 0; i < campos.length; i++) {
        var el = document.getElementById(campos[i]);
        if (el) el.value = '';
    }
    var listaMarca = document.getElementById('prod_lista_marca');
    var listaGrupo = document.getElementById('prod_lista_grupo');
    if (listaMarca) listaMarca.classList.remove('show');
    if (listaGrupo) listaGrupo.classList.remove('show');
    marcaIndexPopup = -1;
    grupoIndexPopup = -1;
}

// ══════════════════════════════════════════════════════════════
// LOOKUP MARCA
// ══════════════════════════════════════════════════════════════
function mostrarListaMarcaPopup() {
    marcaIndexPopup = -1;
    var lista = document.getElementById('prod_lista_marca');
    if (!MARCAS_POPUP.length) {
        lista.innerHTML = '<div class="lookup-popup-loading">Carregando marcas...</div>';
        lista.classList.add('show');
        return;
    }
    renderizarListaMarcaPopup(MARCAS_POPUP.slice(0, 50));
}

function buscarMarcaPopup(termo) {
    marcaIndexPopup = -1;
    if (!termo) { mostrarListaMarcaPopup(); return; }
    var t = termo.toLowerCase();
    var filtrados = MARCAS_POPUP.filter(function(m) {
        return String(m.CODIGO).indexOf(termo) >= 0 || 
               m.DESCRICAO.toLowerCase().indexOf(t) >= 0;
    });
    renderizarListaMarcaPopup(filtrados);
}

function renderizarListaMarcaPopup(filtrados) {
    var lista = document.getElementById('prod_lista_marca');
    if (!filtrados.length) {
        lista.innerHTML = '<div class="lookup-popup-empty">Nenhuma marca encontrada</div>';
    } else {
        var html = '';
        var max = Math.min(filtrados.length, 50);
        for (var i = 0; i < max; i++) {
            var m = filtrados[i];
            var descEsc = (m.DESCRICAO || '').replace(/'/g, "\\'");
            html += '<div class="lookup-popup-item" data-index="' + i + '" ' +
                'onclick="selecionarMarcaPopup(' + m.CODIGO + ',\'' + descEsc + '\')">' +
                '<span class="lookup-popup-item-cod">' + m.CODIGO + '</span>' +
                '<span class="lookup-popup-item-desc">' + m.DESCRICAO + '</span></div>';
        }
        lista.innerHTML = html;
    }
    lista.classList.add('show');
}

function navegarListaMarcaPopup(e) {
    var lista = document.getElementById('prod_lista_marca');
    var items = lista.querySelectorAll('.lookup-popup-item[data-index]');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        marcaIndexPopup = Math.min(marcaIndexPopup + 1, items.length - 1);
        atualizarItemAtivoLookupProd(items, marcaIndexPopup);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        marcaIndexPopup = Math.max(marcaIndexPopup - 1, 0);
        atualizarItemAtivoLookupProd(items, marcaIndexPopup);
    } else if (e.key === 'Enter' && marcaIndexPopup >= 0) {
        e.preventDefault();
        items[marcaIndexPopup].click();
    } else if (e.key === 'Escape') {
        lista.classList.remove('show');
    }
}

function selecionarMarcaPopup(cod, desc) {
    document.getElementById('prod_codmarca').value = cod;
    document.getElementById('prod_nomemarca').value = desc;
    document.getElementById('prod_marca_input').value = cod + ' - ' + desc;
    document.getElementById('prod_lista_marca').classList.remove('show');
    document.getElementById('prod_grupo_input').focus();
}

// ══════════════════════════════════════════════════════════════
// LOOKUP GRUPO
// ══════════════════════════════════════════════════════════════
function mostrarListaGrupoPopup() {
    grupoIndexPopup = -1;
    var lista = document.getElementById('prod_lista_grupo');
    if (!GRUPOS_POPUP.length) {
        lista.innerHTML = '<div class="lookup-popup-loading">Carregando grupos...</div>';
        lista.classList.add('show');
        return;
    }
    renderizarListaGrupoPopup(GRUPOS_POPUP.slice(0, 50));
}

function buscarGrupoPopup(termo) {
    grupoIndexPopup = -1;
    if (!termo) { mostrarListaGrupoPopup(); return; }
    var t = termo.toLowerCase();
    var filtrados = GRUPOS_POPUP.filter(function(g) {
        return String(g.CODGRUPOPROD).indexOf(termo) >= 0 || 
               g.DESCRGRUPOPROD.toLowerCase().indexOf(t) >= 0;
    });
    renderizarListaGrupoPopup(filtrados);
}

function renderizarListaGrupoPopup(filtrados) {
    var lista = document.getElementById('prod_lista_grupo');
    if (!filtrados.length) {
        lista.innerHTML = '<div class="lookup-popup-empty">Nenhum grupo encontrado</div>';
    } else {
        var html = '';
        var max = Math.min(filtrados.length, 50);
        for (var i = 0; i < max; i++) {
            var g = filtrados[i];
            var descEsc = (g.DESCRGRUPOPROD || '').replace(/'/g, "\\'");
            html += '<div class="lookup-popup-item" data-index="' + i + '" ' +
                'onclick="selecionarGrupoPopup(' + g.CODGRUPOPROD + ',\'' + descEsc + '\')">' +
                '<span class="lookup-popup-item-cod">' + g.CODGRUPOPROD + '</span>' +
                '<span class="lookup-popup-item-desc">' + g.DESCRGRUPOPROD + '</span></div>';
        }
        lista.innerHTML = html;
    }
    lista.classList.add('show');
}

function navegarListaGrupoPopup(e) {
    var lista = document.getElementById('prod_lista_grupo');
    var items = lista.querySelectorAll('.lookup-popup-item[data-index]');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        grupoIndexPopup = Math.min(grupoIndexPopup + 1, items.length - 1);
        atualizarItemAtivoLookupProd(items, grupoIndexPopup);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        grupoIndexPopup = Math.max(grupoIndexPopup - 1, 0);
        atualizarItemAtivoLookupProd(items, grupoIndexPopup);
    } else if (e.key === 'Enter' && grupoIndexPopup >= 0) {
        e.preventDefault();
        items[grupoIndexPopup].click();
    } else if (e.key === 'Escape') {
        lista.classList.remove('show');
    }
}

function selecionarGrupoPopup(cod, desc) {
    document.getElementById('prod_codgrupoprod').value = cod;
    document.getElementById('prod_grupo_input').value = cod + ' - ' + desc;
    document.getElementById('prod_lista_grupo').classList.remove('show');
    document.getElementById('prod_compldesc').focus();
}

// ══════════════════════════════════════════════════════════════
// FUNÇÃO AUXILIAR LOOKUP
// ══════════════════════════════════════════════════════════════
function atualizarItemAtivoLookupProd(items, idx) {
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }
    if (idx >= 0 && items[idx]) {
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ block: 'nearest' });
    }
}

// ══════════════════════════════════════════════════════════════
// SALVAR PRODUTO (JX.salvar direto na entidade)
// ══════════════════════════════════════════════════════════════
function salvarProduto() {
    var descrprod = document.getElementById('prod_descrprod').value.trim();
    var nomemarca = document.getElementById('prod_nomemarca').value.trim();
    var codgrupoprod = document.getElementById('prod_codgrupoprod').value;
    var compldesc = document.getElementById('prod_compldesc').value.trim();
    var refforn = document.getElementById('prod_refforn').value.trim();

    // Validação
    var erros = [];
    if (!descrprod) erros.push('Nome do Produto é obrigatório');
    if (!nomemarca) erros.push('Marca é obrigatória');
    if (!codgrupoprod) erros.push('Grupo de Produtos é obrigatório');

    if (erros.length) {
        alert('Campos obrigatórios:\n\n' + erros.join('\n'));
        return;
    }

    // Data atual formatada DD/MM/YYYY HH:MM:SS
    var agora = new Date();
    var dtalter = ('0' + agora.getDate()).slice(-2) + '/' +
                  ('0' + (agora.getMonth() + 1)).slice(-2) + '/' +
                  agora.getFullYear() + ' ' +
                  ('0' + agora.getHours()).slice(-2) + ':' +
                  ('0' + agora.getMinutes()).slice(-2) + ':' +
                  ('0' + agora.getSeconds()).slice(-2);

    // Montar objeto de dados para JX.salvar
    var dados = {
        DESCRPROD: descrprod,
        MARCA: nomemarca,
        CODGRUPOPROD: parseInt(codgrupoprod),
        // Valores fixos (confirmados pelo usuário)
        CODVOL: 'UN',
        CODVOLCOMPRA: 'UN',
        CSTIPIENT: 49,
        CSTIPISAI: 99,
        DTALTER: dtalter,
        GRUPOICMS: 60,
        USALOCAL: 'S',
        USOPROD: 'R',
        TIPSUBST: 'A',
        DESCMAX: 99,
        DECQTD: 2,
        CODIPI: 5,
        CLASSUBTRIB: 14,
        CODFORMPREC: 3,
        NCM: '84879000',
        CODLOCALPADRAO: 101,
        CALCDIFAL: 'S'
    };

    // Campos opcionais
    if (compldesc) dados.COMPLDESC = compldesc;
    if (refforn) dados.REFFORN = refforn;

    // Feedback visual
    var btnSalvar = document.querySelector('#popupNovoProduto .btn-popup-salvar');
    var textoOriginal = btnSalvar.textContent;
    btnSalvar.textContent = 'Salvando...';
    btnSalvar.disabled = true;

    // Chamar JX.salvar na entidade Produto
    JX.salvar(dados, 'Produto', [{}])
        .then(function(resultado) {
            console.log('[Produto] Retorno JX.salvar:', resultado);

            var codprod = null;
            
            // Tentar extrair CODPROD do retorno
            if (resultado && resultado[0] && resultado[0].responseBody && 
                resultado[0].responseBody.entities && resultado[0].responseBody.entities.entity) {
                var entity = resultado[0].responseBody.entities.entity;
                codprod = entity.CODPROD && entity.CODPROD.$;
            }
            if (!codprod && resultado && resultado.pk) {
                codprod = resultado.pk.CODPROD;
            }
            if (!codprod && resultado && resultado.CODPROD) {
                codprod = resultado.CODPROD;
            }
            if (!codprod && resultado && resultado[0] && resultado[0].CODPROD) {
                codprod = resultado[0].CODPROD;
            }

            // Fallback: buscar no banco
            if (!codprod) {
                return JX.consultar("SELECT MAX(CODPROD) AS CODPROD FROM TGFPRO WHERE DESCRPROD = '" + descrprod.replace(/'/g, "''") + "'")
                    .then(function(r) {
                        return (r && r[0]) ? r[0].CODPROD : 'N/A';
                    });
            }
            return codprod;
        })
        .then(function(codprod) {
            ultimoProdutoInserido = {
                CODPROD: codprod,
                NOME: descrprod,
                REFFORN: refforn || '-'
            };

            btnSalvar.textContent = textoOriginal;
            btnSalvar.disabled = false;

            fecharPopupNovoProduto();
            mostrarPopupSucessoProduto();
        })
        .catch(function(erro) {
            console.error('[Produto] Erro ao cadastrar:', erro);
            btnSalvar.textContent = textoOriginal;
            btnSalvar.disabled = false;
            alert('Erro ao cadastrar produto:\n\n' + (erro.message || erro));
        });
}

// ══════════════════════════════════════════════════════════════
// POPUP SUCESSO PRODUTO
// ══════════════════════════════════════════════════════════════
function mostrarPopupSucessoProduto() {
    var texto = 'CODPROD:  ' + ultimoProdutoInserido.CODPROD + '\n' +
                'NOME:     ' + ultimoProdutoInserido.NOME + '\n' +
                'REFFORN:  ' + ultimoProdutoInserido.REFFORN;
    document.getElementById('prod_sucesso_code').textContent = texto;
    document.getElementById('popupSucessoProduto').classList.add('show');
}

function fecharPopupSucessoProduto() {
    document.getElementById('popupSucessoProduto').classList.remove('show');
}

function copiarDadosProduto() {
    var texto = 'CODPROD: ' + ultimoProdutoInserido.CODPROD + ' | NOME: ' + ultimoProdutoInserido.NOME + ' | REFFORN: ' + ultimoProdutoInserido.REFFORN;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function() {
            mostrarBotaoCopiadoProd('popupSucessoProduto');
        });
    } else {
        var ta = document.createElement('textarea');
        ta.value = texto;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        mostrarBotaoCopiadoProd('popupSucessoProduto');
    }
}

function mostrarBotaoCopiadoProd(popupId) {
    var btn = document.querySelector('#' + popupId + ' .btn-popup-copiar');
    if (!btn) return;
    btn.textContent = 'Copiado!';
    btn.classList.add('copiado');
    setTimeout(function() {
        btn.textContent = 'Copiar';
        btn.classList.remove('copiado');
    }, 2000);
}
