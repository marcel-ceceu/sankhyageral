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
  </div>

  <!-- ==================== POPUP DE FILTRO ==================== -->
  <div class="popup" id="popup"></div>

  <!-- ==================== TOOLTIP SIMILARES ==================== -->
  <div class="tooltip-similar" id="tooltipSimilar"></div>

  <!-- ===== TOAST ===== -->
  <div class="app-toast" id="appToast"></div>

  <!-- ==================== BIBLIOTECA SANKHYA JX ==================== -->
  <script src="https://cdn.jsdelivr.net/gh/wansleynery/SankhyaJX/jx.min.js"></script>
  <script src="js/debug.js"></script>
  <script src="js/config.js"></script>
  <script src="js/state.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/api.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/events.js"></script>
  <script src="js/main.js"></script>

</body>
</html>
