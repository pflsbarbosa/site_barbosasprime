/**
 * Barbosas Prime - Promotora Imobiliária
 * script.js - Lógica Modular, Resiliente e Orientada a Objetos (Vanilla JS)
 *
 * Pilares de Engenharia:
 * - SRP (Single Responsibility Principle): Módulos com responsabilidades isoladas.
 * - Robustez e Validação na Borda: Sanitização e tratamento defensivo sem falhas silenciosas.
 * - Acessibilidade (A11y): Gestão de foco em modais e eventos de teclado (Escape/Enter).
 */

"use strict";

/**
 * 1. CONFIGURAÇÕES E CONSTANTES
 */
const CONFIG = {
  RECIPIENT_EMAIL: "geral@barbosasprime.com",
  BREAKPOINT_MD: 768,
  HEADER_HEIGHT_DESKTOP: 80,
  HEADER_HEIGHT_MOBILE: 70,
  PROPERTY_LABELS: {
    t1: "Habitação T1",
    t2: "Habitação T2",
    t3: "Habitação T3",
    loja: "Loja / Espaço Comercial (≥ 100 m²)",
    multiplas: "Múltiplas Frações / Bloco de Investimento",
  },
  PROFILE_LABELS: {
    investidor: "Investidor / Empresário",
    particular: "Particular / Consumidor Final",
  },
};

/**
 * 2. MÓDULO DE NAVEGAÇÃO & HEADER
 * Gere o scroll suave compensando o header fixo e o menu de navegação móvel.
 */
class NavigationController {
  constructor() {
    this.header = document.querySelector(".site-header");
    this.mobileToggle = document.getElementById("mobileMenuToggle");
    this.mobileDrawer = document.getElementById("mobileNavDrawer");
    this.navLinks = document.querySelectorAll(
      ".nav-link-item, .mobile-nav-link",
    );
  }

  init() {
    this.bindEvents();
  }

  getHeaderHeight() {
    return window.innerWidth >= CONFIG.BREAKPOINT_MD
      ? CONFIG.HEADER_HEIGHT_DESKTOP
      : CONFIG.HEADER_HEIGHT_MOBILE;
  }

  bindEvents() {
    // Alternância do menu mobile com acessibilidade ARIA
    if (this.mobileToggle && this.mobileDrawer) {
      this.mobileToggle.addEventListener("click", () =>
        this.toggleMobileMenu(),
      );
    }

    // Scroll suave com compensação de offset para todos os links internos
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleSmoothScroll(e, link));
    });

    // Fechar menu mobile ao redimensionar para ecrã largo
    window.addEventListener("resize", () => {
      if (
        window.innerWidth >= CONFIG.BREAKPOINT_MD &&
        this.isMobileMenuOpen()
      ) {
        this.closeMobileMenu();
      }
    });
  }

  isMobileMenuOpen() {
    return this.mobileDrawer?.classList.contains("open") || false;
  }

  toggleMobileMenu() {
    const isOpen = this.isMobileMenuOpen();
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.mobileDrawer || !this.mobileToggle) return;
    this.mobileDrawer.classList.add("open");
    this.mobileToggle.setAttribute("aria-expanded", "true");
    this.mobileToggle.setAttribute("aria-label", "Fechar Menu");
    const icon = this.mobileToggle.querySelector("i");
    if (icon) {
      icon.className = "fas fa-times";
    }
  }

  closeMobileMenu() {
    if (!this.mobileDrawer || !this.mobileToggle) return;
    this.mobileDrawer.classList.remove("open");
    this.mobileToggle.setAttribute("aria-expanded", "false");
    this.mobileToggle.setAttribute("aria-label", "Abrir Menu");
    const icon = this.mobileToggle.querySelector("i");
    if (icon) {
      icon.className = "fas fa-bars";
    }
  }

  handleSmoothScroll(e, link) {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();
      this.closeMobileMenu();

      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - this.getHeaderHeight();

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  }
}

