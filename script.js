document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }

    const navigationLinks = document.querySelectorAll('nav a, .btn-hero');

    navigationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                event.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerElement = document.getElementById('site-header');
                    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                    
                    // Medição matemática limpa a partir do topo absoluto da página
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const finalPosition = targetId === '#inicio' ? 0 : (elementPosition - headerHeight);

                    window.scrollTo({
                        top: finalPosition,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, targetId);
                }
            }
        });
    });
});
