# Fase 1 - Inventario e diagnosi

Ricognizione locale del 2026-11-10. Evidenza statica, non audit legale,
di sicurezza o certificazione di accessibilita. Nessun fetch, push o deploy.

## Baseline e provenienza

| Cartella | Commit osservato | Branch | Origin effettivo |
|---|---|---|---|
| `cantiere-chiaro` | `bf63823520afa5fc6533e4670a71b691ca151517` | `sync/prompts-directory` | `https://github.com/federicocroletti-tech/cantiere-chiaro.git` |
| `cantiere-chiaro-app` | `e8b7651f2cb277d5582f5147bf00bf802ab9b1fb` | `sync/cantiere-chiaro-manuali` | Stesso URL del documentale |
| `CantiereFacile` | `69024be4a6bb20ceebef9b384047884278261f7f` | `sync/prompts-directory` | `https://github.com/federicocroletti-tech/cantiere-chiaro-app.git` |

Lo stato Git acquisito dopo il primo inserimento mostrava soltanto
`docs/ripartenza/` non tracciata nel documentale e worktree pulito nelle due app.
La dicitura locale "up to date" non dimostra lo stato corrente del server.
Il repository applicativo dedicato e configurato localmente in CantiereFacile;
disponibilita e impostazioni correnti di GitHub non sono state controllate online.

**Fatto:** tre cartelle, due URL remoti distinti. Le prime due condividono il remoto;
la terza realizza la separazione indicata nel piano storico.
**Interpretazione:** ripartire dal documentale e da CantiereFacile, confermandolo
con il maintainer; preservare cantiere-chiaro-app come linea precedente.

## Backup completo e inventari

Backup esterno verificato file per file con SHA-256:

`C:/Federico/Progetti/_backups/cantiere-chiaro-audit-20261110-214613/`

| Repository | File di progetto | Metadati Git | Dipendenze | Generati | Totale | Byte |
|---|---:|---:|---:|---:|---:|---:|
| Documentale | 34 | 134 | 0 | 0 | 168 | 251432 |
| Applicativo | 14 | 242 | 7191 | 1 | 7448 | 47119081 |
| Applicativo dedicato, CantiereFacile | 38 | 74 | 921 | 1 | 1034 | 22099810 |

Totale delle tre copie: 8650 file e 69470323 byte verificati. La riga
"Applicativo" indica la linea precedente, non il remoto applicativo dedicato.

I 34 file documentali comprendono 33 file iniziali e il primo README di questo
dossier. Gli inventari e il resto del dossier sono successivi allo snapshot.
Nel backup i manifesti `cantiere-chiaro-manifest.csv` e
`cantiere-chiaro-app-manifest.csv` e `CantiereFacile-manifest.csv` includono tutti
i file, anche nascosti e ignorati.
Ogni riga registra percorso, byte, data UTC, SHA-256, area ed esito del confronto.
Le viste pubblicabili dei file di progetto sono
[inventario documentale](inventario-cantiere-chiaro.csv) e
[inventario applicativo precedente](inventario-cantiere-chiaro-app.csv) e
[inventario applicativo dedicato](inventario-CantiereFacile.csv).

La copia comprende `.git`, dipendenze installate e risultati locali; non include
browser, servizi GitHub, issue, PR, protezioni, segreti remoti o configurazione Pages.
Il confronto hash non equivale a una prova di ripristino su una macchina diversa.
Gli archivi precedenti non sono stati modificati. Quello del 2026-10-30 e stato
catalogato e verificato nei limiti descritti sotto; quello legacy del 2026-10-27
e stato soltanto individuato. Non presumere copertura completa di ogni vecchia versione.

## Recupero storico e decisioni gia documentate

L'archivio `C:/Federico/Progetti/_backups/cantiere-chiaro-2026-10-30/` contiene
mirror Git, ZIP, working tree di staging, metadati e 26 rapporti di analisi.
Il confronto odierno conferma 26/26 hash dei rapporti rispetto al loro manifesto
storico e SHA-256 dello ZIP
`1032D8C5D5875E3CF80C705CCCDBF506CE2666733995D6EBEB95A85EE4D952A7`.
Il riepilogo storico dichiara una prova di ripristino riuscita, che non e stata
rieseguita oggi. I 26 rapporti sono identici anche alle copie in
`CantiereFacile/_recovery-analysis/`, ora incluse nel nuovo backup integrale.

