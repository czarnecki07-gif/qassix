document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.lang-switch button');

    function setLanguage(lang) {
        // aktywny przycisk
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // wszystkie elementy z data-pl / data-en
        const translatable = document.querySelectorAll('[data-pl][data-en]');
        translatable.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text !== null) {
                el.textContent = text;
            }
        });

        // ustaw lang na <html>
        document.documentElement.lang = lang;
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });

    // domyślnie PL
    setLanguage('pl');
});
