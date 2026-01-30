(function () {
  var maxAttempts = 200;
  var attempt = 0;

  function initPivot() {
    if (!window.WebDataRocks || !window.PIVOT_CONFIG) {
      return false;
    }

    if (window.__pivotInstance) {
      return true;
    }

    window.__pivotInstance = new WebDataRocks(window.PIVOT_CONFIG);
    return true;
  }

  function waitForDeps() {
    if (initPivot()) {
      return;
    }

    attempt += 1;
    if (attempt > maxAttempts) {
      console.warn("WebDataRocks nao carregou ou config nao definida.");
      return;
    }

    setTimeout(waitForDeps, 50);
  }

  waitForDeps();
})();
