const PHASES = [
  { title: 'Metti a fuoco il progetto', description: 'Definisci obiettivi, vincoli, tempi e budget.' },
  { title: 'Verifica la situazione esistente', description: 'Controlla lo stato della casa e i punti critici.' },
  { title: 'Prepara i documenti', description: 'Raccogli foto, misure e tutte le informazioni utili.' },
  { title: 'Confronta preventivi', description: 'Richiedi almeno tre offerte e confronta i dettagli.' },
  { title: 'Decidi le priorità', description: 'Scegli cosa fare subito e cosa va rimandato.' },
  { title: 'Monitora e firma', description: 'Tieni traccia delle decisioni e verifica tutto prima della firma.' }
];

const diaryKey = 'cantiere-chiaro-diary-v1';
const familyKey = 'family-tree-studio-v1';

const defaultFamily = {
  trees: [
    { id: 'tree-1', name: 'Famiglia Rossi', description: 'Ramo principale' }
  ],
  people: [
    { id: 'p1', treeId: 'tree-1', firstName: 'Luca', lastName: 'Rossi', birthDate: '1975-03-14', place: 'Milano', gender: 'Maschio', notes: 'Capofamiglia', photo: '', color: '#dfeccf' },
    { id: 'p2', treeId: 'tree-1', firstName: 'Anna', lastName: 'Bianchi', birthDate: '1979-07-20', place: 'Roma', gender: 'Femmina', notes: 'Madre della famiglia', photo: '', color: '#e9d8f7' },
    { id: 'p3', treeId: 'tree-1', firstName: 'Marco', lastName: 'Rossi', birthDate: '2001-11-02', place: 'Milano', gender: 'Maschio', notes: 'Figlio primogenito', photo: '', color: '#f5d7a4' },
    { id: 'p4', treeId: 'tree-1', firstName: 'Sofia', lastName: 'Rossi', birthDate: '2004-05-18', place: 'Milano', gender: 'Femmina', notes: 'Seconda figlia', photo: '', color: '#f5d4df' },
    { id: 'p5', treeId: 'tree-1', firstName: 'Giulia', lastName: 'Rossi', birthDate: '1998-09-12', place: 'Bergamo', gender: 'Femmina', notes: 'Figlia maggiore', photo: '', color: '#d7ebf2' }
  ],
  relationships: [
    { id: 'r1', treeId: 'tree-1', type: 'spouseOf', personA: 'p1', personB: 'p2' },
    { id: 'r2', treeId: 'tree-1', type: 'parentOf', personA: 'p1', personB: 'p3' },
    { id: 'r3', treeId: 'tree-1', type: 'parentOf', personA: 'p1', personB: 'p4' },
    { id: 'r4', treeId: 'tree-1', type: 'parentOf', personA: 'p2', personB: 'p3' },
    { id: 'r5', treeId: 'tree-1', type: 'parentOf', personA: 'p2', personB: 'p4' },
    { id: 'r6', treeId: 'tree-1', type: 'parentOf', personA: 'p1', personB: 'p5' },
    { id: 'r7', treeId: 'tree-1', type: 'parentOf', personA: 'p2', personB: 'p5' }
  ],
  treeId: 'tree-1'
};

let state = loadFamilyState();
let selectedPersonId = state.people[0]?.id ?? null;
let installPrompt = null;

function loadFamilyState() {
  try {
    const raw = localStorage.getItem(familyKey);
    if (!raw) return JSON.parse(JSON.stringify(defaultFamily));
    const parsed = JSON.parse(raw);
    return parsed && parsed.trees ? parsed : JSON.parse(JSON.stringify(defaultFamily));
  } catch {
    return JSON.parse(JSON.stringify(defaultFamily));
  }
}

function saveFamilyState() {
  localStorage.setItem(familyKey, JSON.stringify(state));
}

function readDiaryEntries() {
  try {
    return JSON.parse(localStorage.getItem(diaryKey) || '[]');
  } catch {
    return [];
  }
}

