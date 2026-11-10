# Fase 4 - Progettazione della knowledge base

Stato: proposta editoriale; nessuna procedura nuova e dichiarata verificata.

## Missione e pubblico

Aiutare cittadini e committenti domestici a capire cosa cercare, cosa conservare,
quali domande porre e quando rivolgersi a persone qualificate. Ridurre
l'asimmetria informativa senza promettere tutela, vittorie o risparmi.
L'autorevolezza deriva da fonti, revisioni e correzioni trasparenti, non dalla
quantita di pagine o dall'etichetta "verificato".

## Navigazione per bisogno

Ingressi principali: "Devo iniziare dei lavori", "Mi manca un documento",
"Ho notato un problema", "Devo scrivere a un referente", "Devo capire a chi
rivolgermi". Affiancare navigazione per argomento, tipo di documento ed ente.
La ricerca non deve presumere che il cittadino conosca nomi di istituti giuridici.

Ogni risultato mostra titolo concreto, destinatario, territorio, stato e data
di verifica. I contenuti in bozza o scaduti sono separati dai risultati operativi.
Prevedere sinonimi curati: ad esempio "carta dell'impianto" puo rimandare a una
guida ai documenti, senza inferire quale documento sia dovuto nel caso concreto.

## Tipi di contenuto

| Tipo | Funzione | Relazioni richieste |
|---|---|---|
| Procedura | Percorso con prerequisiti, passi e punti di arresto | Fonti, checklist, eventuali modelli e alternative |
| Guida | Comprendere concetti e preparare domande | Procedure correlate e fonti |
| Checklist | Organizzare attivita, non certificare conformita | Procedura e item con ID stabili |
| Modello | Facsimile organizzativo non ufficiale | Procedura, campi, limiti e versione |
| FAQ | Risposta breve con limiti | Pagina canonica che la motiva |
| Fonte | Identificazione e verifica di un documento esterno | Affermazioni e pagine supportate |
| Indice tematico | Navigazione | Solo collegamenti e sintesi, nessuna duplicazione |

## Copertura tematica completa e prime uscite

La tabella e un backlog, non un elenco di procedure disponibili.
P1: utilita organizzativa iniziale; P2: verifica tecnica/territoriale;
P3: contenuti ad alto impatto subordinati a revisione qualificata.

| Ambito richiesto | Prima scheda da progettare | Priorita e controllo necessario |
|---|---|---|
| Lavori edili | Preparare il fascicolo iniziale e confrontare preventivi | P1, fonti e limiti |
| Ristrutturazioni | Percorso dalla definizione degli obiettivi alla chiusura | P1, recupero del manuale attuale |
| Manutenzioni | Registro interventi, documenti e referenti | P1, no istruzioni di intervento pericoloso |
| Rapporti con imprese | Riepilogare accordi, modifiche e risposte | P1, neutralita e nessuna attribuzione di colpa |
| Documentazione tecnica | Catalogare documenti e formulare domande | P2, tecnico abilitato |
| Verifiche documentali | Distinguere documento presente, incompleto e da far valutare | P2, non certificare validita |
| Impianti | Richiedere e organizzare la documentazione pertinente | P2, ambito e revisione tecnica |
| Richieste documentali | Preparare richiesta neutra e registro riscontri | P1 per organizzazione, P2 per obblighi e termini |
| PEC | Conservare messaggio, allegati e ricevute | P2, verifica fonti e limiti probatori |
| Richieste a professionisti | Raccogliere quesiti, incarichi e allegati | P1, privacy e limiti |
| Richieste a enti | Individuare ufficio, canale e servizio ufficiale | P2, verifica territoriale |
| Procedure amministrative | Comprendere differenze fra istanze e relativi presupposti | P2, ente competente |
| Pratiche comunali | Orientarsi nell'accesso alla documentazione edilizia | P2, disciplina e modulistica del Comune |
| Pratiche catastali | Capire quali informazioni richiedere e a chi | P2, fonti dell'ente e supporto tecnico |
| Contestazioni | Organizzare fatti, osservazioni e comunicazioni | P1 per fascicolo, P3 per atti e rimedi |
| Vizi e difetti | Registrare osservazioni senza diagnosticare cause | P2 tecnico, P3 se termini o responsabilita |
| Recupero crediti | Preparare documenti per una valutazione del professionista | P3, non scegliere automaticamente azioni |
| Mediazione civile | Capire soggetti, documenti e domande da porre | P3, verifica normativa e professionale |
| Negoziazione assistita | Orientamento e preparazione al colloquio legale | P3, revisione legale |
| Giudice di pace | Comprendere servizi, competenza e assistenza da verificare | P3, nessuna autodiagnosi di competenza o ammissibilita |

## Schema obbligatorio delle procedure

Usare il [modello completo](modello-procedura.md). Ogni procedura include:

1. Descrizione e obiettivo, con limiti.
2. Quando usarla e quando non usarla.
3. Prerequisiti e condizioni territoriali.
4. Documenti necessari, facoltativi e mancanti.
5. Passi e checklist con evidenze organizzative attese.
6. Errori comuni e modi prudenti per evitarli.
7. Tempi indicativi, fonti, variabilita e distinzione dai termini legali.
8. Costi indicativi, componenti, esclusioni, data e fonti.
9. Enti coinvolti e canali ufficiali da verificare.
10. Modelli utilizzabili, versione e limiti.
11. Riferimenti normativi puntuali e verificabili.
12. Casi in cui fermarsi e rivolgersi a professionisti.

