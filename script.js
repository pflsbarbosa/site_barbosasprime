document.addEventListener('DOMContentLoaded', () => {
    // Força o navegador a carregar o site sempre no topo absoluto
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }

    // Seleciona todos os links internos que controlam a navegação por âncoras
    const linksDeNavegacao = document.querySelectorAll('nav a, .btn-hero');

    linksDeNavegacao.forEach(link => {
        link.addEventListener('click', function(evento) {
            const idAlvo = this.getAttribute('href');

            // Verifica se o link é direcionado para uma ID interna da página
            if (idAlvo && idAlvo.startsWith('#')) {
                evento.preventDefault();
                
                const elementoAlvo = document.querySelector(idAlvo);
                if (elementoAlvo) {
                    const cabecalho = document.getElementById('site-header');
                    const alturaCabecalho = cabecalho ? cabecalho.offsetHeight : 0;
                    
                    // Calcula a posição topo do elemento descontando o cabeçalho fixo
                    const posicaoElemento = elementoAlvo.getBoundingClientRect().top + window.scrollY;
                    
                    // Se for para o início, vai ao topo absoluto, senão desconta a barra e adiciona uma pequena margem de segurança
                    const posicaoFinal = idAlvo === '#inicio' ? 0 : (posicaoElemento - alturaCabecalho - 20);

                    window.scrollTo({
                        top: posicaoFinal,
                        behavior: 'smooth'
                    });

                    // Atualiza a URL sem saltar ou quebrar o fluxo visual
                    history.pushState(null, null, idAlvo);
                }
            }
        });
    });
});
