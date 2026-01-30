(function initApp() {
  if (!window.App) window.App = {};
  if (window.App.ui && typeof window.App.ui.initDom === 'function') {
    window.App.ui.initDom();
  }
  if (window.App.state && typeof window.App.state.resetFilters === 'function') {
    window.App.state.resetFilters();
  }
  if (window.App.events && typeof window.App.events.init === 'function') {
    window.App.events.init();
  }
  if (window.App.api && typeof window.App.api.carregarDados === 'function') {
    window.App.api.carregarDados();
  }
})();
