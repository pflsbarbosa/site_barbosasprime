document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page-section');
    const navigationLinks = document.querySelectorAll('nav a, .btn-hero');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDelay = 800; 

    // Limpa a herança errada da NodeList na validação de inicialização
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetIndex = Array.from(sections).findIndex(section => `#${section.id}` === targetId);
        if (targetIndex !== -1) {
            sections[currentIndex].classList.remove('active');
            sections[targetIndex].classList.add('active');
            currentIndex = targetIndex;
        }
    } else {
        if (sections.length > 0 && !sections[0].classList.contains('active')) {
            sections[0].classList.add('active');
        }
    }

    function changeSection(nextIndex) {
        if (nextIndex < 0 || nextIndex >= sections.length || isTransitioning) return;
        
        isTransitioning = true;

        sections[currentIndex].classList.remove('active');
        sections[nextIndex].classList.add('active');

        currentIndex = nextIndex;
        
        const targetId = `#${sections[currentIndex].id}`;
        history.pushState(null, null, targetId);

        setTimeout(() => {
            isTransitioning = false;
        }, transitionDelay);
    }

    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            changeSection(currentIndex + 1);
        } else {
            changeSection(currentIndex - 1);
        }
    }, { passive: true });

    navigationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetIndex = Array.from(sections).findIndex(section => `#${section.id}` === targetId);
                
                if (targetIndex !== -1 && targetIndex !== currentIndex) {
                    changeSection(targetIndex);
                }
            }
        });
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            event.preventDefault();
            changeSection(currentIndex + 1);
        } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault();
            changeSection(currentIndex - 1);
        }
    });
});
