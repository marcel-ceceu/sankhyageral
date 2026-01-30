window.App = window.App || {};

const state = {
  filtroCotacaoRapida: false,
  sort: { key: null, dir: null },
  globalSearch: '',
  quickFilters: {},
  menuFilters: {},
  selectedIds: new Set(),
  currentPage: 1,
  pageSize: 50,
  dragColumn: null,
  buildFilters: function buildFilters() {
    const cols = (App.config && App.config.COLS) ? App.config.COLS : [];
    state.quickFilters = {};
    state.menuFilters = {};
    cols.forEach(col => {
      state.quickFilters[col.key] = '';
      state.menuFilters[col.key] = {
        operator: 'contains',
        value: '',
        selected: new Set(),
        includeBlanks: true,
      };
    });
  },
  resetFilters: function resetFilters() {
    state.globalSearch = '';
    state.sort = { key: null, dir: null };
    state.currentPage = 1;
    state.filtroCotacaoRapida = false;
    state.selectedIds = new Set();
    state.buildFilters();
  }
};

App.state = state;
App.data = {
  DATA: [],
  DATA_FULL: [],
};