| Rapporti storici | Informazioni da preservare | Uso attuale |
|---|---|---|
| `MIGRATION-AUDIT.md`, `FILE-INVENTORY.md`, `GIT-STATUS-REPORT.md` | Stato iniziale, modifiche locali e separazione FamilyTree | Evidenza storica, non stato Git corrente |
| `CONTENT-CLASSIFICATION.md`, `CONTENT-MAP.md`, `DUPLICATES-REPORT.md` | Provenienza manuali e sovrapposizioni | Confermate dal confronto odierno, da mantenere |
| `MIGRATION-PLAN.md`, `APP-MIGRATION-PLAN.md`, `REPOSITORY-ARCHITECTURE.md`, `DOCUMENTATION-ROADMAP.md` | Scelte di separazione, destinazioni e roadmap | Il piano approvato indica gia CantiereFacile come cartella app |
| `BACKUP-AND-ROLLBACK-PLAN.md`, `PROPOSED-COMMANDS.md` | Conservazione e operazioni allora proposte | Non eseguire comandi storici come autorizzazioni attuali |
| `LICENSE-STRATEGY.md` | CC BY 4.0 per originali; nessuna licenza generale al codice | Decisione preesistente coerente con policy correnti |
| `SECURITY-AUDIT.md`, `DATA-PRIVACY-AUDIT.md`, `DEPENDENCY-AUDIT.md`, `COMPLIANCE-REGISTER.md`, `ACCESSIBILITY-PLAN.md` | Limiti e verifiche precedenti | Riesame necessario; non audit aggiornati |
| `GOVERNANCE.md`, `MAINTAINERS.md`, `COMMUNITY-GUIDELINES.md`, `EDITORIAL-POLICY.md`, `LEGAL-CONTENT-GOVERNANCE.md`, `REVIEW-PROCESS.md`, `SOURCE-POLICY.md`, `SOCIAL-IMPACT.md` | Metodo e missione | Preferire policy correnti documentali, senza duplicarle |

Il piano storico registra approvazioni precedenti: conservarle come decisioni
documentate, non come autorizzazione automatica a pubblicare o modificare oggi.
La cronologia locale mostra anche la precedente presenza di FamilyTree Studio:
non importare automaticamente quei file nel corpus edilizio.
`git fsck --full --no-reflogs` non segnala oggetti mancanti o corrotti nelle tre
copie; le prime due conservano oggetti dangling, lasciati intatti nel backup.

### Lavoro nei rami locali

In CantiereFacile il ramo `improvements/cantiere-facile`, commit
`d53cfb446645013ff09fee2d8af7e7942798d5fa`, contiene lavoro non integrato nell'HEAD
osservato: validazione e deduplicazione dei progressi, errore di scrittura visibile,
ripristino dello stato precedente, conferma del reset e tre test aggiuntivi.
Le differenze toccano `app.js`, `index.html`, `styles.css` e `tests/audit.spec.js`.
E un candidato al recupero prima di riscrivere il salvataggio, non una modifica
gia attiva o verificata a runtime in questa ricognizione. Il ramo e preservato
nella copia integrale di `.git`; nessun merge o cherry-pick eseguito.

Nel documentale e presente anche `docs/automated-quality-checks`, commit
`c0d7967a54acd59bb44639bc89bc3050f24142ba`: l'HEAD contiene gia workflow e
validatore della stessa famiglia. Una differenza di commit non dimostra
automaticamente contenuti mancanti; confrontare i file prima di recuperare.

## Catalogo documentale: decisione per ogni gruppo

Tutti i file iniziali sono coperti dalle righe seguenti. "Accorpare" significa
proposta futura con mantenimento di provenienza, non eliminazione autorizzata.