/**
 * 3. GESTOR DO POPOVER INTERATIVO ("PORQUÊ A PIRÂMIDE")
 * Suporta o comportamento de hover no desktop e toque/clique resiliente no telemóvel.
 */
class PopoverController {
  constructor(navigationController) {
    this.navController = navigationController;
    this.triggerBtn = document.getElementById("brandLogoBtn");
    this.popover = document.getElementById("logoPopover");
    this.backdrop = document.getElementById("popoverBackdrop");
    this.closeBtn = document.getElementById("popoverCloseBtn");
    this.mobileMenuPyramidBtn = document.getElementById("mobileMenuPyramidBtn");
    this.actionBtn = this.popover?.querySelector(".popover-action-btn");
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 1. Alternância ao clicar/tocar no logótipo (desktop ou telemóvel)
    if (this.triggerBtn && this.popover) {
      this.triggerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // 2. Abertura a partir do item dedicado no menu hamburguer do telemóvel
    if (this.mobileMenuPyramidBtn) {
      this.mobileMenuPyramidBtn.addEventListener("click", () => {
        if (this.navController) {
          this.navController.closeMobileMenu();
        }
        setTimeout(() => {
          this.open();
        }, 120);
      });
    }

    // 3. Botão de fechar (X)
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // 4. Fecho ao tocar no fundo escuro (backdrop)
    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => {
        this.close();
      });
    }

    // 5. Botão de ação "A Nobreza do bem fazer" fecha o popover antes de abrir o modal
    if (this.actionBtn) {
      this.actionBtn.addEventListener("click", () => {
        this.close();
      });
    }

    // 6. Fecho com tecla Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // 7. Clique fora fecha o popover
    document.addEventListener("click", (e) => {
      if (
        this.isOpen() &&
        !this.popover.contains(e.target) &&
        !this.triggerBtn?.contains(e.target)
      ) {
        this.close();
      }
    });
  }

  isOpen() {
    return this.popover?.classList.contains("is-open") || false;
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.popover) return;
    this.popover.classList.add("is-open");
    this.backdrop?.classList.add("is-open");
    this.triggerBtn?.setAttribute("aria-expanded", "true");
  }

  close() {
    if (!this.popover) return;
    this.popover.classList.remove("is-open");
    this.backdrop?.classList.remove("is-open");
    this.triggerBtn?.setAttribute("aria-expanded", "false");
  }
}

/**
 * 4. GESTOR DE MODAIS ACESSÍVEIS (WCAG 2.1)
 * Gere abertura, fecho, foco inicial e atalho Escape.
 */
class ModalManager {
  constructor() {
    this.activeModal = null;
    this.previousFocusedElement = null;
  }

  init() {
    this.bindGlobalEscListener();
    this.bindTriggerEvents();
  }

  bindGlobalEscListener() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });
  }

  bindTriggerEvents() {
    // Fecho clicando fora do diálogo (no backdrop overlay)
    const overlays = document.querySelectorAll(".modal-overlay");
    overlays.forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay);
        }
      });
    });

    // Botões com atributo data-modal-close
    const closeButtons = document.querySelectorAll("[data-modal-close]");
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-overlay");
        if (modal) {
          this.closeModal(modal);
        }
      });
    });

    // Botões de abertura do Manifesto
    const manifestoTriggers = document.querySelectorAll(
      '[data-modal-target="manifestoModal"]',
    );
    manifestoTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        this.openModalById("manifestoModal", trigger);
      });
    });

    // Botões de abertura do ADN da Pirâmide Dourada
    const pyramidTriggers = document.querySelectorAll(
      '[data-modal-target="pyramidStoryModal"]',
    );
    pyramidTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        this.openModalById("pyramidStoryModal", trigger);
      });
    });

  }

  openModalById(modalId, triggerElement = null) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.warn(`[ModalManager] Modal com id "${modalId}" não encontrado.`);
      return;
    }
    this.openModal(modal, triggerElement);
  }

  openModal(modal, triggerElement = null) {
    this.previousFocusedElement = triggerElement || document.activeElement;
    this.activeModal = modal;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focar no botão de fechar ou no primeiro elemento interativo
    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) {
      setTimeout(() => focusable.focus(), 50);
    }
  }

  closeModal(modal) {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    this.activeModal = null;
    document.body.style.overflow = "";

    // Devolver o foco ao elemento acionador
    if (
      this.previousFocusedElement &&
      typeof this.previousFocusedElement.focus === "function"
    ) {
      this.previousFocusedElement.focus();
    }
  }
}

