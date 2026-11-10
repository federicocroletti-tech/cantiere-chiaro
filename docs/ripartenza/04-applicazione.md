# Fase 6 - Applicazione futura

Stato: definizione di prodotto proposta, non implementazione o consiglio professionale.

## Ruolo del prodotto

Accompagnare dall'incertezza a un fascicolo comprensibile e a domande migliori.
La knowledge base resta primaria. L'app organizza informazioni e mostra percorsi
verificati; non decide la fondatezza di contestazioni, l'esistenza di un vizio,
la convenienza di azioni o quale procedimento debba essere intrapreso.

## Funzioni e criteri di accettazione

| Funzione richiesta | Comportamento atteso | Criterio osservabile |
|---|---|---|
| Ricerca guidata | Domande per bisogno, tema, territorio e documenti disponibili | Risultati con fonte, stato, data; "non so" e nessun esito sempre gestiti |
| Wizard | Percorsi deterministici revisionati, con ritorno e salvataggio | Ogni esito rimanda a procedura/versione; prerequisiti mancanti fermano il percorso |
| Generazione documenti | Compilazione di facsimili approvati con anteprima | Campi e allegati controllabili, versione/fonti/disclaimer inclusi, nessun invio automatico |
| Checklist interattive | Passi con ID stabili e avanzamento locale | Salvataggio, ripresa, esportazione e aggiornamenti senza spunte attribuite a voci diverse |
| Raccolta prove | Catalogo di file originali con descrizioni e provenienza dichiarata | Originale immutato, copie derivate distinte, export comprensibile; nessuna garanzia probatoria |
| Organizzazione documenti | Fascicolo per intervento con categoria e collegamenti | Ricerca, etichette, export/import e cancellazione verificabili senza cloud obbligatorio |
| Cronologia eventi | Fatti e date dichiarate, documenti e correzioni correlate | Distinguere data evento, inserimento e modifica; ordinamento non crea una data certa |
| Assistenza guidata | Spiegazioni tratte da pagine verificate e indicazioni su chi consultare | Limiti e provenienza visibili, nessuna risposta inventata in assenza di contenuto |

La prima assistenza puo essere un percorso curato senza chatbot. L'eventuale IA
richiede una decisione separata: nessun invio di fascicoli a fornitori esterni
per impostazione predefinita, nessun addestramento implicito, nessuna citazione
inventata. In assenza di fonte adeguata deve dichiarare il limite e arrestarsi.

## Flusso principale

1. Selezionare un bisogno senza richiedere nome o indirizzo.
2. Consultare territorio, stato, prerequisiti e limiti della procedura proposta.
3. Creare facoltativamente un fascicolo locale con dati minimi.
4. Collegare documenti e fatti, esplicitando informazioni non accertate.
5. Completare checklist e domande da porre a impresa, professionista o ente.
6. Preparare una bozza organizzativa o esportare il fascicolo.
7. Riesaminare il contenuto e ottenere assistenza qualificata quando indicato.

Non includere invio PEC, deposito presso uffici, sospensione pagamenti, calcolo
automatico di prescrizioni/decadenze o scelta di rimedi nell'MVP.

## Modello dati proposto, distinto dall'esistente

| Entita futura | Campi e vincoli principali |
|---|---|
| Fascicolo | ID, titolo minimo, descrizione facoltativa, versione dello schema |
| Riferimento contenuto | ID, versione, release editoriale, stato e data ultimo controllo |
| Attivita | ID checklist/item, stato, note, versione di origine |
| Documento | ID, nome, tipo dichiarato, originale/derivato, provenienza, hash e collegamenti |
| Evento | ID, data dichiarata, data inserimento, descrizione, tipo fatto/ipotesi, documenti |
| Bozza | ID modello/versione, campi compilati, allegati, stato di revisione dell'utente |
| Esportazione | Versione schema, data export, manifesto file, hash e avvertenze |

Hash e timestamp locale aiutano a controllare integrita e ordine interno: non
provano autore, data certa, autenticita o valore legale. Le note editabili non
vanno presentate come registro probatorio immutabile.

## Dati privati e continuita

L'app attuale usa localStorage: non e un archivio sicuro o un backup.
Prima di conservare allegati valutare IndexedDB o archivio locale adatto, limiti
quota, dispositivi condivisi, rischio XSS, export cifrato se richiesto e recupero.
La scelta finale necessita threat model e prove, non solo una libreria di storage.

- Conservare la versione originale dei dati; import validato, anteprima e scelta
  di unione/duplicazione prima di qualunque sovrascrittura.
- Per il cambio di origine della app, l'origine nuova non puo leggere il vecchio
  localStorage: prevedere export dal sito precedente e import controllato.
- L'export diario attuale contiene `exportedAt`, `note`, `entries`, non il progresso.
  Il salvataggio del progresso richiede un percorso aggiuntivo prima del trasferimento.
- Se storage e pieno o non disponibile: errore visibile, nessuna falsa conferma.
- Nessuna sincronizzazione cloud, analisi di documenti o telemetria di contenuto
  senza valutazione di finalita, ruoli, retention, sicurezza e base giuridica.
- Non raccogliere o pubblicare dati reali tramite issue, PR o esempi dimostrativi.
- Prevedere esportazione completa e cancellazione locale con conferma; spiegare
  che cancellare dall'app non elimina backup gia scaricati.

## Backlog e rilasci

| Rilascio | Contenuto | Dipendenza bloccante |
|---|---|---|
| R0 - documentazione | Inventario, architettura, schema e migrazione | Approvazione del dossier |
| R1 - lettura affidabile | Ricerca pubblica, primi percorsi e fonti, stato visibile | Prime pagine revisionate e portale verificato |
| R2 - organizzazione | Checklist a ID stabili, diario, export/import senza perdita | Contratto contenuti e migrazione dati testati |
| R3 - fascicolo e bozze | Documenti locali, cronologia collegata e facsimili organizzativi | Privacy/sicurezza e modelli verificati |
| R4 - percorsi sensibili | Orientamento a mediazione, negoziazione e servizi giudiziari | Revisione qualificata e gestione aggiornamenti/ritiri |

Nessuna data di consegna o copertura professionale e promessa. Per ciascun rilascio
verificare tastiera, mobile, messaggi di errore, stampa/esportazioni e leggibilita.
Il maintainer puo pubblicare strumenti organizzativi prima dei percorsi giuridici,
senza dichiarare questi ultimi disponibili.