| File o gruppo | Diagnosi | Decisione proposta |
|---|---|---|
| `README.md`, `docs/index.md` | Ingressi utili, separazione dichiarata ma non conclusa | Conservare; collegare dossier e futura navigazione |
| `index.html`, `.nojekyll` | Portale statico, rimanda ai Markdown su GitHub | Conservare fino a portale documentale verificato |
| `docs/orientamento/percorso-base.md` | Percorso recuperato; fonti vuote, stato da verificare | Canonico; ricondurre al nuovo schema senza dichiararlo verificato |
| `templates/moduli.md`, `templates/README.md` | Quattro strumenti organizzativi recuperabili | Conservare; futura separazione in modelli identificabili |
| `DISCLAIMER.md`, `docs/disclaimer.md`, `docs/limiti-del-progetto.md` | Sovrapposizione intenzionale fra policy e spiegazioni al lettore | Un testo autorevole con sintesi contestuali collegate, non copie indipendenti |
| `docs/quando-rivolgersi-a-un-professionista.md` | Utile presidio di prudenza | Conservare e collegare in ogni procedura sensibile |
| `SOURCE-POLICY.md`, `docs/fonti-e-metodo.md` | Regola editoriale e spiegazione pubblica complementari | Conservare distinguendo destinatari; introdurre registro fonti |
| `docs/stato-verifica-contenuti.md` | Stati gia descritti | Conservare come riferimento e uniformare i codici macchina |
| `GOVERNANCE.md`, `MAINTAINERS.md` | Ruoli e responsabilita utili; incarichi non assegnati | Conservare; confermare persone e poteri senza inventare approvazioni |
| `EDITORIAL-POLICY.md`, `LEGAL-CONTENT-GOVERNANCE.md`, `REVIEW-PROCESS.md` | Presidi editoriali presenti, in parte proposti | Conservare; esplicitare gerarchia e requisiti bloccanti |
| `CONTRIBUTING.md`, `.github/pull_request_template.md` | Fonti, privacy, diritti e approvazione gia richiesti | Conservare; allineare a metadati e revisione effettiva |
| `CODE_OF_CONDUCT.md`, `COMMUNITY-GUIDELINES.md` | Regole in parte duplicate; community ancora proposta | Codice come regola, linee guida come istruzioni pratiche |
| `SECURITY.md` | Canale privato condizionato alle funzioni GitHub disponibili | Conservare; verificare canale realmente attivo |
| `SOCIAL-IMPACT.md` | Missione e indicatori prudenti | Conservare; misurare soltanto risultati dimostrabili |
| `ACCESSIBILITY-PLAN.md` | Obiettivo utile; affermazione "nessun frontmatter" superata dai file attuali | Aggiornare in PR dedicata; nessuna conformita dichiarata |
| `COMPLIANCE-REGISTER.md` | Fotografia precedente con riferimenti non piu allineati | Preservare come storico, produrre riesame datato |
| `LICENSE` | Testi e modelli originali CC BY 4.0, esclusioni esplicite | Conservare; verificare diritti dei materiali recuperati |
| `CHANGELOG.md` | Prima traccia di migrazione | Conservare e registrare release future |
| `tests/check_docs.py`, `.github/workflows/validate-docs.yml` | Validazione locale link e alcune condizioni HTML | Recuperare; estendere solo dopo approvazione dello schema |
| `.gitignore` | Esclusioni di artefatti applicativi non dannose | Conservare; non e una barriera contro pubblicazione di dati personali |
| `prompts/.gitkeep` | Segnaposto senza contenuti | Preservare; nessun valore funzionale dimostrato |

## Catalogo della linea applicativa precedente

