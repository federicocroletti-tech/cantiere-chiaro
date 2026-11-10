# Piano di migrazione conservativa

Data: 2026-11-10. Nessun trasferimento, cambio remoto, commit o deploy eseguito.
Le attivita future richiedono l'approvazione del maintainer nei punti indicati.
Questo e lo stato della ricognizione iniziale. Per la verifica successiva alla
richiesta di commit e push consultare il [rapporto di validazione](runtime-validation-report.md).

## Sequenza e criteri di uscita

| Passo | Attivita | Responsabile proposto | Evidenza necessaria per uscire |
|---|---|---|---|
| M0 - ricognizione locale | Inventario, hash, copia integrale e diagnosi | Curatore tecnico | Manifesti senza mismatch; dossier con limiti; svolto in questa ricognizione |
| M1 - completamento storico | Completare il riesame di rami e backup; acquisire issue/PR, Pages e impostazioni remote | Maintainer | Riferimenti e 26 rapporti gia censiti; completare inventario degli oggetti remoti e versioni legacy |
| M2 - approvazione | Confermare perimetro, ruoli, licenze e architettura | Maintainer e revisori disponibili | Decisione registrata; nessuna qualifica professionale presunta |
| M3 - consolidamento Git | Confermare CantiereFacile come copia del remoto app e preservare la linea precedente | Maintainer | Separazione locale gia riscontrata; verificare remoti online, provenienza e assenza di dati estranei |
| M4 - recupero editoriale | Ricondurre percorso e quattro modelli a schema/ID; confrontare duplicati | Curatore editoriale | Mappa origine/destinazione, differenze conservate e nessuna promozione automatica a verificato |
| M5 - verifica corpus iniziale | Registro fonti, revisione editoriale e professionale ove richiesta | Revisori, approvazione maintainer | Tutti i campi obbligatori compilati o motivati; fonti puntuali; approvazione documentata |
| M6 - pubblicazione documentale | Portale, ricerca, permalink, redirect e release contenuti | Curatore tecnico/editoriale | Nessun collegamento perso, stati visibili, accessibilita verificata sui percorsi essenziali |
| M7 - integrazione app | Pacchetto versionato, collegamenti nuovi, storage/export/import | Curatore applicativo | Checklist e diario preservati, compatibilita legacy e dati su cambio origine verificati |
| M8 - evoluzione | Fascicolo, prove, wizard e generazione graduati per rischio | Product owner e maintainer | Criteri del rilascio soddisfatti, privacy/sicurezza e revisioni proporzionate |
| M9 - eventuale archiviazione | Dismettere copie concorrenti solo dopo prova di equivalenza | Maintainer | Inventario finale, backup recente, ripristino provato e autorizzazione esplicita |

M0 copre l'albero locale corrente, non certifica che tutte le versioni storiche
siano gia state riesaminate. M1 precede qualsiasi modifica strutturale o rimozione.
Non e necessario completare l'app per pubblicare la prima knowledge base utile.

## Informazioni da salvare prima di qualunque modifica distruttiva

- Tutti i file tracciati, non tracciati e ignorati, con metadati e hash.
- Cronologia, rami, tag, remoti e configurazioni locali; verificare che una copia
  Git o un bundle includa le revisioni necessarie e non solo il branch corrente.
- Issue, PR, discussioni e decisioni editoriali, con controllo privacy prima di
  importarle in un archivio pubblico.
- Impostazioni Pages, domini, URL, protezioni, workflow e nomi dei segreti;
  conservare i valori segreti soltanto in un sistema idoneo, mai nel dossier.
- Fonte, autore, licenza, data e modifiche di ogni contenuto recuperato.
- Dati locali dell'utente tramite export esplicito: il backup del repository
  non raggiunge browser e dispositivi personali.

## Registro di tracciabilita della migrazione

Per ogni trasferimento registrare: repository e commit di origine, percorso,
hash, ID contenuto, differenze conservate, destinazione, licenza, decisione,
approvatore, backup, controllo e possibilita di ripristino.
Gli inventari CSV sono la baseline fisica, non sostituiscono questo registro
semantico durante la migrazione. Non registrare informazioni personali dei casi.

## Primo lotto consigliato

