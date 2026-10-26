document.addEventListener('DOMContentLoaded', () => {
    // Inicialização de estados e seletores do DOM
    const sections = document.querySelectorAll('.page-section');
    const navigationLinks = document.querySelectorAll('nav a, .btn-hero');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDelay = 800; // Tempo em milissegundos (deve bater certo com o transition do CSS)

    // Sincroniza o estado inicial caso haja um hash na URL ao carregar a página
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetIndex = Array.from(sections).findIndex(section => `#${section.id}` === targetId);
        if (targetIndex !== -1) {
            sections[currentIndex].classList.remove('active');
            sections[targetIndex].classList.add('active');
            currentIndex = targetIndex;
        }
    } else {
        // Fallback de segurança para garantir a primeira secção ativa
        if (sections.length > 0 && !sections[0].classList.contains('active')) {
            sections[0].classList.add('active');
        }
    }

    // Função central para controlo de mudança de secção e mutação de classes
    function changeSection(nextIndex) {
        if (nextIndex < 0 || nextIndex >= sections.length || isTransitioning) return;
        
        isTransitioning = true;

        // Mutação do DOM: Transição de opacidade via CSS
        sections[currentIndex].classList.remove('active');
        sections[nextIndex].classList.add('active');

        // Atualização de estado e histórico da janela
        currentIndex = nextIndex;
        const targetId = `#${sections[currentIndex].id}`;
        history.pushState(null, null, targetId);

        // Libertação do trinco de transição após a conclusão da animação
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDelay);
    }

    // Event Listener para capturar e processar o Scroll do Rato (Wheel)
    window.addEventListener('wheel', (event) => {
        // deltaY > 0 significa scroll para baixo (avançar), < 0 significa scroll para cima (recuar)
        if (event.deltaY > 0) {
            changeSection(currentIndex + 1);
        } else {
            changeSection(currentIndex - 1);
        }
    }, { passive: true });

    // Event Listener para capturar cliques no Menu de Navegação e Botões Hero
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                event.preventDefault();
                
                const targetIndex = Array.from(sections).findIndex(section => `#${section.id}` === targetId);
                
                if (targetIndex !== -1 && targetIndex !== currentIndex) {
                    changeSection(targetIndex);
                }
            }
        });
    });

    // Event Listener opcional para navegação através das setas do teclado (Melhoria de Acessibilidade)
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
