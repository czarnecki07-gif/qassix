document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.assistant-card');
    const modal = document.getElementById('assistantModal');
    const modalClose = document.getElementById('modalClose');

    const titleEl = document.getElementById('modalTitle');
    const roleEl = document.getElementById('modalRole');
    const welcomeEl = document.getElementById('modalWelcome');
    const instrList = document.getElementById('modalInstructions');
    const featList = document.getElementById('modalFeatures');
    const exList = document.getElementById('modalExamples');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

    async function loadAssistantJson(key) {
        try {
            const res = await fetch(`json/${key}.json`);
            if (!res.ok) throw new Error(`JSON not found: ${key}`);
            return await res.json();
        } catch (err) {
            console.error('Error loading JSON:', key, err);
            return null;
        }
    }

    function clearList(el) {
        while (el.firstChild) el.removeChild(el.firstChild);
    }

    function fillList(listEl, items) {
        clearList(listEl);
        if (!Array.isArray(items)) return;
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listEl.appendChild(li);
        });
    }

    cards.forEach(card => {
        // puste placeholdery (jeśli są) ignorujemy
        const key = card.dataset.assistant;
        if (!key) return;

        card.addEventListener('click', async () => {
            const label = card.querySelector('h3')?.textContent.trim() || 'QAssi';

            const data = await loadAssistantJson(key);
            if (!data) {
                titleEl.textContent = label;
                roleEl.textContent = 'Could not load assistant data.';
                welcomeEl.textContent = '';
                clearList(instrList);
                clearList(featList);
                clearList(exList);
                openModal();
                return;
            }

            titleEl.textContent = label;
            roleEl.textContent = data.role || '';
            welcomeEl.textContent = data.welcome || '';

            fillList(instrList, data.instructions);
            fillList(featList, data.features);
            fillList(exList, data.examples);

            openModal();
        });
    });
});