| File o gruppo | Diagnosi | Decisione proposta |
|---|---|---|
| `app.js` | Sei fasi, 18 attivita, progresso, diario, JSON e dialogo; testi incorporati | Recuperare comportamento e dati; estrarre contenuti solo in fase successiva |
| `index.html`, `styles.css` | Interfaccia statica funzionante da verificare a runtime | Recuperare come baseline; non decidere una riscrittura per ragioni estetiche |
| `manuali/percorso-base.md` | Stesso corpo del percorso documentale, senza frontmatter | Duplicato editoriale; mantenere fino a sostituzione con collegamento o derivato |
| `manuali/moduli.md` | Stessi modelli; differenze di frontmatter e interruzioni HTML | Confrontare prima di archiviare; nessun contenuto esclusivo emerso dal confronto per righe |
| `manuali/README.md` | Presuppone aggiornamento manuale coordinato dei due mondi | Superato dalla proposta di fonte canonica unica |
| `manuali/index.html` | URL GitHub verso vecchi percorsi `main/manuali/` del documentale | Correggere insieme ai test, dopo verifica destinazioni e remoto |
| `README.md` | Manuali presentati come originali; riferimento estraneo a FamilyTree Studio | Aggiornare nella migrazione; riferimento estraneo da rimuovere solo in PR approvata |
| `package.json`, `package-lock.json` | Strumenti di sviluppo, nessun framework runtime | Conservare; audit dipendenze non svolto |
| `playwright.config.js`, `tests/audit.spec.js` | Quattro test di UI, percorso, diario ed export | Recuperare; i test controllano anche URL legacy senza verificarne HTTP |
| `.github/workflows/deploy-pages.yml` | Pubblicazione su main con test prima del deploy | Recuperare separando effettivamente i siti e le configurazioni remote |
| `.gitignore` | Esclude risultati e dipendenze | Conservare |

## Catalogo dell'applicazione dedicata in CantiereFacile

I 38 file di progetto sono 12 file applicativi/configurazioni e 26 rapporti
storici elencati sopra. Nessun originale documentale e stato trovato in `manuali/`.

| File o gruppo | Confronto con linea precedente | Decisione proposta |
|---|---|---|
| `app.js`, `index.html`, `styles.css` | Identici SHA-256 | Baseline applicativa dedicata; contenuti hardcoded ancora da consolidare |
| `playwright.config.js`, `.github/workflows/deploy-pages.yml` | Identici SHA-256 | Recuperare dal repository dedicato |
| `tests/audit.spec.js`, `manuali/index.html` | Differenti; URL documentali gia corretti | Non reintrodurre il difetto legacy |
| `README.md` | Differente; descrive correttamente separazione, dati e diritti | Conservare come riferimento corrente |
| `package.json`, `package-lock.json` | Differenti; nome applicativo dedicato | Conservare il lockfile di questa linea, non quello precedente |
| `.gitignore`, `prompts/.gitkeep` | Configurazione e segnaposto | Conservare; non introdurre contenuti estranei |
| `_recovery-analysis/*.md` | 26/26 copie identiche all'archivio del 30 ottobre | Preservare come storico, non come policy corrente o contenuti approvati |

## Lacune e componenti non dimostrate

- Non rilevati backend, database, autenticazione, API o gestione allegati.
- Ricerca guidata, wizard ramificati e generazione documenti non risultano implementati.
- Diario: massimo 250 note, cinque categorie, esportazione JSON; nessuna importazione rilevata.
- Persistenza: `cantiere-chiaro-demo-v1` e `cantiere-chiaro-diario-v1`, per origine browser.
- Nessuna evidenza di registro fonti completo o revisione professionale dei manuali.
- Il validatore non verifica link HTTP, frontmatter, norme o qualita delle fonti.
- `LICENSE-STRATEGY.md`, assente dal documentale corrente, e stato recuperato
  nell'archivio storico e in CantiereFacile: non e un documento perduto.
- L'assenza di licenza applicativa non rende il codice open source: la governance
  attuale lo indica a diritti riservati. Non cambiarlo implicitamente.

## Obsolescenza: conclusione prudente

Sono superati alcuni percorsi, descrizioni di processo e annotazioni documentali.
Non e dimostrato che HTML/JavaScript o le librerie siano obsoleti o vulnerabili.
Versioni, EOL, vulnerabilita e stato effettivo online richiedono controlli separati.
Nessun file e classificato come eliminabile in questa ricognizione.