<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <snk:load/>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Reposição - Decisão de Compras</title>
  <link rel="stylesheet" href="css/app.css">
</head>
<body>

  <div class="container">
    <div class="card">
      <!-- ==================== TOOLBAR ==================== -->
      <div class="toolbar">
        <div class="toolbar-title">
          <span>📦</span>
          <span>Reposição - Decisão de Compras</span>
        </div>
        <div class="toolbar-spacer"></div>
        <div class="toolbar-search">
          <input type="text" id="globalSearch" placeholder="Pesquisar em todas as colunas...">
        </div>
        <label class="cotacao-rapida-container" id="cotacaoRapidaContainer">
          <input type="checkbox" id="chkCotacaoRapida">
          <span class="cotacao-rapida-label">⭐ Filtrar para Cotação Rápida</span>
        </label>
        <div class="dropdown-cols">
          <button class="btn" id="btnToggleCols">⚙️ Colunas ▼</button>
          <div class="dropdown-menu" id="menuCols"></div>
        </div>
        <button class="btn" id="btnRefresh">🔄 Atualizar</button>
        <button class="btn" id="btnClear">✖ Limpar Filtros</button>
        <button class="btn" id="btnExport">📋 Exportar</button>
      </div>

      <!-- ==================== TABS ==================== -->
      <div class="tabs">
        <button class="tab-btn active" data-tab="table">Tabela</button>
        <button class="tab-btn" data-tab="kanban">Kanban</button>
      </div>

      <!-- ==================== ABA 1: TABELA ==================== -->
      <div class="tab-section tab-section-table active" id="tabTable">
        <!-- ==================== GRID ==================== -->
        <div class="grid-wrapper">
          <div class="grid-scroll" id="gridScroll">
            <div class="loading" id="loading">Carregando dados...</div>
          </div>
        </div>

        <!-- ==================== FOOTER ==================== -->
        <div class="footer">
          <div class="footer-info">
            <span id="selectionInfo">0 selecionado(s)</span>
            <span class="text-muted">|</span>
            <span id="totalInfo">0 registros</span>
          </div>
          <div class="footer-spacer"></div>
          <div class="pagination">
            <span>Exibir:</span>
            <select id="pageSize">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50" selected>50</option>
              <option value="100">100</option>
            </select>
            <button id="btnPrev">◀ Anterior</button>
            <span class="page-info" id="pageInfo">1 de 1</span>
            <button id="btnNext">Próximo ▶</button>
          </div>
        </div>
      </div>

      <!-- ==================== ABA 2: KANBAN (Decisão) ==================== -->
      <div class="tab-section tab-section-kanban" id="tabKanban">
        <div class="tab2-header">
          <div class="tab2-header-left">
            <h2>Decisão de Compras</h2>
            <p><span id="tab2Total">0</span> itens aguardando análise</p>
          </div>
          <div class="tab2-header-right">
            <input type="text" class="tab2-search-box" id="tab2Search" placeholder="Buscar produto ou marca...">
            <select class="tab2-filter" id="tab2DecisionFilter">
              <option value="ALL">Todas as decisões</option>
              <option value="PROCESSAR">Processar</option>
              <option value="ANALISAR">Analisar</option>
              <option value="IGNORAR">Ignorar</option>
              <option value="SEM">Sem decisão</option>
            </select>
            <button class="tab2-btn" id="tab2Refresh">Atualizar</button>
          </div>
        </div>

        <div class="tab2-summary-bar">
          <div class="tab2-summary-card urgente">
            <div class="tab2-summary-icon">🔴</div>
            <div class="tab2-summary-info">
              <div class="number" id="tab2CountProcessar">0</div>
              <div class="label">Processar</div>
            </div>
          </div>
          <div class="tab2-summary-card pendente">
            <div class="tab2-summary-icon">🟡</div>
            <div class="tab2-summary-info">
              <div class="number" id="tab2CountAnalisar">0</div>
              <div class="label">Analisar</div>
            </div>
          </div>
          <div class="tab2-summary-card ok">
            <div class="tab2-summary-icon">🟢</div>
            <div class="tab2-summary-info">
              <div class="number" id="tab2CountIgnorar">0</div>
              <div class="label">Ignorar</div>
            </div>
          </div>
          <div class="tab2-summary-card sem">
            <div class="tab2-summary-icon">⚪</div>
            <div class="tab2-summary-info">
              <div class="number" id="tab2CountSem">0</div>
              <div class="label">Sem decisão</div>
            </div>
          </div>
        </div>

        <div class="tab2-kanban">
          <div class="tab2-column urgente">
            <div class="tab2-column-header">
              <span class="tab2-column-title">⚠️ Processar</span>
              <span class="tab2-column-count" id="tab2ColCountProcessar">0</span>
            </div>
            <div class="tab2-cards-area" id="tab2ColProcessar"></div>
          </div>

          <div class="tab2-column pendente">
            <div class="tab2-column-header">
              <span class="tab2-column-title">📋 Analisar</span>
              <span class="tab2-column-count" id="tab2ColCountAnalisar">0</span>
            </div>
            <div class="tab2-cards-area" id="tab2ColAnalisar"></div>
          </div>

          <div class="tab2-column ok">
            <div class="tab2-column-header">
              <span class="tab2-column-title">✅ Ignorar</span>
              <span class="tab2-column-count" id="tab2ColCountIgnorar">0</span>
            </div>
            <div class="tab2-cards-area" id="tab2ColIgnorar"></div>
          </div>

          <div class="tab2-column sem">
            <div class="tab2-column-header">
              <span class="tab2-column-title">⚪ Sem decisão</span>
              <span class="tab2-column-count" id="tab2ColCountSem">0</span>
            </div>
            <div class="tab2-cards-area" id="tab2ColSem"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== POPUP DE FILTRO ==================== -->
  <div class="popup" id="popup"></div>

  <!-- ==================== TOOLTIP SIMILARES ==================== -->
  <div class="tooltip-similar" id="tooltipSimilar"></div>

  <!-- ===== TOAST ===== -->
  <div class="app-toast" id="appToast"></div>

  <!-- ==================== BIBLIOTECA SANKHYA JX ==================== -->
  <script src="https://cdn.jsdelivr.net/gh/wansleynery/SankhyaJX/jx.min.js"></script>
  <script src="js/app.js"></script>

</body>
</html>
