document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page-section');
    const navigationLinks = document.querySelectorAll('nav a, .btn-hero');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDelay = 600;

    // Suporte para navegação direta por hash na URL
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

        // Reinicia o scroll interno da nova secção para o topo
        sections[nextIndex].scrollTop = 0;

        currentIndex = nextIndex;
        
        const targetId = `#${sections[currentIndex].id}`;
        history.pushState(null, null, targetId);

        setTimeout(() => {
            isTransitioning = false;
        }, transitionDelay);
    }

    // Navegação com Roda do Rato (Wheel)
    window.addEventListener('wheel', (event) => {
        const currentSection = sections[currentIndex];
        
        // Permite scroll interno se o conteúdo exceder a janela antes de trocar de secção
        if (event.deltaY > 0) {
            const isAtBottom = currentSection.scrollHeight - currentSection.scrollTop <= currentSection.clientHeight + 5;
            if (isAtBottom) {
                changeSection(currentIndex + 1);
            }
        } else {
            if (currentSection.scrollTop <= 0) {
                changeSection(currentIndex - 1);
            }
        }
    }, { passive: true });

    // Navegação Tátil para Telemóveis (Xiaomi e outros smartphones)
    let touchStartY = 0;
    let touchEndY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchStartY - touchEndY;
        const threshold = 50; // Sensibilidade mínima do deslize em pixéis
        const currentSection = sections[currentIndex];

        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0) {
                // Deslize para CIMA -> próxima secção
                const isAtBottom = currentSection.scrollHeight - currentSection.scrollTop <= currentSection.clientHeight + 10;
                if (isAtBottom) {
                    changeSection(currentIndex + 1);
                }
            } else {
                // Deslize para BAIXO -> secção anterior
                if (currentSection.scrollTop <= 0) {
                    changeSection(currentIndex - 1);
                }
            }
        }
    }

    // Clique nos Links de Navegação
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

    // Navegação por Teclas do Teclado
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
