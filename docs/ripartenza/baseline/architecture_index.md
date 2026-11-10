# Indice tecnico della baseline

This index is not the full contract. Do not implement from this file alone; follow the artifact paths below.

Evidenza statica del 2026-11-10. I percorsi di sorgente negli YAML sono relativi
a `C:/Federico/Progetti`. La cartella applicativa dedicata e CantiereFacile;
`app.js`, `styles.css` e `index.html` sono identici nella linea precedente
cantiere-chiaro-app. Gli anchor su quella linea documentano quindi lo stesso
comportamento; README, test, lockfile e pagina manuali non sono intercambiabili.
Il nome `manuali-legacy` identifica la continuita del percorso pubblico storico.

## Implementation Guide

Tutti leggono [unit_graph.yaml](unit_graph.yaml) per ingressi e dipendenze e
[migration_boundary.yaml](migration_boundary.yaml) per il perimetro autorizzato:
`must_rewrite` e vuoto. Un anchor non autorizza una modifica.

| Contratto globale | Uso e filtro |
|---|---|
| [wire_contracts.yaml](wire_contracts.yaml) | Formati e compatibilita; righe `unit` uguale all'unita assegnata o `global` |
| [shared_modules.yaml](shared_modules.yaml) | Moduli condivisi, filtro `used_by_units`; nessuno rilevato |
| [cross_unit_state.yaml](cross_unit_state.yaml) | Flussi con `writer.unit` o `reader.unit` uguale all'unita; nessuno rilevato |
| [seams.yaml](seams.yaml) | Confini dichiarati e parti congelate; filtro `cut_between` |
| [project-structure.md](project-structure.md) | Organizzazione e domini esistenti |
| [tech-stack.md](tech-stack.md) | Linguaggi, tooling e versioni osservate |
| [data-model.md](data-model.md) | Dati attuali, non entita future |

### Portale Documentale

Unita `portale-documentale`, trigger pagina `/` documentale.
Leggere [behavior.yaml](units/portale-documentale/behavior.yaml) per effetti,
[bindings.yaml](units/portale-documentale/bindings.yaml) per collegamenti e
[unit_decomposition.yaml](units/portale-documentale/unit_decomposition.yaml)
per candidati non vincolanti. Applicare i filtri globali sopra usando il nome
dell'unita, incluso il confine con spazio-lavori.
Evidenze future richieste: ingressi e alias raggiungibili, stato/fonti visibili,
controlli documentali e limiti della verifica dei link esterni.

### Spazio Lavori

Unita `spazio-lavori`, trigger pagina `/` applicativa ed eventi DOM.
Leggere [behavior.yaml](units/spazio-lavori/behavior.yaml) per salvataggi e rami,
[bindings.yaml](units/spazio-lavori/bindings.yaml) per eventi/chiavi e
[unit_decomposition.yaml](units/spazio-lavori/unit_decomposition.yaml) per le
possibili estrazioni, non decisioni di riscrittura. Nei contratti globali filtrare
`unit: spazio-lavori`, flussi o moduli pertinenti e confine con documentale.
Evidenze future richieste: leggibilita dati v1, export/import, stati di errore,
continuita checklist, gestione focus e comportamento offline/ritiro contenuti.

### Manuali Ponte

Unita `manuali-legacy`, trigger pagina `/manuali/`.
Leggere [behavior.yaml](units/manuali-legacy/behavior.yaml) per distinguere link
correnti e vecchi, [bindings.yaml](units/manuali-legacy/bindings.yaml) per percorso
pubblico e [unit_decomposition.yaml](units/manuali-legacy/unit_decomposition.yaml)
per l'assenza di ulteriori divisioni necessarie. Filtrare i contratti globali per
`manuali-legacy`; leggere il confine editoriale per non ripristinare copie concorrenti.
Evidenze future richieste: contenuti canonici raggiungibili e nessuna regressione
verso vecchi URL `main/manuali`.

Per ciascuna unita riportare, prima di dichiarare conclusa una futura modifica:
artefatti letti, elementi `must_preserve` implementati, contratti rinviati o
irrisolti, test/build/runtime effettuati e relativi limiti. Questa consegna non
ha modificato l'applicazione e non dichiara superate tali prove future.