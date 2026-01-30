# Estrutura padrão (Sankhya)

Esta pasta segue um padrão modular pensado para gerar um único HTML/JSP via Node no futuro.

Estrutura:
- `index.jsp`: entrada principal (HTML + JSP + includes).
- `css/app.css`: estilos do dashboard.
- `js/app.js`: lógica do dashboard (ES5).

Notas:
- Mantenha os IDs do HTML alinhados ao JS.
- Para Sankhya, o `index.jsp` já inclui `snk:load`.
- A geração de arquivo único pode concatenar `css/app.css` e `js/app.js` e injetar no `index.jsp`.
