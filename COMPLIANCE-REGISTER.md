# Registro preliminare dei requisiti e delle verifiche

**Data revisione:** 2026-10-30
**Avvertenza:** non è una dichiarazione di conformità né un parere legale. Ambito e requisiti effettivi richiedono valutazione specifica.

| Ambito / requisito da valutare | Stato | Evidenza o prossimo controllo |
|---|---|---|
| GDPR e disciplina italiana privacy | PARZIALMENTE VERIFICATO | Nessun backend rilevato; diary usa `localStorage`. Definire ruoli, finalità e misure prima di qualunque raccolta remota; verificare fonti ufficiali e caso d'uso |
| Dati personali nei repository pubblici | PARZIALMENTE VERIFICATO | Ricerca automatica euristica senza corrispondenze email/credenziali/telefoni; revisione manuale della cronologia e dei contenuti resta necessaria |
| Cookie, analytics e tracciamento | DA VERIFICARE | Non risultano backend o analytics nell'ispezione; controllare tutte le risorse e i servizi incorporati prima del rilascio |
| Conservazione di note e esportazioni locali | DA VERIFICARE | Informativa, cancellazione, dispositivi condivisi e rischio dei file JSON da documentare |
| Diritto d'autore e materiali esterni | DA VERIFICARE | Inventariare autori, provenienza, citazioni, termini d'uso e licenze |
| Licenza codice e documentazione | DA VERIFICARE | Alternative in `LICENSE-STRATEGY.md`; nessuna scelta approvata |
| Attribuzione di fonti e collegamenti | PARZIALMENTE VERIFICATO | Alcune fonti sono citate; manca registro con data/ambito/stato uniforme |
| Accessibilità digitale | PARZIALMENTE VERIFICATO | Semantica e alcune etichette ARIA presenti; nessuna verifica WCAG automatica/manuale |
| Sicurezza applicativa e segreti | PARZIALMENTE VERIFICATO | Pattern scan non ha trovato credenziali; nessuna verifica completa né scansione automatica dedicata |
| Dipendenze software | DA VERIFICARE | Manifest e lockfile presenti; `npm ls` mostra pacchetti estranei; audit CVE non eseguito |
| Fonti normative e validità temporale | DA VERIFICARE | Nessun frontmatter né registro di verifica completo |
| Gestione segnalazioni e contributi | DA VERIFICARE | Processo proposto, non implementato nei repository |
| Accessibilità dei contenuti esportati | DA VERIFICARE | L'app esporta JSON; formati accessibili futuri da valutare |
| Pubblicazione Pages e workflow | PARZIALMENTE VERIFICATO | Workflow esistente; protezione branch non rilevata; revisione permessi/action prima del nuovo deploy |
| Requisiti territoriali, editoriali e professionali | RICHIEDE VALUTAZIONE PROFESSIONALE | Definire in base a funzione, destinatari e contenuti effettivamente pubblicati |

## Gestione del registro

Per ogni controllo futuro registrare fonte ufficiale, data, ambito, risultato, rilievi, responsabile e data del riesame successivo. Stati consentiti: **VERIFICATO**, **PARZIALMENTE VERIFICATO**, **DA VERIFICARE**, **NON APPLICABILE**, **RICHIEDE VALUTAZIONE PROFESSIONALE**.

Non dichiarare conformità assoluta sulla base di questo registro. Ogni contenuto normativo, fiscale, amministrativo o tecnico richiede verifica aggiornata e, quando appropriato, revisione qualificata.
