document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LÓGICA DINÂMICA DO PERFIL (INVESTIDOR VS PARTICULAR)
    const perfilSelect = document.getElementById('vip-perfil');
    const optMultiplas = document.getElementById('opt-multiplas');
    const tipologiaSelect = document.getElementById('vip-tipologia');

    if (perfilSelect && optMultiplas) {
        perfilSelect.addEventListener('change', function() {
            if (this.value === 'investidor') {
                optMultiplas.style.display = 'block';
            } else {
                optMultiplas.style.display = 'none';
                if (tipologiaSelect.value === 'multiplas') {
                    tipologiaSelect.value = '';
                }
            }
        });
    }

    // 2. DISPARO DO FORMULÁRIO COM SUPORTE DUAL (APP NATIVA + GMAIL WEB)
    const btnSubmit = document.getElementById('btn-vip-submit');

    if (btnSubmit) {
        btnSubmit.addEventListener('click', function(e) {
            e.preventDefault();

            const nomeInput = document.getElementById('vip-nome');
            const emailInput = document.getElementById('vip-email');

            if (!nomeInput.value || !emailInput.value) {
                alert('Por favor, preencha o seu Nome e E-mail.');
                return;
            }

            const nome = nomeInput.value;
            const emailCliente = emailInput.value;
            const telefone = document.getElementById('vip-telefone').value || 'Não indicado';
            const perfil = perfilSelect ? perfilSelect.options[perfilSelect.selectedIndex].text : 'Particular';
            const tipologia = tipologiaSelect ? tipologiaSelect.options[tipologiaSelect.selectedIndex].text : 'Não selecionada';

            const emailDestino = "geral@barbosasprime.com";
            const assunto = `[VIP ACCESS] Pedido de Acesso Antecipado - ${nome}`;

            const corpo = 
                `Olá Barbosas Prime,\n\n` +
                `Gostaria de solicitar o Acesso Prioritário VIP ao Vizela Living Center.\n\n` +
                `--- DADOS DO CONTACTO ---\n` +
                `• Nome: ${nome}\n` +
                `• E-mail: ${emailCliente}\n` +
                `• Telefone: ${telefone}\n` +
                `• Perfil de Interesse: ${perfil}\n` +
                `• Tipologia Pretendida: ${tipologia}\n\n` +
                `Aguardo o envio das plantas e informações oficiais antes do lançamento público.\n\n` +
                `Com os melhores cumprimentos,\n` +
                `${nome}`;

            const mailtoUrl = `mailto:${emailDestino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

            // 1. Tenta abrir a aplicação do sistema (Outlook/Mail)
            window.location.href = mailtoUrl;

            // 2. Para quem não tem app instalada (ex: browser puro), cria/exibe uma mensagem de apoio imediatamente
            let feedback = document.getElementById('vip-fallback-msg');
            if (!feedback) {
                feedback = document.createElement('p');
                feedback.id = 'vip-fallback-msg';
                feedback.style.cssText = 'margin-top: 12px; font-size: 0.85rem; color: #666; text-align: center;';
                btnSubmit.parentNode.appendChild(feedback);
            }

            feedback.innerHTML = `Não abriu a sua aplicação de e-mail? <a href="${gmailUrl}" target="_blank" style="color: #b8975e; text-decoration: underline; font-weight: bold;">Clique aqui para enviar via Gmail no browser</a>.`;
        });
    }
});