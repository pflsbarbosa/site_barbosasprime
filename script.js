/**
 * Application Main Script
 * Barbosas Prime Website - Clean JavaScript Standard
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling navigation setup
    setupSmoothNavigation();

    // 2. Dynamic user profile logic (Investor vs Particular)
    setupVipFormLogic();
});

/**
 * Handles smooth scrolling for all internal navigation links
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
 * Handles dynamic behavior for the VIP access form and dual mail client dispatch
 */
function setupVipFormLogic() {
    const userProfileSelect = document.getElementById('vip-user-profile');
    const multipleUnitsOption = document.getElementById('opt-multiple-units');
    const propertyTypeSelect = document.getElementById('vip-property-type');
    const submitButton = document.getElementById('vip-submit-btn');

    // Toggle multiple units option based on profile selection
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

    // Handle form submission and mail dispatch
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();

            const fullNameInput = document.getElementById('vip-full-name');
            const emailAddressInput = document.getElementById('vip-email-address');

            if (!fullNameInput || !fullNameInput.value || !emailAddressInput || !emailAddressInput.value) {
                alert('Por favor, preencha o seu Nome e E-mail.');
                return;
            }

            const clientName = fullNameInput.value;
            const clientEmail = emailAddressInput.value;
            const phoneNumber = document.getElementById('vip-phone-number').value || 'Não indicado';
            const userProfile = userProfileSelect ? userProfileSelect.options[userProfileSelect.selectedIndex].text : 'Particular';
            const propertyType = propertyTypeSelect ? propertyTypeSelect.options[propertyTypeSelect.selectedIndex].text : 'Não selecionada';

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

            // 1. Tenta abrir a aplicação de e-mail nativa do sistema
            window.location.href = mailtoUrl;

            // 2. Fallback para webmail caso não abra nenhuma app
            let feedbackElement = document.getElementById('vip-fallback-msg');
            if (!feedbackElement) {
                feedbackElement = document.createElement('p');
                feedbackElement.id = 'vip-fallback-msg';
                feedbackElement.style.cssText = 'margin-top: 12px; font-size: 0.85rem; color: #d0d0d0; text-align: center;';
                submitButton.parentNode.appendChild(feedbackElement);
            }

            feedbackElement.innerHTML = `Não abriu a sua aplicação de e-mail? <a href="${gmailUrl}" target="_blank" style="color: var(--accent-gold); text-decoration: underline; font-weight: bold;">Clique aqui para enviar via Gmail no browser</a>.`;
        });
    }
}