Un campo ignoto non si riempie con una stima plausibile: indicare "non verificato"
e la verifica da svolgere. Se il campo e necessario a un'azione sicura, la pagina
non supera il gate operativo. "Non applicabile" richiede una motivazione.

## Metadati e versioni

Schema di arrivo proposto: `schema_version`, `id`, `version`, `type`, `title`,
`summary`, `status`, `territory`, `audience`, `topics`, `risk_level`, `authors`,
`reviewers`, `published_at`, `last_reviewed`, `review_due`, `sources`,
`related_ids`, `supersedes`, `license`, `maintainer_approval`.

Preservare gli ID esistenti `percorso-base-lavori-casa` e `moduli-pratici`.
Se si dividono i modelli, il vecchio ID resta un indice di compatibilita.
Un cambio di titolo non cambia ID. Ogni versione pubblicata e immutabile;
le correzioni hanno nuova versione e nota. Le pratiche utente mantengono
la versione consultata, senza aggiornamenti retroattivi invisibili.

Codici canonici: `bozza`, `in-revisione`, `da-verificare`, `verificato`,
`da-aggiornare`, `ritirato`. Rendere esplicita la corrispondenza con le etichette
gia presenti nelle policy, senza promuovere automaticamente gli stati legacy.
`verificato` richiede fonti, data, ambito della revisione e approvazione reale;
non significa consulenza, certificazione o validita per tutti i casi.

## Fonti: dalla bibliografia alla verifica

Ogni fonte registra ID, titolo, ente, URL ufficiale, tipo, territorio, versione
o data del testo, data di consultazione, punto/articolo/paragrafo, termini di
riuso, esito di reperibilita, revisore e prossimo riesame.
Ogni affermazione sensibile collega fonte e passaggio preciso: una fonte generica
in fondo alla pagina non basta per motivare costi, termini o obblighi.

Distinguere tre livelli nel testo:

- **Fatto documentato:** quale fonte sostiene quale affermazione, a quale data.
- **Ipotesi:** circostanza non accertata, mai presupposto implicito per un atto.
- **Interpretazione:** spiegazione attribuita e delimitata, con eventuale revisore.

Semi per il registro, non fonti gia verificate: Normattiva e Gazzetta Ufficiale;
Ministero della Giustizia e uffici giudiziari competenti; Agenzia delle Entrate
per servizi catastali; portali regionali, comunali e sportelli edilizi;
AgID per riferimenti sul digitale. Registrare documenti specifici, non solo home page.
ANCE e associazioni di consumatori presenti nell'app vanno etichettate come
fonti di contesto, non enti normativi o autorita pubbliche.

Nessuna nuova fonte normativa e stata controllata in questa ricognizione.
Link raggiungibile non equivale a norma vigente, interpretazione corretta o
applicabilita territoriale. In caso di conflitto: descrivere il dubbio e
sospendere il passaggio operativo, non scegliere arbitrariamente.

## Governo dei contributi e sicurezza editoriale

Riutilizzare le policy esistenti, con questa sequenza proposta:
contributo -> triage privacy/diritti -> verifica fonti -> revisione editoriale ->
revisione qualificata se richiesta -> approvazione del maintainer -> release.
Un commento, una issue, una PR o un risultato IA non e contenuto ufficiale.
Autori e revisori dichiarano fonti, competenze pertinenti, conflitti, licenze e uso IA.

Per P3 richiedere revisione professionale documentata prima di una pubblicazione
operativa. Senza revisore disponibile pubblicare al massimo il perimetro e le
domande da porre, non atti, scadenze o decisioni procedurali da applicare.
Nessun merge automatico di contenuti sostanziali: i test non sostituiscono il giudizio.

Il maintainer conserva la decisione finale e una motivazione pubblicabile.
Rifiuti o sospensioni: fonti mancanti, diritti ignoti, dati personali, accuse,
promesse di esito, consulenza personalizzata o rischio non gestito.
Le segnalazioni riservate non passano dalle issue pubbliche.

## Aggiornamenti e fiducia

Ogni pagina ha un responsabile di riesame e una data proporzionata al rischio.
Una modifica normativa segnalata attiva un controllo senza attendere la scadenza.
Un ritiro rende visibile il motivo generale, senza mantenere istruzioni dannose
nei risultati o nei pacchetti operativi. Conservare storia e fonti nei limiti
di privacy e copyright; non pubblicare fascicoli reali come esempi.

Il portale mostra chi cura cosa, stato, limiti, correzioni, modalita per segnalare
errori e licenze. Gratuitamente consultabile, con testo leggibile e stampabile,
linguaggio semplice, glossario e obiettivo WCAG 2.2 AA da verificare.
Indicatori iniziali: pagine con verifica documentata sul totale, fonti scadute,
correzioni aperte/chiuse e prove di accessibilita; non esiti legali presunti.