function saveDiaryEntries(entries) {
  localStorage.setItem(diaryKey, JSON.stringify(entries));
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderProgress() {
  const completed = PHASES.filter((phase) => phase.done).length;
  const percent = Math.round((completed / PHASES.length) * 100);
  const value = document.getElementById('progress-value');
  const ring = document.getElementById('progress-ring');
  const bar = document.getElementById('progress-bar');
  const count = document.getElementById('completed-count');
  const total = document.getElementById('total-count');
  const nextTitle = document.getElementById('next-title');
  const nextDescription = document.getElementById('next-description');
  const stepIndex = document.querySelector('.step-index');

  value.textContent = String(percent);
  count.textContent = String(completed);
  total.textContent = String(PHASES.length);
  bar.style.width = `${percent}%`;

  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = String(circumference);
  ring.style.strokeDashoffset = String(circumference - (percent / 100) * circumference);

  const next = PHASES.find((phase) => !phase.done) || PHASES[PHASES.length - 1];
  nextTitle.textContent = completed >= PHASES.length ? 'Percorso completo' : next.title;
  nextDescription.textContent = completed >= PHASES.length
    ? 'Hai chiuso tutti i passaggi: controlla le verifiche finali e conferma le decisioni.'
    : next.description;

  if (stepIndex) {
    const nextNumber = completed >= PHASES.length ? PHASES.length : (PHASES.findIndex((phase) => !phase.done) + 1 || 1);
    stepIndex.innerHTML = `${String(nextNumber).padStart(2, '0')} <span>/ 06</span>`;
  }
}

function renderDiary() {
  const entries = readDiaryEntries();
  const container = document.getElementById('diary-list');
  const count = document.getElementById('diary-count');
  if (count) count.textContent = `${entries.length} ${entries.length === 1 ? 'nota' : 'note'}`;
  if (!container) return;

  if (!entries.length) {
    container.innerHTML = '<li class="diary-item"><strong>Nessuna nota</strong><p>Le tue decisioni e i richiami appariranno qui.</p></li>';
    return;
  }

  container.innerHTML = entries.map((entry) => `
    <li class="diary-item">
      <strong>${escapeHtml(entry.title || 'Nota')}</strong>
      <small>${escapeHtml(entry.date || '')} · ${escapeHtml(entry.category || 'decisione')}</small>
      <p>${escapeHtml(entry.description || '')}</p>
    </li>
  `).join('');
}

function initializeLegacyDemo() {
  const phaseList = document.getElementById('phase-list');
  if (phaseList) {
    phaseList.innerHTML = PHASES.map((phase, index) => `
      <label class="phase-item">
        <input type="checkbox" data-task="${index}">
        <span class="phase-item-label">
          <strong>${phase.title}</strong>
          <span>${phase.description}</span>
        </span>
      </label>
    `).join('');

    phaseList.querySelectorAll('input[data-task]').forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        const index = Number(event.target.getAttribute('data-task'));
        PHASES[index].done = event.target.checked;
        renderProgress();
      });
    });
  }

  const detail = document.getElementById('phase-detail');
  if (detail) {
    detail.innerHTML = `<h3>${PHASES[0].title}</h3><p>${PHASES[0].description}</p>`;
  }

  const nextAction = document.getElementById('next-action');
  if (nextAction) {
    nextAction.addEventListener('click', () => {
      const next = PHASES.find((phase) => !phase.done) || PHASES[PHASES.length - 1];
      const target = detail;
      if (target) target.innerHTML = `<h3>${next.title}</h3><p>${next.description}</p>`;
    });
  }

  const continueButton = document.getElementById('continue-button');
  if (continueButton) {
    continueButton.addEventListener('click', () => {
      const next = PHASES.find((phase) => !phase.done) || PHASES[PHASES.length - 1];
      if (detail) detail.innerHTML = `<h3>${next.title}</h3><p>${next.description}</p>`;
    });
  }

  document.getElementById('reset-button')?.addEventListener('click', () => {
    PHASES.forEach((phase) => { phase.done = false; });
    phaseList?.querySelectorAll('input[data-task]').forEach((checkbox) => { checkbox.checked = false; });
    renderProgress();
  });

  document.getElementById('help-button')?.addEventListener('click', () => {
    setDialogVisible('sicurezza', true);
  });

  document.getElementById('close-dialog')?.addEventListener('click', () => {
    setDialogVisible('sicurezza', false);
  });

  document.getElementById('sicurezza')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      setDialogVisible('sicurezza', false);
    }
  });

  document.getElementById('diary-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const entry = {
      date: form.get('date') || new Date().toISOString().slice(0, 10),
      category: form.get('category') || 'decisione',
      title: form.get('title') || 'Nota',
      description: form.get('description') || ''
    };
    const entries = readDiaryEntries();
    entries.unshift(entry);
    saveDiaryEntries(entries);
    event.target.reset();
    renderDiary();
  });

  document.getElementById('export-diary')?.addEventListener('click', () => {
    const data = JSON.stringify(readDiaryEntries(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diario-lavori-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  renderProgress();
  renderDiary();
}

function getSelectedTree() {
  return state.trees.find((tree) => tree.id === state.treeId) || state.trees[0];
}

function getTreePeople(treeId = state.treeId) {
  return state.people.filter((person) => person.treeId === treeId);
}

function getTreeRelationships(treeId = state.treeId) {
  return state.relationships.filter((link) => link.treeId === treeId);
}

function getPersonById(id) {
  return state.people.find((person) => person.id === id) || null;
}

function randomColor() {
  const colors = ['#dfeecf', '#e7d9f8', '#f3d8a9', '#f5d3e2', '#d7ebf2', '#f0d7bf'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function setDialogVisible(dialogId, isVisible) {
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;
  dialog.classList.toggle('hidden', !isVisible);
  dialog.setAttribute('aria-hidden', String(!isVisible));
}

function renderTreeSummary() {
  const summary = document.getElementById('tree-summary');
  if (!summary) return;
  const tree = getSelectedTree();
  const people = getTreePeople();
  const couples = getTreeRelationships().filter((link) => link.type === 'spouseOf').length;
  summary.innerHTML = `
    <div class="inline-header">
      <h3>${escapeHtml(tree?.name || 'Albero famiglia')}</h3>
      <span class="status-pill"><i></i> Locale</span>
    </div>
    <p class="muted-copy">${escapeHtml(tree?.description || 'Albero familiare locale')}</p>
    <div class="detail-meta">
      <div class="meta-item"><span>Persone</span><strong>${people.length}</strong></div>
      <div class="meta-item"><span>Relazioni</span><strong>${getTreeRelationships().length}</strong></div>
      <div class="meta-item"><span>Coppi e</span><strong>${couples}</strong></div>
      <div class="meta-item"><span>Selezionato</span><strong>${selectedPersonId ? 'Sì' : 'No'}</strong></div>
    </div>
  `;
}

function renderTreeList() {
  const treeList = document.getElementById('tree-list');
  if (!treeList) return;
  treeList.innerHTML = state.trees.map((tree) => `
    <div class="tree-card ${tree.id === state.treeId ? 'active' : ''}">
      <div class="tree-card-info">
        <strong>${escapeHtml(tree.name)}</strong>
        <span>${getTreePeople(tree.id).length} persone</span>
      </div>
      <button type="button" data-tree-id="${tree.id}">Apri</button>
    </div>
  `).join('');

  treeList.querySelectorAll('[data-tree-id]').forEach((button) => {
    button.addEventListener('click', () => {
      state.treeId = button.dataset.treeId;
      selectedPersonId = getTreePeople(state.treeId)[0]?.id ?? null;
      saveFamilyState();
      renderFamilyApp();
    });
  });

  const count = document.getElementById('tree-count');
  if (count) {
    const total = state.trees.length;
    count.textContent = `${total} ${total === 1 ? 'albero' : 'alberi'}`;
  }
}

function renderPeopleList() {
  const peopleList = document.getElementById('people-list');
  if (!peopleList) return;
  const people = getTreePeople();
  peopleList.innerHTML = people.map((person) => `
    <div class="person-chip ${selectedPersonId === person.id ? 'active' : ''}">
      <div class="person-meta">
        <div class="avatar-mini">${(person.firstName || 'P').charAt(0).toUpperCase()}${(person.lastName || '').charAt(0).toUpperCase()}</div>
        <div>
          <strong>${escapeHtml(`${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Persona')}</strong>
          <small>${escapeHtml(person.place || 'Senza luogo')}</small>
        </div>
      </div>
      <button type="button" data-select-person="${person.id}">Apri</button>
    </div>
  `).join('');

  peopleList.querySelectorAll('[data-select-person]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedPersonId = button.dataset.selectPerson;
      renderFamilyApp();
    });
  });
}

function renderSearchResults() {
  const search = document.getElementById('person-search');
  const results = document.getElementById('search-results');
  if (!search || !results) return;
  const term = search.value.trim().toLowerCase();
  if (!term) {
    results.innerHTML = '';
    return;
  }

  const matches = getTreePeople().filter((person) => {
    const text = `${person.firstName || ''} ${person.lastName || ''} ${person.place || ''}`.toLowerCase();
    return text.includes(term);
  });

  results.innerHTML = matches.slice(0, 6).map((person) => `
    <div class="search-item">
      <strong>${escapeHtml(`${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Persona')}</strong>
      <button type="button" data-select-person="${person.id}">Apri</button>
    </div>
  `).join('');

  results.querySelectorAll('[data-select-person]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedPersonId = button.dataset.selectPerson;
      search.value = '';
      renderFamilyApp();
    });
  });
}

function relationshipSummary(personId) {
  const links = getTreeRelationships().filter((link) => link.personA === personId || link.personB === personId);
  if (!links.length) return 'Nessuna relazione';

  const summary = links.slice(0, 2).map((link) => {
    const otherId = link.personA === personId ? link.personB : link.personA;
    const other = getPersonById(otherId);
    const label = link.type === 'spouseOf' ? 'coniuge' : link.type === 'parentOf' ? 'figlio/a' : 'fratello/a';
    return `${label} ${other ? `${other.firstName} ${other.lastName}`.trim() : 'persona'}`;
  });
  return summary.join(', ');
}

function renderDetail() {
  const detail = document.getElementById('person-detail');
  if (!detail) return;
  const person = getPersonById(selectedPersonId);
  if (!person) {
    detail.classList.add('empty');
    detail.innerHTML = 'Seleziona o crea una persona';
    return;
  }

  detail.classList.remove('empty');
  detail.innerHTML = `
    <div class="detail-header">
      ${person.photo ? `<img class="detail-photo" src="${person.photo}" alt="${escapeHtml(person.firstName || 'Persona')}" />` : `<div class="detail-photo" style="display:grid;place-items:center;background:linear-gradient(135deg,#dfeee0,#bfd8c4);font-weight:700;color:#12372d;">${escapeHtml((person.firstName || 'P').charAt(0).toUpperCase())}</div>`}
      <div>
        <h3>${escapeHtml(`${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Persona')}</h3>
        <small>${escapeHtml(person.place || 'Luogo non indicato')}</small>
      </div>
    </div>
    <div class="detail-meta">
      <div class="meta-item"><span>Data nascita</span><strong>${escapeHtml(person.birthDate || '—')}</strong></div>
      <div class="meta-item"><span>Data morte</span><strong>${escapeHtml(person.deathDate || '—')}</strong></div>
      <div class="meta-item"><span>Genere</span><strong>${escapeHtml(person.gender || '—')}</strong></div>
      <div class="meta-item"><span>Relazioni</span><strong>${escapeHtml(relationshipSummary(person.id))}</strong></div>
    </div>
    <div>
      <h4>Note</h4>
      <p class="person-notes">${escapeHtml(person.notes || 'Nessuna nota aggiunta.')}</p>
    </div>
    <div class="detail-actions">
      <button type="button" class="button secondary" data-edit-person="${person.id}">Modifica</button>
      <button type="button" class="button secondary" data-link-person="${person.id}">Collega</button>
      <button type="button" class="button secondary" data-delete-person="${person.id}">Elimina</button>
    </div>
  `;

  detail.querySelector('[data-edit-person]')?.addEventListener('click', () => openPersonModal(person.id));
  detail.querySelector('[data-link-person]')?.addEventListener('click', () => openRelationModal(person.id));
  detail.querySelector('[data-delete-person]')?.addEventListener('click', () => {
    state.people = state.people.filter((entry) => entry.id !== person.id);
    state.relationships = state.relationships.filter((link) => link.personA !== person.id && link.personB !== person.id);
    selectedPersonId = getTreePeople()[0]?.id ?? null;
    saveFamilyState();
    renderFamilyApp();
  });
}

function renderGraph() {
  const svg = document.getElementById('family-graph');
  if (!svg) return;
  svg.innerHTML = '';
  const people = getTreePeople();
  if (!people.length) {
    svg.innerHTML = '<text x="600" y="380" text-anchor="middle" fill="#5a6e68" font-size="22">Aggiungi una persona per iniziare il tuo albero</text>';
    return;
  }

  const positions = {};
  const columns = Math.max(3, Math.ceil(Math.sqrt(people.length * 1.6)));
  people.forEach((person, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    positions[person.id] = { x: 120 + col * 220, y: 120 + row * 180 };
  });

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  getTreeRelationships().forEach((link) => {
    const from = getPersonById(link.personA);
    const to = getPersonById(link.personB);
    if (!from || !to) return;
    const p1 = positions[from.id];
    const p2 = positions[to.id];
    if (!p1 || !p2) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p1.x + 70);
    line.setAttribute('y1', p1.y + 34);
    line.setAttribute('x2', p2.x + 70);
    line.setAttribute('y2', p2.y + 34);
    line.setAttribute('class', `edge-line ${link.type === 'spouseOf' ? 'spouse' : 'parent'}`);
    group.appendChild(line);
  });

  people.forEach((person) => {
    const pos = positions[person.id];
    const card = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', pos.x);
    rect.setAttribute('y', pos.y);
    rect.setAttribute('rx', 18);
    rect.setAttribute('ry', 18);
    rect.setAttribute('width', 140);
    rect.setAttribute('height', 68);
    rect.setAttribute('fill', person.color || '#ffffff');
    rect.setAttribute('stroke', selectedPersonId === person.id ? '#1d5c49' : 'rgba(18,35,27,0.15)');
    rect.setAttribute('stroke-width', selectedPersonId === person.id ? '2.5' : '1.2');
    rect.style.cursor = 'pointer';
    rect.addEventListener('click', () => {
      selectedPersonId = person.id;
      renderFamilyApp();
    });

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x + 26);
    circle.setAttribute('cy', pos.y + 34);
    circle.setAttribute('r', 16);
    circle.setAttribute('fill', '#dfe9df');
    circle.setAttribute('stroke', '#6c8d78');

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', pos.x + 52);
    label.setAttribute('y', pos.y + 26);
    label.setAttribute('class', 'node-label');
    label.textContent = `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Persona';

    const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sub.setAttribute('x', pos.x + 52);
    sub.setAttribute('y', pos.y + 44);
    sub.setAttribute('class', 'node-sub');
    sub.textContent = person.place || 'Senza luogo';

    const initials = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    initials.setAttribute('x', pos.x + 26);
    initials.setAttribute('y', pos.y + 39);
    initials.setAttribute('text-anchor', 'middle');
    initials.setAttribute('font-size', '16');
    initials.setAttribute('font-weight', '700');
    initials.setAttribute('fill', '#18342c');
    initials.textContent = (person.firstName || 'P').charAt(0).toUpperCase();

    card.appendChild(rect);
    card.appendChild(circle);
    card.appendChild(initials);
    card.appendChild(label);
    card.appendChild(sub);
    group.appendChild(card);
  });

  svg.appendChild(group);
}

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }
  const modalBody = document.getElementById('modal-body');
  if (modalBody) modalBody.innerHTML = '';
}

function openPersonModal(personId = null) {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  if (!modalTitle || !modalBody) return;
  const person = personId ? getPersonById(personId) : null;
  modalTitle.textContent = person ? 'Modifica persona' : 'Nuova persona';
  modalBody.innerHTML = `
    <form id="person-form">
      <div class="form-grid">
        <label class="form-field"><span>Nome</span><input name="firstName" value="${escapeHtml(person?.firstName || '')}" required /></label>
        <label class="form-field"><span>Cognome</span><input name="lastName" value="${escapeHtml(person?.lastName || '')}" /></label>
        <label class="form-field"><span>Data nascita</span><input type="date" name="birthDate" value="${escapeHtml(person?.birthDate || '')}" /></label>
        <label class="form-field"><span>Data morte</span><input type="date" name="deathDate" value="${escapeHtml(person?.deathDate || '')}" /></label>
        <label class="form-field"><span>Genere</span><select name="gender"><option value="Maschio" ${person?.gender === 'Maschio' ? 'selected' : ''}>Maschio</option><option value="Femmina" ${person?.gender === 'Femmina' ? 'selected' : ''}>Femmina</option><option value="Altro" ${person?.gender === 'Altro' ? 'selected' : ''}>Altro</option></select></label>
        <label class="form-field"><span>Luogo</span><input name="place" value="${escapeHtml(person?.place || '')}" /></label>
      </div>
      <label class="form-field"><span>Note</span><textarea name="notes" rows="3">${escapeHtml(person?.notes || '')}</textarea></label>
      <label class="form-field"><span>Foto</span><input type="file" name="photo" accept="image/*" /></label>
      ${person?.photo ? `<img class="image-preview" src="${person.photo}" alt="Anteprima foto" />` : ''}
      <div class="form-actions">
        <button type="button" class="button secondary close-modal-button">Annulla</button>
        <button type="submit" class="button button-primary">Salva</button>
      </div>
    </form>
  `;

  modalBody.querySelector('.close-modal-button').addEventListener('click', closeModal);
  modalBody.querySelector('#person-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const firstName = String(form.get('firstName') || '').trim();
    const lastName = String(form.get('lastName') || '').trim();
    const birthDate = String(form.get('birthDate') || '');
    const deathDate = String(form.get('deathDate') || '');
    const gender = String(form.get('gender') || 'Altro');
    const place = String(form.get('place') || '').trim();
    const notes = String(form.get('notes') || '').trim();
    const file = form.get('photo');
    const photo = file && file.name ? await fileToDataUrl(file) : person?.photo || '';

  if (!firstName && !lastName) {
    alert('Inserisci almeno un nome o un cognome per salvare la persona.');
    return;
  }

  if (person) {
    person.firstName = firstName;
    person.lastName = lastName;
    person.birthDate = birthDate;
    person.deathDate = deathDate;
    person.gender = gender;
    person.place = place;
    person.notes = notes;
    person.photo = photo;
  } else {
    const newPerson = { id: `person-${Date.now()}`, treeId: state.treeId, firstName, lastName, birthDate, deathDate, gender, place, notes, photo, color: randomColor() };
    state.people.push(newPerson);
    selectedPersonId = newPerson.id;
  }

  saveFamilyState();
  closeModal();
  renderFamilyApp();
  });

  openModal();
}

function openRelationModal(personId) {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  if (!modalTitle || !modalBody) return;

  const others = getTreePeople().filter((person) => person.id !== personId);
  if (!others.length) {
    modalTitle.textContent = 'Collega persona';
    modalBody.innerHTML = '<p>Prima aggiungi un’altra persona nel tuo albero.</p><div class="form-actions"><button type="button" class="button secondary close-modal-button">Chiudi</button></div>';
    modalBody.querySelector('.close-modal-button').addEventListener('click', closeModal);
    openModal();
    return;
  }

  modalTitle.textContent = 'Collega persona';
  modalBody.innerHTML = `
    <form id="relation-form">
      <label class="form-field"><span>Persona da collegare</span>
        <select name="otherPerson" required>
          ${others.map((person) => `<option value="${person.id}">${escapeHtml(`${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Persona')}</option>`).join('')}
        </select>
      </label>
      <label class="form-field"><span>Tipo di relazione</span>
        <select name="type" required>
          <option value="parentOf">Genitore di</option>
          <option value="spouseOf">Coniuge di</option>
          <option value="siblingOf">Fratello/sorella di</option>
        </select>
      </label>
      <div class="form-actions">
        <button type="button" class="button secondary close-modal-button">Annulla</button>
        <button type="submit" class="button button-primary">Salva</button>
      </div>
    </form>
  `;

  modalBody.querySelector('.close-modal-button').addEventListener('click', closeModal);
  modalBody.querySelector('#relation-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const otherId = String(form.get('otherPerson'));
    const type = String(form.get('type'));
    const exists = state.relationships.some((link) => link.treeId === state.treeId && link.type === type && ((link.personA === personId && link.personB === otherId) || (link.personA === otherId && link.personB === personId)));
    if (!exists) {
      state.relationships.push({ id: `rel-${Date.now()}`, treeId: state.treeId, type, personA: personId, personB: otherId });
    }
    saveFamilyState();
    closeModal();
    renderFamilyApp();
  });

  openModal();
}

function renderFamilyApp() {
  renderTreeSummary();
  renderTreeList();
  renderPeopleList();
  renderDetail();
  renderSearchResults();
  renderGraph();
  const statusBadge = document.getElementById('status-badge');
  if (statusBadge) {
    statusBadge.textContent = 'Salvato localmente';
  }
}

function ensureTreeHasPeople() {
  if (!state.trees.length) {
    const fallbackTree = { id: `tree-${Date.now()}`, name: 'Albero famiglia', description: 'Nuovo albero locale' };
    state.trees.push(fallbackTree);
    state.treeId = fallbackTree.id;
  }
  if (!getTreePeople().length && state.people.length) {
    state.people.forEach((person) => {
      if (!person.treeId) person.treeId = state.treeId;
    });
  }
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Errore nel caricamento di una foto'));
    reader.readAsDataURL(file);
  });
}

function initializeFamilyApp() {
  ensureTreeHasPeople();

  const addPersonButton = document.getElementById('add-person-button');
  if (addPersonButton) addPersonButton.addEventListener('click', () => openPersonModal());

  const newTreeButton = document.getElementById('new-tree-button');
  if (newTreeButton) newTreeButton.addEventListener('click', () => {
    const id = `tree-${Date.now()}`;
    state.trees.push({ id, name: `Albero ${state.trees.length + 1}`, description: 'Nuovo albero familiare' });
    state.treeId = id;
    saveFamilyState();
    renderFamilyApp();
  });

  const importInput = document.getElementById('file-import-input');
  const importButton = document.getElementById('import-button');
  if (importButton) importButton.addEventListener('click', () => importInput?.click());
  if (importInput) {
    importInput.addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const raw = await file.text();
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.trees) throw new Error('Formato invalido');
        state = parsed;
        selectedPersonId = getTreePeople()[0]?.id ?? null;
        saveFamilyState();
        renderFamilyApp();
      } catch {
        alert('Impossibile importare il file: formato non valido.');
      }
      event.target.value = '';
    });
  }

  document.getElementById('export-button')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `albero-famiglia-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  const search = document.getElementById('person-search');
  if (search) search.addEventListener('input', renderSearchResults);

  document.querySelector('[data-zoom="in"]')?.addEventListener('click', () => {
    const svg = document.getElementById('family-graph');
    if (!svg) return;
    const scale = Number.parseFloat(svg.dataset.scale || '1');
    const next = Math.min(scale + 0.12, 1.6);
    svg.dataset.scale = String(next);
    svg.style.transform = `scale(${next})`;
    svg.style.transformOrigin = 'center center';
  });

  document.querySelector('[data-zoom="out"]')?.addEventListener('click', () => {
    const svg = document.getElementById('family-graph');
    if (!svg) return;
    const scale = Number.parseFloat(svg.dataset.scale || '1');
    const next = Math.max(scale - 0.12, 0.7);
    svg.dataset.scale = String(next);
    svg.style.transform = `scale(${next})`;
    svg.style.transformOrigin = 'center center';
  });

  document.getElementById('center-tree-button')?.addEventListener('click', renderGraph);
  document.querySelector('.close-modal')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeModal();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    installPrompt = event;
    const installButton = document.getElementById('install-button');
    if (installButton) installButton.hidden = false;
  });

  document.getElementById('install-button')?.addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    const installButton = document.getElementById('install-button');
    if (installButton) installButton.hidden = true;
  });

  renderFamilyApp();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeLegacyDemo();
  initializeFamilyApp();
});
