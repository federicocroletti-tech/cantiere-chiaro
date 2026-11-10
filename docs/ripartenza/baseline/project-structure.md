# Struttura esistente

Evidenza statica locale del 2026-11-10. Questi sono fatti sull'esistente,
non cartelle di arrivo o istruzioni di riscrittura.

| Cartella | Tipo | File di progetto nello snapshot | Superficie |
|---|---|---:|---|
| `cantiere-chiaro` | Sito documentale statico | 34, incluso il primo README del dossier | Portale HTML, Markdown, policy, modelli e validatore Python |
| `CantiereFacile` | Frontend statico dedicato | 38, di cui 26 rapporti storici | HTML/CSS/JS, manuali come pagina ponte, test e configurazioni |
| `cantiere-chiaro-app` | Linea frontend precedente | 14 | Stessa UI e logica; conserva copie Markdown e collegamenti vecchi |

Ingressi osservati: portale documentale `/`, applicazione `/`, pagina `/manuali/`.
Il codice non presenta strati controller/service/repository, API o backend.
L'app concentra dati editoriali, stato, persistenza e rendering in `app.js`.
I Markdown sono consultati attraverso GitHub; non e presente un generatore
di sito documentale completo nell'albero corrente.

Domini esistenti: orientamento ai lavori, confronto offerte, accordi,
avanzamento, varianti/pagamenti, chiusura, diario e modelli organizzativi.
Le procedure giuridiche e amministrative richieste non sono gia implementate.
Il dossier di ripartenza e successivo alla baseline, non un modulo applicativo.

Il remoto del documentale e della linea precedente coincide; CantiereFacile
ha il remoto applicativo distinto. Il nome della cartella non determina il remoto.
I 26 rapporti in `_recovery-analysis/` sono evidenza storica, non contenuti
editoriali correnti. Nessuna dipendenza runtime da FamilyTree rilevata nei file
applicativi attuali; la storia precedente ne contiene il progetto.