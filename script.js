/**
 * Application Main Script
 * Barbosas Prime Website - Clean JavaScript Standard
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegação com scroll suave (com desvio exato para a altura do header)
    setupSmoothNavigation();

    // 2. Gestão do Menu Móvel (Hambúrguer)
    setupMobileMenu();

    // 3. Lógica dinâmica do formulário VIP (Investidor vs. Particular)
    setupVipFormLogic();

    // 4. Gestão do Pop-up / Modal do Manifesto do VLC
    setupManifestoModal();
});

/**
 * Trata da navegação suave descontando a altura exata do header fixo
 */
function setupSmoothNavigation() {
    const navigationLinks = document.querySelectorAll('.main-nav a, .brand-logo-link');
    const header = document.querySelector('.site-header');

    navigationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetHref = link.getAttribute('href');
            
            if (targetHref && targetHref.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(targetHref);
                
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Gere a abertura e fecho do Menu Mobile (Hambúrguer)
 */
function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
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
            document.body.style.overflow = 'hidden';
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
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

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\s()]/g, '');
        });
    }

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

            window.location.href = mailtoUrl;

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
