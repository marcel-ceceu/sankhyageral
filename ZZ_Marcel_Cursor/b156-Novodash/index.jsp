<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <snk:load/>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Financeiro - Mock Sankhya</title>
  <link rel="stylesheet" href="css/app.css">
</head>
<body>

  <!-- ===== STATUS CARDS (KPIs) ===== -->
  <div class="status-cards">
    <div class="status-card total">
      <div class="status-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
        </svg>
      </div>
      <div class="status-card-content">
        <div class="status-card-label">Total Geral</div>
        <div class="status-card-value">R$ 146.072,92</div>
      </div>
    </div>
    <div class="status-card receitas">
      <div class="status-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      <div class="status-card-content">
        <div class="status-card-label">Receitas (760)</div>
        <div class="status-card-value">R$ 141.759,85</div>
      </div>
    </div>
    <div class="status-card despesas">
      <div class="status-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      <div class="status-card-content">
        <div class="status-card-label">Despesas (40)</div>
        <div class="status-card-value">R$ 4.313,07</div>
      </div>
    </div>
    <div class="status-card aberto">
      <div class="status-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div class="status-card-content">
        <div class="status-card-label">Em Aberto (270)</div>
        <div class="status-card-value">R$ 73.860,46</div>
      </div>
    </div>
    <div class="status-card vencido">
      <div class="status-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div class="status-card-content">
        <div class="status-card-label">Vencidos (236)</div>
        <div class="status-card-value">R$ 28.846,76</div>
      </div>
    </div>
    <div class="status-card pago">
      <div class="status-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <div class="status-card-content">
        <div class="status-card-label">Pagos (294)</div>
        <div class="status-card-value">R$ 43.365,70</div>
      </div>
    </div>
  </div>

  <!-- ===== TOOLBAR / FILTROS ===== -->
  <!-- REGRA: IDs dos inputs/selects precisam existir no JS -->
  <div class="toolbar">
    <div class="toolbar-title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
      <span>Dados do banco de dados</span>
    </div>
    <div class="toolbar-spacer"></div>
    <div class="search-input">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <!-- DICA: manter ID alinhado com o JS (ex.: searchInput) -->
      <input type="text" placeholder="Buscar parceiro, código, nota...">
    </div>
    <!-- DICA: manter ID alinhado com o JS (ex.: filterStatus) -->
    <select class="filter-select">
      <option value="">Todos</option>
      <option value="pendente">Pendente</option>
      <option value="vencido">Vencido</option>
      <option value="pago">Pago</option>
    </select>
    <!-- DICA: manter ID alinhado com o JS (ex.: filterVendedor) -->
    <select class="filter-select">
      <option value="">Todos</option>
      <option value="receita">Receita</option>
      <option value="despesa">Despesa</option>
    </select>
    <span class="selection-count" id="selectionCount">0 selecionado(s)</span>
    <button class="btn" id="clearSelection" disabled>Limpar seleção</button>
    <button class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Importar CSV
    </button>
    <button class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
      Exp
    </button>
    <button class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
      Colunas (14)
    </button>
  </div>

  <!-- ===== TABLE ===== -->
  <!-- REGRA: data-column deve casar com getColumnValue() -->
  <div class="table-container">
    <table class="table" id="dataTable">
      <thead>
        <tr>
          <th style="width: 40px;"><input type="checkbox" class="checkbox" id="selectAll"></th>
          <th style="width: 80px;" data-column="status">
            <div class="table-header-cell">Status
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 90px;" data-column="nufin">
            <div class="table-header-cell">Nº Financ.
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 80px;" data-column="nunota">
            <div class="table-header-cell">Nº Nota
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 80px;" data-column="codparc">
            <div class="table-header-cell">Cód. Parc.
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 220px;" data-column="parceiro">
            <div class="table-header-cell">Parceiro
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 150px;" data-column="tipo">
            <div class="table-header-cell">Tipo Título
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 100px;" data-column="vencimento">
            <div class="table-header-cell">Vencimento
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 100px;" data-column="negociacao">
            <div class="table-header-cell">Negociação
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 100px;" data-column="dhbaixa">
            <div class="table-header-cell">Data Baixa
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 100px;" data-column="valor">
            <div class="table-header-cell">Valor
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 80px;" data-column="recdesp">
            <div class="table-header-cell">Rec/D...
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 150px;" data-column="natureza">
            <div class="table-header-cell">Natureza
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 150px;" data-column="descricao">
            <div class="table-header-cell">Descrição
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
          <th style="width: 80px;" data-column="origem">
            <div class="table-header-cell">Origem
              <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div class="resize-handle"></div>
          </th>
        </tr>
      </thead>
      <tbody id="tableBody">
        <!-- Dados serão inseridos via JS no Bloco 2 -->
      </tbody>
    </table>
  </div>

  <!-- ===== COLUMN FILTER DROPDOWN ===== -->
  <div class="column-filter-dropdown" id="columnFilterDropdown">
    <div class="column-filter-actions">
      <button class="btn btn-small" type="button" data-sort="asc">A-Z</button>
      <button class="btn btn-small" type="button" data-sort="desc">Z-A</button>
    </div>
    <div class="column-filter-search">
      <input type="text" id="columnFilterSearch" placeholder="Buscar...">
    </div>
    <div class="column-filter-selectors">
      <button class="btn btn-small" type="button" data-select="all">Todos</button>
      <button class="btn btn-small" type="button" data-select="none">Nenhum</button>
    </div>
    <div class="column-filter-list" id="columnFilterList"></div>
  </div>

  <!-- ===== PAGINATION BAR ===== -->
  <div class="pagination-bar">
    <div class="record-info">
      <span>Mostrando <span class="highlight" id="recordStart">1</span> - <span class="highlight" id="recordEnd">800</span> de <span class="highlight" id="recordTotal">800</span></span>
    </div>
    <div class="pagination-controls">
      <button class="btn-icon" id="btnFirst" title="Primeira página (Alt+Home)" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="11 17 6 12 11 7"></polyline>
          <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
      </button>
      <button class="btn-icon" id="btnPrev" title="Página anterior (Alt+←)" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="page-indicator">
        <span>Página</span>
        <input type="number" class="page-input" id="pageInput" value="1" min="1" max="1">
        <span>de</span>
        <span class="current-page" id="totalPages">1</span>
      </div>
      <button class="btn-icon" id="btnNext" title="Próxima página (Alt+→)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <button class="btn-icon" id="btnLast" title="Última página (Alt+End)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="13 17 18 12 13 7"></polyline>
          <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      </button>
    </div>
    <div class="page-size-container">
      <select class="page-size-select" id="pageSize">
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="800" selected>800</option>
        <option value="1000">1000</option>
      </select>
      <span class="page-size-label">por página</span>
    </div>
  </div>

  <!-- DICA: quando for usar JX, inclua a lib antes deste script.
       Ex.: <script src="https://cdn.jsdelivr.net/gh/wansleynery/SankhyaJX/jx.min.js"></script> -->
  <script src="js/app.js"></script>

</body>
</html>