/**
 * 4. MÓDULO DE VALIDAÇÃO E ENVIO DO FORMULÁRIO VIP
 * Aplica SRP: validação pura dos dados desacoplada do envio e da UI.
 */
class VipFormController {
  constructor() {
    this.form = document.getElementById("vip-access-form");
    this.nameInput = document.getElementById("vip-full-name");
    this.emailInput = document.getElementById("vip-email-address");
    this.phoneInput = document.getElementById("vip-phone-number");
    this.profileSelect = document.getElementById("vip-user-profile");
    this.propertySelect = document.getElementById("vip-property-type");
    this.multipleUnitsOption = document.getElementById("opt-multiple-units");

    this.feedbackBox = document.getElementById("formFeedback");
    this.actionWrapper = document.getElementById("vipActionWrapper");
    this.submitBtn = document.getElementById("vip-submit-btn");
    this.fallbackBox = document.getElementById("vipFallbackBox");
    this.fallbackLink = document.getElementById("fallbackGmailLink");
  }

  init() {
    if (!this.form) return;
    this.bindEvents();
  }

  bindEvents() {
    // Sanitização em tempo real do campo de telefone (apenas números e formato de chamada)
    if (this.phoneInput) {
      this.phoneInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9+\s()-]/g, "");
      });
    }

    // Regra de negócio: 'Múltiplas Frações' só está disponível para investidores
    if (this.profileSelect && this.multipleUnitsOption) {
      this.profileSelect.addEventListener("change", () =>
        this.handleProfileChange(),
      );
    }

    // Evento formal de SUBMIT (permite premir Enter e valida na borda)
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleProfileChange() {
    const isInvestidor = this.profileSelect.value === "investidor";
    this.multipleUnitsOption.hidden = !isInvestidor;
    this.multipleUnitsOption.disabled = !isInvestidor;

    if (!isInvestidor && this.propertySelect.value === "multiplas") {
      this.propertySelect.value = "";
    }
  }

  validateData(data) {
    if (!data.name || data.name.trim().length < 2) {
      return {
        isValid: false,
        message: "Por favor, indique o seu Nome Completo.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      return {
        isValid: false,
        message:
          "Por favor, indique um endereço de E-mail válido (ex: nome@exemplo.com).",
      };
    }

    if (!data.profile) {
      return {
        isValid: false,
        message: "Por favor, selecione o seu perfil de interesses.",
      };
    }

    if (!data.propertyType) {
      return {
        isValid: false,
        message: "Por favor, selecione a tipologia pretendida.",
      };
    }

    return { isValid: true, message: "" };
  }

  handleSubmit(e) {
    e.preventDefault();

    const rawData = {
      name: this.nameInput ? this.nameInput.value.trim() : "",
      email: this.emailInput ? this.emailInput.value.trim() : "",
      phone: this.phoneInput ? this.phoneInput.value.trim() : "",
      profile: this.profileSelect ? this.profileSelect.value : "",
      propertyType: this.propertySelect ? this.propertySelect.value : "",
    };

    const validation = this.validateData(rawData);

    if (!validation.isValid) {
      this.showFeedback(validation.message, true);
      return;
    }

    try {
      this.processSubmission(rawData);
    } catch (err) {
      console.error("[VipFormController] Erro ao processar formulário:", err);
      this.showFeedback(
        "Ocorreu um erro ao preparar o pedido. Por favor, tente novamente.",
        true,
      );
    }
  }

  processSubmission(data) {
    const profileLabel = CONFIG.PROFILE_LABELS[data.profile] || data.profile;
    const propertyLabel =
      CONFIG.PROPERTY_LABELS[data.propertyType] || data.propertyType;

    const emailSubject = `[VIP ACCESS] Pedido de Acesso Antecipado - ${data.name}`;
    const emailBody =
      `Olá Barbosas Prime,\n\n` +
      `Gostaria de solicitar o Acesso Prioritário VIP ao Vizela Living Center.\n\n` +
      `--- DADOS DO CONTACTO ---\n` +
      `• Nome: ${data.name}\n` +
      `• E-mail: ${data.email}\n` +
      `• Telefone: ${data.phone || "Não indicado"}\n` +
      `• Perfil de Interesse: ${profileLabel}\n` +
      `• Tipologia Pretendida: ${propertyLabel}\n\n` +
      `Aguardo o envio das plantas e informações oficiais antes do lançamento público.\n\n` +
      `Com os melhores cumprimentos,\n` +
      `${data.name}`;

    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    const mailtoUrl = `mailto:${CONFIG.RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONFIG.RECIPIENT_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;

    this.showFeedback(
      "Pedido processado com sucesso! A preparar envio de mensagem...",
      false,
    );

    // Configurar fallback amigável do Gmail
    if (this.fallbackLink) {
      this.fallbackLink.href = webGmailUrl;
    }
    if (this.fallbackBox) {
      this.fallbackBox.classList.add("visible");
    }
    if (this.submitBtn) {
      this.submitBtn.style.display = "none";
    }

    // Despoletar abertura do cliente de email predefinido
    window.location.href = mailtoUrl;
  }

  showFeedback(message, isError) {
    if (!this.feedbackBox) return;

    this.feedbackBox.textContent = message;
    this.feedbackBox.className = `form-feedback-alert ${isError ? "error" : "success"}`;
    this.feedbackBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/**
 * 5. RESILIÊNCIA E TRATAMENTO DEFENSIVO DE RECURSOS (IMAGENS)
 * Suporta automaticamente variações de nomenclatura de ficheiros locais
 * (ex: barbosas-logo-icon.png vs company-logo-icon.png).
 */
window.addEventListener(
  "error",
  (event) => {
    const target = event.target;
    if (target && target.tagName === "IMG") {
      const src = target.getAttribute("src") || "";
      if (src.includes("company-logo-icon.png") && !target.dataset.triedAltName) {
        target.dataset.triedAltName = "1";
        target.src = "images/logos/barbosas-logo-icon.png";
      } else if (src.includes("barbosas-logo-icon.png") && target.dataset.triedAltName === "1") {
        target.dataset.triedAltName = "2";
        target.src = "images/logos/barbosas-logo-icon.svg";
      } else if (src.includes("images/logos/") && !target.dataset.triedFlatFolder) {
        target.dataset.triedFlatFolder = "1";
        target.src = src.replace("images/logos/", "images/");
      }
    }
  },
  true,
);

/**
 * 6. INICIALIZAÇÃO DA APLICAÇÃO (BOOTSTRAP)
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const navigation = new NavigationController();
    navigation.init();

    const popover = new PopoverController(navigation);
    popover.init();

    const modals = new ModalManager();
    modals.init();

    const vipForm = new VipFormController();
    vipForm.init();

    console.log(
      "[Barbosas Prime] Aplicação inicializada com sucesso em 3 ficheiros (HTML, CSS, JS).",
    );
  } catch (error) {
    console.error(
      "[Barbosas Prime] Erro na inicialização da aplicação:",
      error,
    );
  }
});


