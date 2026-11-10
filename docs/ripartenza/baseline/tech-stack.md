# Stack esistente

Ricognizione statica, non audit di vulnerabilita o obsolescenza.

- Runtime frontend: HTML, CSS e JavaScript browser senza framework.
- Persistenza: Web Storage `localStorage`; export con Blob e object URL.
- Nessun TypeScript, Angular, ORM, server applicativo o database rilevato.
- Tooling dichiarato nelle due app: `@playwright/test` `^1.49.1`, `http-server` `^14.1.1`.
- Entrambi i lockfile fissano Playwright/test e Playwright a `1.64.1`,
  `http-server` a `14.1.1`. I lockfile completi restano negli snapshot verificati.
- Playwright bloccato richiede Node `>=20`; il README dedicato richiede Node 22
  e il workflow applicativo seleziona Node 22.
- Le dipendenze runtime transitive sono rappresentate dai lockfile; i manifesti
  completi includono anche i file effettivamente installati. La loro presenza
  non dimostra che l'installazione locale sia identica a un `npm ci` pulito.
- App: configurazione Playwright con server statico sulla porta 4173 di default,
  quattro casi di test. Non eseguiti durante questa consegna documentale.
- Il ramo locale `improvements/cantiere-facile` contiene tre ulteriori test del
  salvataggio, non integrati nell'HEAD osservato; non contarli come copertura corrente.
- Documentale: `tests/check_docs.py`, standard library Python; il workflow usa
  `python3`, il controllo locale ha usato il launcher Windows `py`.
- GitHub Actions con riferimenti major: checkout v4, setup-node v4,
  configure-pages v5, upload-pages-artifact v3, deploy-pages v4 nell'app.

Nessuna versione e dichiarata EOL o vulnerabile senza verifica specifica.
Non sono stati eseguiti installazioni, aggiornamenti, audit CVE o build.