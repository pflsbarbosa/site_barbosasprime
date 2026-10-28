document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page-section');
    const navigationLinks = document.querySelectorAll('nav a, .btn-hero');
    const navItems = document.querySelectorAll('nav a.nav-link');

    function showSection(targetId) {
        // Oculta todas as secções e remove a classe ativa dos links do menu
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(link => link.classList.remove('active'));

        // Encontra e ativa a secção correspondente
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Atualiza o histórico do URL sem recarregar a página
            history.pushState(null, null, targetId);

            // Destaca o link correspondente no menu superior
            navItems.forEach(link => {
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Define o estado inicial com base no hash do URL (ex: #modelo, #contactos) ou inicia na primeira
    let initialHash = window.location.hash;
    if (!initialHash || !document.querySelector(initialHash)) {
        initialHash = `#${sections[0].id}`;
    }
    showSection(initialHash);

    // Evento de clique nos links de navegação e botões do site
    navigationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                event.preventDefault();
                showSection(targetId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});
