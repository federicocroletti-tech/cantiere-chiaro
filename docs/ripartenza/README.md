# Ripartenza di Cantiere Chiaro

Data della ricognizione: 2026-11-10.

## Percorso di lettura

1. [Inventario e diagnosi](01-inventario.md): evidenze, recupero, duplicati e backup.
2. [Architettura e separazione](02-architettura.md): responsabilita, cartelle e contratti.
3. [Knowledge base](03-knowledge-base.md): tassonomia, fonti e processo editoriale.
4. [Applicazione futura](04-applicazione.md): funzionalita, dati e priorita di prodotto.
5. [Piano di migrazione](05-migrazione.md): passaggi, responsabilita e criteri di uscita.
6. [Modello di procedura](modello-procedura.md): struttura obbligatoria riutilizzabile.
7. [Baseline tecnica](baseline/architecture_index.md): contratti dell'esistente per chi implementera.
8. [Verifica della consegna](runtime-validation-report.md): test eseguiti e limiti prima della pubblicazione.

Gli inventari puntuali sono disponibili per il
[repository documentale](inventario-cantiere-chiaro.csv), per
[l'applicazione dedicata in CantiereFacile](inventario-CantiereFacile.csv) e per
[la copia applicativa precedente](inventario-cantiere-chiaro-app.csv).
Le proposte non sono decisioni gia approvate dal maintainer.

## Mandato

Consolidare una knowledge base italiana aperta e gratuita prima di evolvere
l'applicazione. Questo dossier contiene analisi e proposte, non autorizza
cancellazioni, trasferimenti di file o pubblicazioni di nuove procedure.

## Perimetro osservato

- Repository documentale locale: `C:/Federico/Progetti/cantiere-chiaro`.
- Repository applicativo dedicato: `C:/Federico/Progetti/CantiereFacile`.
- Linea applicativa precedente: `C:/Federico/Progetti/cantiere-chiaro-app`.
- Rapporti storici: `_recovery-analysis/` in CantiereFacile e archivio del 2026-10-30.
- Stato del codice: osservazione statica; nessuna funzionalita nuova implementata.
- Stato normativo: nessuna nuova verifica di vigenza effettuata in questa ricognizione.

## Ipotesi da verificare

Ipotesi iniziale: separazione solo intenzionale e possibile divergenza dei manuali.
Esito del controllo: separazione gia configurata in CantiereFacile; la cartella
omonima cantiere-chiaro-app e una linea precedente. Manuali e link legacy sono
conservati nella linea precedente, mentre i testi hardcoded dell'app dedicata
restano un rischio di duplicazione. Non creare un terzo repository per errore.

## Regole di conservazione

1. Inventariare file, versioni, stato Git e dipendenze.
2. Preservare anche file non tracciati, ignorati e modifiche locali.
3. Creare un backup esterno ai repository e verificarne l'integrita.
4. Assegnare una destinazione e una decisione motivata a ogni gruppo di contenuti.
5. Non eliminare duplicati prima del confronto semantico e del recupero delle differenze.
6. Non confondere backup dei repository con backup dei dati nel browser degli utenti.

## Limiti obbligatori

Cantiere Chiaro non sostituisce un avvocato, un commercialista, un tecnico
abilitato o enti pubblici. Non fornisce consulenza professionale personalizzata.
Fatti, ipotesi e interpretazioni devono essere distinguibili; ogni riferimento
normativo deve essere verificabile. Un contributo esterno non diventa contenuto
ufficiale senza revisione e approvazione del maintainer.