/**
 * Application Main Script
 * Barbosas Prime Website - Clean JavaScript Standard
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegação com scroll suave para links internos
    setupSmoothNavigation();

    // 2. Lógica dinâmica do formulário VIP (Investidor vs. Particular)
    setupVipFormLogic();

    // 3. Gestão do Pop-up / Modal do Manifesto do VLC
    setupManifestoModal();
});

/**
 * Trata da navegação suave ao clicar nos links da barra de menu e do logo
 */
function setupSmoothNavigation() {
    const navigationLinks = document.querySelectorAll('.main-nav a, .brand-logo-link');

    navigationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHref = link.getAttribute('href');
            
            if (targetHref && targetHref.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(targetHref);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Gere a abertura e fecho do Modal/Pop-up do Manifesto VLC
 */
function setupManifestoModal() {
    const modal = document.getElementById('manifestoModal');
    const openBtn = document.getElementById('openManifestoBtn');
    const closeBtn = document.getElementById('closeManifestoBtn');

    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Fecha se o utilizador clicar no fundo escuro fora da caixa
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Fecha com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}

/**
 * Lógica do formulário VIP: mostra/esconde opções dinâmicas e gere o disparo de e-mail
 */
function setupVipFormLogic() {
    const userProfileSelect = document.getElementById('vip-user-profile');
    const multipleUnitsOption = document.getElementById('opt-multiple-units');
    const propertyTypeSelect = document.getElementById('vip-property-type');
    const submitButton = document.getElementById('vip-submit-btn');
    const phoneInput = document.getElementById('vip-phone-number');
    const actionWrapper = document.getElementById('vipActionWrapper');
    const fallbackGmailLink = document.getElementById('fallbackGmailLink');

    // FILTRAGEM DO TELEFONE: Impede a digitação de letras em tempo real no teclado
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\s()]/g, '');
        });
    }

    // Mostra/oculta a opção de "Múltiplas Frações" conforme o perfil selecionado
    if (userProfileSelect && multipleUnitsOption) {
        userProfileSelect.addEventListener('change', function() {
            if (this.value === 'investidor') {
                multipleUnitsOption.classList.remove('hidden-option');
            } else {
                multipleUnitsOption.classList.add('hidden-option');
                if (propertyTypeSelect && propertyTypeSelect.value === 'multiplas') {
                    propertyTypeSelect.value = '';
                }
            }
        });
    }

    // Submissão do formulário VIP e envio de e-mail
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();

            const fullNameInput = document.getElementById('vip-full-name');
            const emailAddressInput = document.getElementById('vip-email-address');

            if (!fullNameInput || !fullNameInput.value.trim() || !emailAddressInput || !emailAddressInput.value.trim()) {
                alert('Por favor, preencha o seu Nome e E-mail.');
                return;
            }

            const clientName = fullNameInput.value.trim();
            const clientEmail = emailAddressInput.value.trim();
            const phoneNumber = phoneInput && phoneInput.value.trim() !== '' ? phoneInput.value.trim() : 'Não indicado';
            const userProfile = userProfileSelect && userProfileSelect.selectedIndex >= 0 
                ? userProfileSelect.options[userProfileSelect.selectedIndex].text 
                : 'Particular';
            const propertyType = propertyTypeSelect && propertyTypeSelect.selectedIndex >= 0 
                ? propertyTypeSelect.options[propertyTypeSelect.selectedIndex].text 
                : 'Não selecionada';

            const recipientEmail = "geral@barbosasprime.com";
            const emailSubject = `[VIP ACCESS] Pedido de Acesso Antecipado - ${clientName}`;

            const emailBody = 
                `Olá Barbosas Prime,\n\n` +
                `Gostaria de solicitar o Acesso Prioritário VIP ao Vizela Living Center.\n\n` +
                `--- DADOS DO CONTACTO ---\n` +
                `• Nome: ${clientName}\n` +
                `• E-mail: ${clientEmail}\n` +
                `• Telefone: ${phoneNumber}\n` +
                `• Perfil de Interesse: ${userProfile}\n` +
                `• Tipologia Pretendida: ${propertyType}\n\n` +
                `Aguardo o envio das plantas e informações oficiais antes do lançamento público.\n\n` +
                `Com os melhores cumprimentos,\n` +
                `${clientName}`;

            const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // 1. Tenta abrir o cliente de e-mail nativo
            window.location.href = mailtoUrl;

            // 2. Ativa o estado de fallback no wrapper (esconde o botão e revela a mensagem no mesmo espaço)
            if (actionWrapper) {
                actionWrapper.classList.add('fallback-active');
            }

            if (fallbackGmailLink) {
                fallbackGmailLink.href = gmailUrl;
                fallbackGmailLink.target = '_blank';
            }
        });
    }
}
