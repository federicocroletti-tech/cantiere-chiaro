# Modello dati esistente

Fonte: `app.js`, identico SHA-256 fra CantiereFacile e la linea precedente.
Non esistono tabelle o entita ORM rilevate.

| Oggetto | Campi | Persistenza e relazioni |
|---|---|---|
| Fase | `title`, `heading`, `intro`, `tasks`, `questions`, `note` | Array hardcoded di sei elementi |
| Attivita | `title`, `detail` | Tre attivita per fase; nessun ID stabile |
| Progresso | Chiavi indice fase, valori array indici attivita | JSON nella chiave `cantiere-chiaro-demo-v1` |
| Nota diario | `id`, `date`, `category`, `title`, `description` | Array JSON in `cantiere-chiaro-diario-v1` |
| Export diario | `exportedAt`, `note`, `entries` | File JSON scaricato; non comprende il progresso |

Categorie diario: `decisione`, `aggiornamento`, `problema`, `pagamento`, `incontro`.
La data evento e una stringa `YYYY-MM-DD`; la data di esportazione e una stringa
ISO generata dal browser. Il diario accetta al massimo 250 note dalla UI.
Gli ID derivano da tempo locale e casualita; non sono identificativi certificati.

Relazioni: attivita associate alle fasi per posizione; nessuna relazione
implementata fra diario, documento e checklist. Nessun allegato persistito.
Nessun import dei JSON rilevato. Nessuna transazione fra le due chiavi o
sincronizzazione multi-tab applicativa rilevata.
Questa descrizione non anticipa lo schema del fascicolo futuro.