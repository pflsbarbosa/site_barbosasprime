document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }

    const linksDeNavegacao = document.querySelectorAll('nav a, .btn-hero');

    linksDeNavegacao.forEach(link => {
        link.addEventListener('click', function(evento) {
            const idAlvo = this.getAttribute('href');

            if (idAlvo && idAlvo.startsWith('#')) {
                evento.preventDefault();
                
                const elementoAlvo = document.querySelector(idAlvo);
                if (elementoAlvo) {
                    const cabecalho = document.getElementById('site-header');
                    const alturaCabecalho = cabecalho ? cabecalho.offsetHeight : 0;
                    
                    const posicaoElemento = elementoAlvo.getBoundingClientRect().top + window.scrollY;
                    const posicaoFinal = idAlvo === '#inicio' ? 0 : (posicaoElemento - alturaCabecalho - 15);

                    window.scrollTo({
                        top: posicaoFinal,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, idAlvo);
                }
            }
        });
    });
});
