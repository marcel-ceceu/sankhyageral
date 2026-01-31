/* ==========================================================
   MAIN - Menu Geral APESP
   ========================================================== */

var VERSICULOS_FALLBACK = [
    { texto: 'Tudo posso naquele que me fortalece.', ref: 'Filipenses 4:13' },
    { texto: 'O Senhor é meu pastor e nada me faltará.', ref: 'Salmos 23:1' },
    { texto: 'Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.', ref: 'Provérbios 3:5' },
    { texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', ref: 'João 3:16' },
    { texto: 'Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas.', ref: 'Mateus 6:33' },
    { texto: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.', ref: 'Salmos 37:5' },
    { texto: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo.', ref: 'Isaías 41:10' },
    { texto: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.', ref: '1 Tessalonicenses 5:18' },
    { texto: 'Alegrem-se sempre no Senhor. Novamente direi: alegrem-se!', ref: 'Filipenses 4:4' },
    { texto: 'Lança o teu cuidado sobre o Senhor, e ele te susterá; nunca permitirá que o justo seja abalado.', ref: 'Salmos 55:22' },
    { texto: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.', ref: 'Mateus 11:28' },
    { texto: 'E conhecereis a verdade, e a verdade vos libertará.', ref: 'João 8:32' },
    { texto: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal.', ref: 'Jeremias 29:11' }
];

function carregarVersiculo() {
    var elemento = document.getElementById('versiculoDia');
    if (!elemento) return;

    elemento.innerHTML = '<em style="opacity:0.7">Carregando...</em>';

    fetch('https://www.abibliadigital.com.br/api/verses/nvi/random')
        .then(function(response) {
            if (!response.ok) throw new Error('API indisponível');
            return response.json();
        })
        .then(function(data) {
            var texto = data.text || '';
            var livro = data.book ? data.book.name : '';
            var capitulo = data.chapter || '';
            var versiculo = data.number || '';
            var referencia = livro + ' ' + capitulo + ':' + versiculo;

            elemento.innerHTML = '"' + texto + '"<span class="versiculo-ref">— ' + referencia + '</span>';
        })
        .catch(function() {
            console.warn('API bíblica indisponível, usando fallback local');
            exibirVersiculoLocal();
        });
}

function exibirVersiculoLocal() {
    var indice = Math.floor(Math.random() * VERSICULOS_FALLBACK.length);
    var v = VERSICULOS_FALLBACK[indice];

    var elemento = document.getElementById('versiculoDia');
    if (elemento) {
        elemento.innerHTML = '"' + v.texto + '"<span class="versiculo-ref">— ' + v.ref + '</span>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarVersiculo();

    if (typeof carregarDadosParceiro === 'function') {
        carregarDadosParceiro();
    }
    if (typeof carregarDadosProduto === 'function') {
        carregarDadosProduto();
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.lookup-popup-wrap')) {
            var listas = document.querySelectorAll('.lookup-popup-list');
            for (var i = 0; i < listas.length; i++) {
                listas[i].classList.remove('show');
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var overlays = document.querySelectorAll('.popup-overlay.show');
            if (overlays.length > 0) {
                overlays[overlays.length - 1].classList.remove('show');
            }
        }
    });
});

function abrirTelaInterna(resourceId) {
    if (typeof JX !== 'undefined' && typeof JX.abrirPagina === 'function') {
        JX.abrirPagina(resourceId, {});
        return;
    }

    try {
        window.parent.postMessage({
            action: 'openApp',
            resourceId: resourceId
        }, '*');
        return;
    } catch (e) {
        console.error('postMessage falhou:', e);
    }

    try {
        window.top.postMessage({
            action: 'openApp',
            resourceId: resourceId
        }, '*');
        return;
    } catch (e) {
        console.error('top.postMessage falhou:', e);
    }

    alert('Não foi possível abrir a tela internamente. Verifique o resourceId ou entre em contato com o suporte.');
}

function abrirModalCpf() {
    document.getElementById('modalCpfBackdrop').style.display = 'flex';
    setTimeout(function() {
        document.getElementById('inputCpfConsulta').focus();
    }, 0);
}

function fecharModalCpf() {
    if (isExecutando) return;
    document.getElementById('modalCpfBackdrop').style.display = 'none';
    document.getElementById('inputCpfConsulta').value = '';
}

function abrirModalResultado(html) {
    document.getElementById('resultadoContainer').innerHTML = html || "<div style='color:#b00;'>Nenhum conteúdo retornado.</div>";
    document.getElementById('modalResultadoBackdrop').style.display = 'flex';
}

function fecharModalResultado() {
    document.getElementById('modalResultadoBackdrop').style.display = 'none';
    document.getElementById('resultadoContainer').innerHTML = '';
}

document.getElementById('modalCpfBackdrop').addEventListener('click', function(e) {
    if (e.target && e.target.id === 'modalCpfBackdrop') fecharModalCpf();
});
document.getElementById('modalResultadoBackdrop').addEventListener('click', function(e) {
    if (e.target && e.target.id === 'modalResultadoBackdrop') fecharModalResultado();
});

var isExecutando = false;

function setLoading(loading) {
    isExecutando = loading;
    document.getElementById('cpfSpinner').style.display = loading ? 'inline-block' : 'none';
    document.getElementById('btnExecutarCpf').disabled = loading;
    document.getElementById('btnCancelarCpf').disabled = loading;
}

function normalizarCpf(v) { return (v || '').replace(/\D/g, ''); }

async function confirmarCpf() {
    var cpf = normalizarCpf(document.getElementById('inputCpfConsulta').value);

    if (!cpf) { alert('Informe o CPF.'); return; }
    if (cpf.length !== 11) { alert('CPF inválido. Deve ter 11 dígitos.'); return; }

    var params = {};
    params[NOME_PARAMETRO] = cpf;

    try {
        setLoading(true);

        var res = await JX.acionarBotao(params, { idBotao: ID_BOTAO_ROTINA, tipo: 'JAVA' });

        var htmlRetorno =
            (res && (res.mensagemRetorno || res.mensagem || res.message)) ||
            (res && res.data && (res.data.mensagemRetorno || res.data.mensagem || res.data.message)) ||
            null;

        fecharModalCpf();

        if (htmlRetorno && typeof htmlRetorno === 'string' && htmlRetorno.indexOf('<') >= 0) {
            abrirModalResultado(htmlRetorno);
            return;
        }

        var htmlNovo = await montarResultadoVisualViaBanco(cpf);
        abrirModalResultado(htmlNovo);

    } catch (err) {
        console.error(err);
        alert((err && err.message) || 'Falha ao executar a rotina.');
    } finally {
        setLoading(false);
    }
}

async function montarResultadoVisualViaBanco(cpf) {
    var SQL = '\
        SELECT\
            DTCONSULTA,\
            NOMEPARC,\
            STATUS,\
            SCORE,\
            SCOREINFO,\
            RISCO,\
            RISCODESC,\
            VAIPAGAR,\
            PROBDESC,\
            COMPORTAMENTO,\
            PAGDESC,\
            PERFIL,\
            PERFILDESC,\
            CODRETORNO\
        FROM AD_CONSULTACPF\
        WHERE CPF = \'' + cpf + '\'\
        ORDER BY DTCONSULTA DESC\
        FETCH FIRST 1 ROWS ONLY\
    ';

    var rows = await JX.consultar(SQL);
    if (!rows || !rows.length) {
        return '\
            <div class="resultado-shell">\
                <div class="resultado-hero">\
                    <div>\
                        <div class="hero-title">📊 Consulta Score Positivo</div>\
                        <div class="hero-sub">Não foi possível localizar um registro salvo no histórico para este CPF.</div>\
                    </div>\
                    <div class="badge-status">⚠️ Sem histórico</div>\
                </div>\
                <div class="resultado-body">\
                    <div class="card">\
                        <h4>🧾 Identificação</h4>\
                        <div class="kv-grid">\
                            <div class="kv">\
                                <div class="k">CPF</div>\
                                <div class="v mono">' + escapeHtml(formatarCPF(cpf)) + '</div>\
                            </div>\
                            <div class="kv">\
                                <div class="k">Ação sugerida</div>\
                                <div class="v">Verifique a execução da rotina e a gravação em AD_CONSULTACPF.</div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';
    }

    var r = rows[0];

    var nome = r.NOMEPARC || '---';
    var status = r.STATUS || '---';
    var dtConsulta = r.DTCONSULTA || '';
    var score = Number(r.SCORE || 0);
    var scoreInfo = r.SCOREINFO || '';
    var risco = (r.RISCO || '').toString();
    var riscoDesc = r.RISCODESC || '';
    var prob = Number(r.VAIPAGAR || 0);
    var probDesc = r.PROBDESC || '';
    var comportamento = r.COMPORTAMENTO || '';
    var pagDesc = r.PAGDESC || '';
    var perfil = r.PERFIL || '';
    var perfilDesc = r.PERFILDESC || '';
    var codRetorno = r.CODRETORNO != null ? String(r.CODRETORNO) : '';

    var scoreBg = 'rgba(220,53,69,0.10)', scoreFg = '#721c24';
    var scoreLabel = 'Alto risco';
    if (score >= 700) { scoreBg = 'rgba(40,167,69,0.12)'; scoreFg = '#155724'; scoreLabel = 'Bom score'; }
    else if (score >= 400) { scoreBg = 'rgba(255,193,7,0.14)'; scoreFg = '#856404'; scoreLabel = 'Score médio'; }

    var riscoUpper = risco.toUpperCase();
    var riscoClass = 'high';
    if (riscoUpper === 'BAIXO') riscoClass = 'low';
    else if (riscoUpper === 'MEDIO' || riscoUpper === 'MÉDIO') riscoClass = 'mid';

    var statusBadge = status ? '✅ ' + escapeHtml(status) : '✅ OK';
    var dtTxt = dtConsulta ? String(dtConsulta) : '';

    return '\
        <div class="resultado-shell">\
            <div class="resultado-hero">\
                <div>\
                    <div class="hero-title">📊 Consulta Score Positivo</div>\
                    <div class="hero-sub">\
                        Resultado organizado para leitura rápida e decisão.<br>\
                        <span class="mono">CPF ' + escapeHtml(formatarCPF(cpf)) + '</span>\
                        ' + (dtTxt ? ' • <span>' + escapeHtml(dtTxt) + '</span>' : '') + '\
                    </div>\
                </div>\
                <div class="badge-status">' + statusBadge + '</div>\
            </div>\
            <div class="resultado-body">\
                <div class="sec-grid">\
                    <div class="card">\
                        <h4>🧾 Identificação</h4>\
                        <div class="kv-grid">\
                            <div class="kv">\
                                <div class="k">Cliente</div>\
                                <div class="v">' + escapeHtml(nome) + '</div>\
                            </div>\
                            <div class="kv">\
                                <div class="k">CPF</div>\
                                <div class="v mono">' + escapeHtml(formatarCPF(cpf)) + '</div>\
                            </div>\
                            <div class="kv">\
                                <div class="k">Código retorno</div>\
                                <div class="v">' + (codRetorno ? escapeHtml(codRetorno) : '---') + '</div>\
                                <div class="v"><small>Útil para suporte/diagnóstico.</small></div>\
                            </div>\
                            <div class="kv">\
                                <div class="k">Status</div>\
                                <div class="v">' + escapeHtml(status) + '</div>\
                                <div class="v"><small>Retornado pela API (ou rotina).</small></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="card">\
                        <h4>⭐ Score</h4>\
                        <div class="score-wrap">\
                            <div class="score-big" style="background:' + scoreBg + '; color:' + scoreFg + ';">\
                                <div class="score-label">' + escapeHtml(scoreLabel) + '</div>\
                                <div class="score-num">' + (isFinite(score) ? score : 0) + '</div>\
                                <div class="score-sub">de 1000 pontos</div>\
                                ' + (scoreInfo ? '<div class="note">' + escapeHtml(scoreInfo) + '</div>' : '') + '\
                            </div>\
                            <div class="pill-row">\
                                ' + (risco ? '<div class="pill ' + riscoClass + '">🎯 Risco: <b>' + escapeHtml(risco) + '</b></div>' : '') + '\
                                ' + (prob > 0 ? '<div class="pill low">💯 Prob.: <b>' + prob + '%</b></div>' : '') + '\
                            </div>\
                            ' + ((riscoDesc || probDesc) ? '\
                                <div class="note">\
                                    ' + (riscoDesc ? '<div><b>Risco:</b> ' + escapeHtml(riscoDesc) + '</div>' : '') + '\
                                    ' + (probDesc ? '<div style="margin-top:6px;"><b>Probabilidade:</b> ' + escapeHtml(probDesc) + '</div>' : '') + '\
                                </div>' : '') + '\
                        </div>\
                    </div>\
                </div>\
                <div style="height: 12px;"></div>\
                <div class="card">\
                    <h4>📌 Detalhamento</h4>\
                    <div class="kv-grid">\
                        <div class="kv">\
                            <div class="k">Comportamento de pagamento</div>\
                            <div class="v">' + (comportamento ? escapeHtml(comportamento) : '---') + '</div>\
                            ' + (pagDesc ? '<div class="v"><small>' + escapeHtml(pagDesc) + '</small></div>' : '') + '\
                        </div>\
                        <div class="kv">\
                            <div class="k">Perfil financeiro</div>\
                            <div class="v">' + (perfil ? escapeHtml(perfil) : '---') + '</div>\
                            ' + (perfilDesc ? '<div class="v"><small>' + escapeHtml(perfilDesc) + '</small></div>' : '') + '\
                        </div>\
                    </div>\
                </div>\
                <div class="note">\
                    Dica: use o Score + Risco + Probabilidade como triagem rápida; leia o comportamento e perfil para refinar a decisão.\
                </div>\
            </div>\
        </div>\
    ';
}

document.getElementById('inputCpfConsulta').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') confirmarCpf();
    if (e.key === 'Escape') fecharModalCpf();
});