1. Confermare documentale e CantiereFacile come copie operative, i diritti dei
  contenuti e la conservazione della cartella applicativa precedente.
2. Recuperare percorso base e quattro modelli senza riscriverne arbitrariamente il senso.
  Valutare separatamente il ramo `improvements/cantiere-facile` gia preservato:
  contiene il miglioramento del salvataggio e tre test, non ancora nell'HEAD osservato.
3. Redigere una procedura pilota organizzativa, con tutti i campi del modello:
   "Preparare una richiesta di chiarimenti/documenti all'impresa".
4. Verificare fonti, limiti, tempi/costi eventualmente pertinenti e revisione.
5. Usare il pilota per provare tassonomia, ricerca e contratto contenuti.
6. Solo dopo estendere a pratiche tecniche e, con revisori, ai percorsi P3.

Il pilota non e stato redatto come istruzione operativa in questo dossier,
perche non sono state effettuate le relative verifiche di fonte.

## Criteri minimi prima della pubblicazione

- Tutti i file recuperati hanno una destinazione o una decisione di conservazione.
- Nessun contenuto sostanziale ha due originali aggiornabili indipendentemente.
- La pagina mostra stato, territorio, verifica, fonti e limiti; le bozze non
  alimentano wizard o generazione di atti.
- Tempi, costi, obblighi e termini hanno fonte e data; i dubbi non sono nascosti.
- I sette presidi obbligatori sono presenti nei punti pertinenti: non sostituzione
  di avvocato, commercialista, tecnico abilitato o enti; nessuna consulenza
  personalizzata; distinzione fra fatti/ipotesi/interpretazioni e fonti verificabili.
- Contributi documentati, fonti e diritti controllati, approvazione del maintainer;
  protezioni e permessi remoti verificati, non solo descritti nelle policy.
- Link interni e destinazioni pubbliche verificati; vecchi URL mappati a nuovi.
- Prove di navigazione, accessibilita e leggibilita registrate senza proclamare
  conformita sulla sola base di test automatici.
- Licenze documentali e applicative non confuse.

## Criteri aggiuntivi prima dell'integrazione applicativa

- Test browser attuali conservati e aggiornati per le destinazioni corrette.
- Stato vuoto, dati legacy, JSON invalido, versione ignota, quota esaurita,
  fonte ritirata e modalita offline hanno esiti espliciti.
- Export/import di diario, progresso e futuri allegati provati con dati sintetici;
  riconciliazione dei vecchi indici alle nuove voci, nessuna sovrascrittura silenziosa.
- Cambio dominio o percorso trattato come migrazione di origine, non come
  semplice spostamento di file.
- Nessun allegato o nota privata finisce in log, repository, analytics o build.

## Ripristino e arresto

Prima di ciascun passaggio strutturale creare una nuova copia verificata e
annotare versione pubblica e dati coinvolti. Provare il ripristino in una cartella
separata: hash, commit raggiungibili, apertura documenti e lettura dei dati sintetici.
Non provare il rollback sovrascrivendo le cartelle originali.

In caso di errore editoriale: sospendere pacchetti e istruzioni interessati,
pubblicare una nota prudente, mantenere provenienza senza esporre dati personali.
In caso di perdita o incompatibilita dati: fermare la migrazione, conservare
originale e export, tornare alla versione compatibile senza cancellare nuove note.
Il rollback del sito non rende automaticamente sicuro riattivare una procedura ritirata.

## Stato della verifica di questa consegna

Backup e confronto SHA-256 eseguiti. Controllo documentale locale eseguito con
`py tests/check_docs.py`; il comando `python` non e disponibile nell'ambiente.
Validati anche 15 YAML della baseline, completezza delle tre unita, unicita ed
esistenza degli anchor e coerenza dei contratti globali. Verificati 26/26 hash
dei rapporti storici e hash ZIP; integrita Git locale controllata nelle tre copie.
Alla prima consegna nessuna esecuzione dei test browser, prova di ripristino completa, verifica
normativa, audit CVE, audit privacy o verifica dei remoti online effettuata.
I test browser sono stati eseguiti successivamente come descritto nel rapporto;
gli altri limiti restano attivita esplicite, non condizioni tacitamente soddisfatte.