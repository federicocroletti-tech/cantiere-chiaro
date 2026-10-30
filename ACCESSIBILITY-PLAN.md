# Piano di accessibilità

**Obiettivo:** perseguire WCAG 2.2 livello AA come criterio di progettazione, da verificare nei contesti e requisiti effettivamente applicabili. Non si dichiara che l'applicazione attuale sia conforme o pienamente accessibile.

## Requisiti di prodotto

- Italiano semplice, glossario, titoli descrittivi e struttura semantica.
- Navigazione completa da tastiera, focus visibile e ordine coerente.
- Contrasto adeguato, zoom e reflow su smartphone.
- Etichette, istruzioni e messaggi di errore comprensibili per ogni form.
- Stato e progresso comunicati senza affidarsi solo al colore.
- Link con etichette descrittive; alternative testuali per immagini informative.
- Dialog, tab, checklist e contenuti dinamici testabili con tecnologie assistive.
- Esportazioni e documenti con struttura leggibile e ordine logico.

## Verifica

**Automatica:** lint/accessibility scan in CI sulle pagine renderizzate; controllo link e HTML quando disponibili.

Il controllo automatico iniziale verifica i link Markdown relativi e alcuni requisiti strutturali della landing page. Non esegue un audit WCAG, non verifica i link esterni e non sostituisce le prove manuali. I file Markdown attuali non usano frontmatter YAML; non esiste quindi uno schema di frontmatter da validare.

**Manuale:** tastiera, zoom/reflow, contrasto, screen reader almeno su browser/piattaforme selezionati, form ed errori, flussi critici da mobile.
**Utenti:** raccogliere feedback accessibile e non identificativo quando il progetto è disponibile.

I test automatici non dimostrano accessibilità completa. Registrare ambiente, data, strumenti, pagine, risultati, gravità e piano di correzione. Rieseguire dopo cambiamenti sostanziali.

## Stato iniziale

Il markup mostra alcuni elementi semantici, etichette ARIA e gestione tastiera dei tab. Non è stato eseguito un audit automatico o manuale; il livello attuale è **DA VERIFICARE**. Nessuna dichiarazione di conformità va pubblicata finché non esistono evidenze documentate e revisione adeguata.
