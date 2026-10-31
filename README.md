# Cantiere Chiaro

Guida pratica per seguire i lavori di casa. Il repository distingue l'app web dai manuali e moduli consultabili anche indipendentemente dall'app.

- **App web:** `index.html`, `styles.css`, `app.js`.
- **Contenitore di manuali:** [`manuali/`](./manuali/), con procedure e moduli di supporto.

La pagina [`manuali/`](./manuali/) è pubblicata insieme all'app su GitHub Pages; i testi Markdown originali e modificabili restano nella cartella `manuali/` del repository.

FamilyTree Studio è un progetto indipendente, mantenuto nel suo [repository dedicato](https://github.com/federicocroletti-tech/familytree-studio).

## Test

```sh
npm ci
npm run test:playwright
```