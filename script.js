/**
 * Barbosas Prime - Promotora Imobiliária
 * script.js - Lógica Modular, Resiliente e Orientada a Objetos (Vanilla JS Puro)
 *
 * Pilares de Engenharia:
 * - SRP (Single Responsibility Principle): Módulos com responsabilidades isoladas.
 * - Robustez e Validação na Borda: Sanitização e tratamento defensivo sem falhas silenciosas.
 * - I18n Manager com Fallback Seguro: Suporte multilíngue PT, EN, FR, ES com persistência.
 * - Acessibilidade (A11y): Gestão de foco em modais e eventos de teclado (Escape/Enter).
 */

"use strict";

/**
 * 1. DICIONÁRIO DE TRADUÇÕES MULTILÍNGUE (PT, EN, FR, ES)
 */
const TRANSLATIONS = {
  pt: {
    langName: "Português",
    langCode: "PT",
    langFlag: "🇵🇹",
    // Navegação
    "nav.inicio": "Início",
    "nav.modelo": "O Modelo",
    "nav.vlc": "Vizela Living Center",
    "nav.contactos": "Contactos",
    "nav.pyramid": "Porquê a Pirâmide",
    "nav.pyramidStory": "A Nobreza do \"Bem Fazer\"",
    "nav.openMenu": "Abrir Menu",
    "nav.closeMenu": "Fechar Menu",
    // Popover Pirâmide
    "popover.heading": "Porquê a pirâmide",
    "popover.body": "Escolhemos o nosso logótipo em homenagem deliberada aos mestres construtores e matemáticos do Antigo Egito. As pirâmides permanecem intactas há mais de quatro milénios porque foram erguidas sob uma premissa imutável: o rigor absoluto do cálculo geométrico e a arte do bem fazer.",
    "popover.action": "A Nobreza do bem fazer",
    // Hero
    "hero.title": "PROJETAMOS O FUTURO COM A<br />EXPERIÊNCIA DO PASSADO",
    "hero.lead": "Na Barbosas Prime, unimos a nossa experiência na mediação e na reabilitação para idealizar conceitos únicos, selecionando gabinetes de referência para os transformar em realidade.",
    "hero.cta": "Conhecer Vizela Living Center",
    // O Modelo
    "modelo.title": "O NOSSO MODELO",
    "modelo.subtitle": "Inspirados na perenidade das grandes construções do passado, aplicamos um rigor absoluto em cada etapa construtiva no presente.",
    "modelo.card1.title": "Concepção para o Utilizador",
    "modelo.card1.desc": "Aproveitamos a nossa experiência em mediação e reabilitação para desenhar plantas modernas e funcionais. Priorizamos o conforto real (como WC privativo por quarto e garagens fechadas), adaptando cada metro quadrado ao que o mercado de qualidade procura.",
    "modelo.card2.title": "Visão de Futuro e Prestígio",
    "modelo.card2.desc": "Não construímos para o lucro rápido. Exigimos dos gabinetes de arquitetura soluções que garantam a máxima privacidade e bem-estar, com o objetivo de construir uma marca de referência onde cada cliente sinta orgulho em viver num imóvel Barbosas Prime.",
    "modelo.card3.title": "Fiscalização e Comercialização",
    "modelo.card3.desc": "Garantimos o rigor da obra através de uma fiscalização externa independente liderada por um engenheiro veterano. Para a comercialização, alinhamos numa relação de confiança com agentes experientes do mercado local, cuja forte notoriedade garante a execução correta das vendas.",
    // Vizela Living Center
    "vlc.badge": "Brevemente em Vizela",
    "vlc.manifesto.title": "Apartamentos diferenciados para quem exige mais com ADN de moradia",
    "vlc.manifesto.lead": "Desenvolvido para quem reconhece que a verdadeira qualidade se paga acima da média e recusa o convencional...",
    "vlc.manifesto.readMore": "Ler mais",
    // Especificações (8 Cards)
    "vlc.spec1.title": "Tipologias T1, T2 e T3",
    "vlc.spec1.desc": "Tipologias desenhadas a rigor, mantendo uma perfeita separação entre as zonas íntimas e as zonas sociais.",
    "vlc.spec2.title": "Lojas",
    "vlc.spec2.desc": "Espaços comerciais amplos, ideais para serviços, escritórios ou retalho de prestígio no R/C.",
    "vlc.spec3.title": "Duas Frentes Opostas/Paralelas",
    "vlc.spec3.desc": "Frações com pelo menos 2 frentes, garantindo excelente exposição solar e luminosidade natural em todas as divisões.",
    "vlc.spec4.title": "100% Suites",
    "vlc.spec4.desc": "Todos os quartos são suites, assegurando privacidade total para toda a família.",
    "vlc.spec5.title": "WC Visitas",
    "vlc.spec5.desc": "WC de serviço, essencial para manter a privacidade e a separação absoluta entre o espaço social e a zona íntima.",
    "vlc.spec6.title": "Varandas e Terraços",
    "vlc.spec6.desc": "Presentes nas duas frentes e pensados para prolongar o espaço de habitação de forma fluida para o exterior.",
    "vlc.spec7.title": "Pré-Instalação SPA",
    "vlc.spec7.desc": "Pré-instalação de SPA, ideal para momentos de lazer e bem-estar no seu lar.",
    "vlc.spec8.title": "Box de Garagem",
    "vlc.spec8.desc": "Box para garantir máxima segurança ao seu carro e espaço autónomo para arrumação.",
    // Localização
    "vlc.loc.title": "Localização Central e Conectividade Excecional",
    "vlc.loc.text": "Vizela está no centro de tudo, posicionada estrategicamente a cerca de <strong>10 km de distâncias-chave de cidades envolventes como Guimarães e Felgueiras</strong>, com excelentes acessos.",
    "vlc.loc.b1": "<strong>À porta de casa:</strong> Paragem de autocarro existente de ambos os lados da estrada.",
    "vlc.loc.b2": "<strong>Sugestão de Lazer Pedonal:</strong> Acesso rápido a pé aos passadiços e ao campo de futebol de Santa Eulália.",
    "vlc.loc.b3": "<strong>Sugestão de Deslocação de Carro:</strong> Poucos minutos até às superfícies comerciais de referência, ao Parque da Cidade e às Termas no centro de Vizela.",
    // Nidus Ars
    "vlc.author.title": "Arquitetura & Rigor por Nidus Ars",
    "vlc.author.btn": "Ver Site",
    "vlc.author.desc": "Assinado pelo prestigiado gabinete <strong>Nidus Ars</strong> — sob a direção técnica e supervisão do arquiteto vizelense <strong>Filipe Costa</strong> — o projeto traz a garantia de uma assinatura de autor com mais de 20 anos de provas dadas acumuladas pelo gabinete e pela sua equipa de colaboradores. A solidez e o prestígio deste gabinete refletem-se em intervenções urbanas de referência na cidade, destacando-se a conceção do grande projeto de requalificação da emblemática Praça da República e Jardim Manuel Faria, desenvolvido em articulação com a Câmara Municipal de Vizela.",
    // Formulário VIP
    "vip.pill": "ACESSO PRIORITÁRIO",
    "vip.formTitle": "Assegure a sua Prioridade na Escolha de Fração",
    "vip.formLead": "O acesso VIP dá-lhe a vantagem competitiva de obter o <strong>acesso antecipado à 1ª informação oficial sobre as plantas</strong> antes do lançamento público.",
    "vip.field.name": "Nome Completo *",
    "vip.field.namePlaceholder": "O seu nome",
    "vip.field.email": "E-mail *",
    "vip.field.emailPlaceholder": "nome@exemplo.com",
    "vip.field.phone": "Contacto Telefónico",
    "vip.field.phonePlaceholder": "O seu telefone",
    "vip.field.profile": "Perfil de Interesses *",
    "vip.field.profilePlaceholder": "Selecione o seu perfil",
    "vip.field.profilePart": "Particular / Consumidor Final",
    "vip.field.profileInv": "Investidor / Empresário",
    "vip.field.type": "Tipologia / Imóvel Pretendido *",
    "vip.field.typePlaceholder": "Selecione a opção",
    "vip.field.typeT1": "Habitação T1",
    "vip.field.typeT2": "Habitação T2",
    "vip.field.typeT3": "Habitação T3",
    "vip.field.typeLoja": "Loja / Espaço Comercial (≥ 100 m²)",
    "vip.field.typeMulti": "Múltiplas Frações / Bloco de Investimento",
    "vip.btn": "GARANTIR ACESSO ANTECIPADO",
    "vip.fallback.text": "Abertura do cliente de e-mail iniciada.",
    "vip.fallback.noApp": "Não abriu a sua aplicação de e-mail?",
    "vip.fallback.link": "Clique aqui para enviar via Gmail no browser.",
    // Contactos
    "contacts.title": "CONTACTOS",
    "contacts.subtitle": "Estamos ao seu dispor para apresentar os detalhes dos nossos projetos, esclarecer dúvidas e apresentar oportunidades exclusivas de investimento.",
    "contacts.emailLabel": "E-mail Geral",
    "contacts.locLabel": "Localização",
    "contacts.locValue": "Vizela, Portugal",
    // Footer
    "footer.copyright": "© 2026 Barbosas Prime Promotora Imobiliária Lda. Todos os direitos reservados.",
    // Modais
    "modal.manifesto.title": "Apartamentos diferenciados para quem exige mais - com ADN de moradia - num estilo prático e seguro",
    "modal.manifesto.body": "Desenvolvido para quem reconhece que a verdadeira qualidade se paga acima da média e recusa o convencional. O Vizela Living Center nasce para preencher uma lacuna no mercado imobiliário: imóveis de prestígio para quem exige excelência construtiva, conforto absoluto e valorização a longo prazo, apostando numa relação preço-qualidade incomparável para quem tem liquidez e não encontra produto à altura das suas exigências.",
    "modal.pyramid.title": "A Nobreza do \"Bem Fazer\"",
    "modal.pyramid.body": "O \"bem fazer\" é uma decisão ética. É recusar soluções construtivas baratas ou temporárias. Assim como os arquitetos da antiguidade escolhiam a pedra calcária e o granito para atravessar eras, a Barbosas Prime foca-se nas melhores soluções contemporâneas: 100% quartos em suite, WC Visitas, Box de garagem, Varandas e Terraços, Pré-instalação SPA, sem esquecer os acabamentos de qualidade.",
    "modal.understood": "Entendido",
    // Validação Form
    "val.name": "Por favor, indique o seu Nome Completo.",
    "val.email": "Por favor, indique um endereço de E-mail válido (ex: nome@exemplo.com).",
    "val.profile": "Por favor, selecione o seu perfil de interesses.",
    "val.type": "Por favor, selecione a tipologia pretendida.",
    "val.success": "Pedido processado com sucesso! A preparar envio de mensagem...",
  },

  en: {
    langName: "English",
    langCode: "EN",
    langFlag: "🇬🇧",
    "nav.inicio": "Home",
    "nav.modelo": "The Model",
    "nav.vlc": "Vizela Living Center",
    "nav.contactos": "Contacts",
    "nav.pyramid": "Why the Pyramid",
    "nav.pyramidStory": "The Nobility of \"Well-Done Craft\"",
    "nav.openMenu": "Open Menu",
    "nav.closeMenu": "Close Menu",
    "popover.heading": "Why the pyramid",
    "popover.body": "We chose our logo in deliberate tribute to the master builders and mathematicians of Ancient Egypt. The pyramids have stood intact for over four millennia because they were erected on an immutable premise: the absolute rigor of geometric calculation and the art of fine craftsmanship.",
    "popover.action": "The Nobility of Well-Done Craft",
    "hero.title": "DESIGNING THE FUTURE WITH THE<br />EXPERIENCE OF THE PAST",
    "hero.lead": "At Barbosas Prime, we bring together our brokerage and rehabilitation expertise to envision unique concepts, selecting premier studios to turn them into reality.",
    "hero.cta": "Discover Vizela Living Center",
    "modelo.title": "OUR MODEL",
    "modelo.subtitle": "Inspired by the enduring quality of past masterworks, we apply uncompromising rigor to every construction phase in the present.",
    "modelo.card1.title": "Designed for the User",
    "modelo.card1.desc": "We harness our brokerage and rehabilitation experience to craft modern, functional layouts. We prioritize genuine comfort (such as private en-suite bathrooms for every bedroom and closed garages), tailoring every square meter to high-end market demands.",
    "modelo.card2.title": "Future Vision & Prestige",
    "modelo.card2.desc": "We do not build for quick profit. We demand architectural solutions that ensure maximum privacy and well-being, building a reference brand where every resident takes pride in living in a Barbosas Prime property.",
    "modelo.card3.title": "Oversight & Commercialization",
    "modelo.card3.desc": "We guarantee construction rigor through independent external supervision led by a veteran engineer. For sales, we partner in deep trust with prominent local market agents whose reputation ensures transparent and proper execution.",
    "vlc.badge": "Coming Soon to Vizela",
    "vlc.manifesto.title": "Distinctive apartments for discerning buyers — with the DNA of a private villa",
    "vlc.manifesto.lead": "Designed for those who recognize that true quality commands a fair premium and refuse the conventional...",
    "vlc.manifesto.readMore": "Read more",
    "vlc.spec1.title": "1, 2 and 3 Bedroom Units",
    "vlc.spec1.desc": "Precision-engineered layouts maintaining a clean separation between private quarters and social entertaining areas.",
    "vlc.spec2.title": "Commercial Units",
    "vlc.spec2.desc": "Spacious ground-floor retail spaces, ideal for premium services, offices, or boutique businesses.",
    "vlc.spec3.title": "Two Opposing/Parallel Fronts",
    "vlc.spec3.desc": "Units with dual exposures, guaranteeing exceptional natural light and optimal sun exposure throughout the day.",
    "vlc.spec4.title": "100% En-Suite Bedrooms",
    "vlc.spec4.desc": "Every bedroom features its own private bathroom, ensuring uncompromising privacy for the entire household.",
    "vlc.spec5.title": "Guest Powder Room",
    "vlc.spec5.desc": "A dedicated powder room preserving complete privacy between social zones and personal living areas.",
    "vlc.spec6.title": "Balconies & Terraces",
    "vlc.spec6.desc": "Extended across both facades, fluidly blending indoor elegance with outdoor relaxation.",
    "vlc.spec7.title": "SPA Pre-Installation",
    "vlc.spec7.desc": "Pre-installed infrastructure for a private hot tub/spa, perfect for daily relaxation and wellness.",
    "vlc.spec8.title": "Private Closed Garage Box",
    "vlc.spec8.desc": "Enclosed private box ensuring maximum vehicle security alongside dedicated autonomous storage space.",
    "vlc.loc.title": "Central Location & Exceptional Connectivity",
    "vlc.loc.text": "Vizela is at the crossroads of northern Portugal, strategically positioned roughly <strong>10 km from key cities including Guimarães and Felgueiras</strong>, with rapid highway access.",
    "vlc.loc.b1": "<strong>At your doorstep:</strong> Bus stops on both sides of the avenue.",
    "vlc.loc.b2": "<strong>Walking Leisure:</strong> Direct walking access to pedestrian riverside boardwalks and sports complexes.",
    "vlc.loc.b3": "<strong>By Car:</strong> Just minutes away from major supermarkets, the Municipal Park, and the historic Thermal Spas in downtown Vizela.",
    "vlc.author.title": "Architecture & Rigor by Nidus Ars",
    "vlc.author.btn": "Visit Website",
    "vlc.author.desc": "Penned by the renowned studio <strong>Nidus Ars</strong> — under the technical leadership of architect <strong>Filipe Costa</strong> — the project carries over 20 years of proven architectural mastery. Their reputation is stamped on premier urban landmarks, notably the prestigious revitalization of Vizela's iconic Republic Square and Manuel Faria Gardens.",
    "vip.pill": "PRIORITY ACCESS",
    "vip.formTitle": "Secure Your Priority in Unit Selection",
    "vip.formLead": "VIP access grants you the competitive advantage of <strong>early access to official floor plans</strong> ahead of the public release.",
    "vip.field.name": "Full Name *",
    "vip.field.namePlaceholder": "Your name",
    "vip.field.email": "Email Address *",
    "vip.field.emailPlaceholder": "name@example.com",
    "vip.field.phone": "Phone Number",
    "vip.field.phonePlaceholder": "Your phone",
    "vip.field.profile": "Interest Profile *",
    "vip.field.profilePlaceholder": "Select your profile",
    "vip.field.profilePart": "Private Buyer / End User",
    "vip.field.profileInv": "Investor / Business Owner",
    "vip.field.type": "Preferred Property Type *",
    "vip.field.typePlaceholder": "Select option",
    "vip.field.typeT1": "1-Bedroom Apartment (T1)",
    "vip.field.typeT2": "2-Bedroom Apartment (T2)",
    "vip.field.typeT3": "3-Bedroom Apartment (T3)",
    "vip.field.typeLoja": "Commercial Store (≥ 100 m²)",
    "vip.field.typeMulti": "Multiple Units / Investment Block",
    "vip.btn": "SECURE EARLY VIP ACCESS",
    "vip.fallback.text": "Email client launch initiated.",
    "vip.fallback.noApp": "Email app didn't open?",
    "vip.fallback.link": "Click here to send via browser Gmail.",
    "contacts.title": "CONTACTS",
    "contacts.subtitle": "We are at your disposal to share architectural details, clarify questions, and present exclusive investment opportunities.",
    "contacts.emailLabel": "General Email",
    "contacts.locLabel": "Location",
    "contacts.locValue": "Vizela, Portugal",
    "footer.copyright": "© 2026 Barbosas Prime Promotora Imobiliária Lda. All rights reserved.",
    "modal.manifesto.title": "Distinctive apartments for demanding clients — with the DNA of a private villa",
    "modal.manifesto.body": "Crafted for those who recognize that genuine quality commands a fair premium and reject the ordinary. Vizela Living Center bridges a gap in the property market: prestigious residences for buyers who seek structural excellence, absolute comfort, and long-term capital preservation.",
    "modal.pyramid.title": "The Nobility of \"Well-Done Craft\"",
    "modal.pyramid.body": "Fine craftsmanship is an ethical choice. It means refusing cheap or temporary fixes. Just as ancient architects selected limestone and granite to endure across millennia, Barbosas Prime focuses on contemporary enduring choices: 100% en-suite bedrooms, guest restrooms, closed garage boxes, terraces, and spa pre-installation.",
    "modal.understood": "Understood",
    "val.name": "Please enter your Full Name.",
    "val.email": "Please enter a valid Email Address.",
    "val.profile": "Please select your profile.",
    "val.type": "Please select your preferred property type.",
    "val.success": "Request processed successfully! Preparing email...",
  },

  fr: {
    langName: "Français",
    langCode: "FR",
    langFlag: "🇫🇷",
    "nav.inicio": "Accueil",
    "nav.modelo": "Le Modèle",
    "nav.vlc": "Vizela Living Center",
    "nav.contactos": "Contacts",
    "nav.pyramid": "Pourquoi la Pyramide",
    "nav.pyramidStory": "La Noblesse du « Bien Faire »",
    "nav.openMenu": "Ouvrir Menu",
    "nav.closeMenu": "Fermer Menu",
    "popover.heading": "Pourquoi la pyramide",
    "popover.body": "Nous avons choisi notre logotype en hommage délibéré aux maîtres bâtisseurs et mathématiciens de l'Égypte antique. Les pyramides demeurent intactes depuis plus de quatre millénaires parce qu'elles reposent sur un principe immuable : la rigueur absolue du calcul géométrique et l'art du bel ouvrage.",
    "popover.action": "La Noblesse du Bien Faire",
    "hero.title": "NOUS CONCEVONS L’AVENIR AVEC<br />L’EXPÉRIENCE DU PASSÉ",
    "hero.lead": "Chez Barbosas Prime, nous combinons notre savoir-faire en médiation et en réhabilitation pour imaginer des concepts uniques, en sélectionnant des cabinets d'architecture de premier plan pour les concrétiser.",
    "hero.cta": "Découvrir Vizela Living Center",
    "modelo.title": "NOTRE MODÈLE",
    "modelo.subtitle": "Inspirés par la pérennité des grandes constructions historiques, nous appliquons une rigueur absolue à chaque phase de construction.",
    "modelo.card1.title": "Conception Axée sur l’Utilisateur",
    "modelo.card1.desc": "Nous mettons à profit notre solide expérience pour concevoir des plans modernes et fonctionnels. Nous privilégions le confort réel (comme une salle de bain privée par chambre et des garages fermés), en adaptant chaque mètre carré aux exigences du marché de prestige.",
    "modelo.card2.title": "Vision d'Avenir et Prestige",
    "modelo.card2.desc": "Nous ne bâtissons pas dans l'optique d'un profit éphémère. Nous exigeons des cabinets d'architecture des solutions garantissant intimité maximale et bien-être, pour forger une marque de référence où chaque client est fier de vivre dans un bien Barbosas Prime.",
    "modelo.card3.title": "Supervision et Commercialisation",
    "modelo.card3.desc": "Nous garantissons la rigueur des chantiers grâce à une supervision externe indépendante dirigée par un ingénieur chevronné. Pour la vente, nous collaborons avec des agents réputés dont la notoriété assure une transaction en toute transparence.",
    "vlc.badge": "Bientôt à Vizela",
    "vlc.manifesto.title": "Des appartements d'exception pour les plus exigeants — avec l'ADN d'une villa",
    "vlc.manifesto.lead": "Conçu pour ceux qui savent que la véritable qualité a un prix et refusent le conventionnel...",
    "vlc.manifesto.readMore": "En savoir plus",
    "vlc.spec1.title": "Typologies T1, T2 et T3",
    "vlc.spec1.desc": "Agencements dessinés avec rigueur, assurant une séparation harmonieuse entre l'espace nuit et les pièces de réception.",
    "vlc.spec2.title": "Boutiques Commerciales",
    "vlc.spec2.desc": "De spacieux espaces commerciaux en RDC, idéaux pour professions libérales, bureaux ou boutiques de prestige.",
    "vlc.spec3.title": "Deux Façades Parallèles/Opposées",
    "vlc.spec3.desc": "Logements traversants offrant au moins 2 façades, garantissant une luminosité naturelle et un ensoleillement optimal.",
    "vlc.spec4.title": "100% Suites Privatives",
    "vlc.spec4.desc": "Toutes les chambres sont des suites dotées de leur salle d'eau, assurant une parfaite intimité à chaque membre de la famille.",
    "vlc.spec5.title": "WC Visiteurs",
    "vlc.spec5.desc": "WC invités indépendant, essentiel pour préserver l'intimité familiale des espaces de réception.",
    "vlc.spec6.title": "Balcons et Terrasses",
    "vlc.spec6.desc": "Déployés sur les deux façades pour prolonger avec fluidité les pièces de vie vers l'extérieur.",
    "vlc.spec7.title": "Pré-Installation SPA",
    "vlc.spec7.desc": "Pré-équipement SPA prévu pour accueillir un bain à remous privatif propice à la détente quotidienne.",
    "vlc.spec8.title": "Box de Garage Fermé",
    "vlc.spec8.desc": "Box fermé individuel pour sécuriser vos véhicules et offrir un espace de rangement indépendant.",
    "vlc.loc.title": "Emplacement Central & Connectivité Exceptionnelle",
    "vlc.loc.text": "Vizela se situe au cœur du Nord du Portugal, stratégiquement implantée à <strong>environ 10 km de pôles majeurs tels que Guimarães et Felgueiras</strong>, avec d'excellents axes routiers.",
    "vlc.loc.b1": "<strong>Au pas de votre porte :</strong> Arrêt de bus disponible des deux côtés de l'avenue.",
    "vlc.loc.b2": "<strong>Loisirs à pied :</strong> Accès direct aux passerelles piétonnes en bord de rivière et au complexe sportif.",
    "vlc.loc.b3": "<strong>En voiture :</strong> À quelques minutes des zones commerciales, du grand Parc de la Ville et des célèbres Thermes de Vizela.",
    "vlc.author.title": "Architecture & Rigueur par Nidus Ars",
    "vlc.author.btn": "Consulter le Site",
    "vlc.author.desc": "Signé par le cabinet réputé <strong>Nidus Ars</strong> — sous la direction technique de l'architecte <strong>Filipe Costa</strong> — le projet bénéficie de plus de 20 ans d'expertise reconnue. Leur empreinte marque la ville, illustrée par la requalification emblématique de la Praça da República et du Jardin Manuel Faria en synergie avec la Municipalité de Vizela.",
    "vip.pill": "ACCÈS PRIORITAIRE",
    "vip.formTitle": "Garantissez Votre Priorité de Choix",
    "vip.formLead": "L'accès VIP vous offre l'avantage stratégique de recevoir en <strong>avant-première les plans officiels</strong> avant le lancement grand public.",
    "vip.field.name": "Nom Complet *",
    "vip.field.namePlaceholder": "Votre nom",
    "vip.field.email": "Adresse E-mail *",
    "vip.field.emailPlaceholder": "nom@exemple.com",
    "vip.field.phone": "Téléphone",
    "vip.field.phonePlaceholder": "Votre numéro",
    "vip.field.profile": "Profil d'Intérêt *",
    "vip.field.profilePlaceholder": "Sélectionnez votre profil",
    "vip.field.profilePart": "Particulier / Résident Final",
    "vip.field.profileInv": "Investisseur / Entreprise",
    "vip.field.type": "Bien Recherché *",
    "vip.field.typePlaceholder": "Sélectionnez une option",
    "vip.field.typeT1": "Appartement T1 (1 Chambre)",
    "vip.field.typeT2": "Appartement T2 (2 Chambres)",
    "vip.field.typeT3": "Appartement T3 (3 Chambres)",
    "vip.field.typeLoja": "Boutique Commerciale (≥ 100 m²)",
    "vip.field.typeMulti": "Plusieurs Lots / Bloc d'Investissement",
    "vip.btn": "ASSURER MON ACCÈS VIP",
    "vip.fallback.text": "Ouverture de votre messagerie en cours.",
    "vip.fallback.noApp": "Votre messagerie ne s'est pas ouverte ?",
    "vip.fallback.link": "Cliquez ici pour envoyer via Gmail sur navigateur.",
    "contacts.title": "CONTACTS",
    "contacts.subtitle": "Nous sommes à votre entière écoute pour détailler le projet, répondre à vos questions et présenter nos opportunités exclusives.",
    "contacts.emailLabel": "E-mail Général",
    "contacts.locLabel": "Localisation",
    "contacts.locValue": "Vizela, Portugal",
    "footer.copyright": "© 2026 Barbosas Prime Promotora Imobiliária Lda. Tous droits réservés.",
    "modal.manifesto.title": "Des appartements d'exception pour exigences élevées — avec l'ADN d'une villa",
    "modal.manifesto.body": "Créé pour ceux qui savent que l'excellence de construction a une valeur et refusent la standardisation. Le Vizela Living Center répond à une forte attente : des résidences de prestige pour les acquéreurs en quête de longévité, de confort et d'une valorisation pérenne.",
    "modal.pyramid.title": "La Noblesse du « Bien Faire »",
    "modal.pyramid.body": "Le bien faire est une exigence éthique. C'est refuser les raccourcis faciles. Tout comme les architectes de l'Antiquité taillaient le granit pour traverser les siècles, Barbosas Prime s'engage sur des standards durables : 100% de suites privatives, box fermé, vastes terrasses et pré-équipement SPA.",
    "modal.understood": "Compris",
    "val.name": "Veuillez renseigner votre Nom Complet.",
    "val.email": "Veuillez indiquer une adresse E-mail valide.",
    "val.profile": "Veuillez sélectionner votre profil.",
    "val.type": "Veuillez choisir la typologie souhaitée.",
    "val.success": "Demande enregistrée avec succès ! Préparation de l'envoi...",
  },

  es: {
    langName: "Español",
    langCode: "ES",
    langFlag: "🇪🇸",
    "nav.inicio": "Inicio",
    "nav.modelo": "El Modelo",
    "nav.vlc": "Vizela Living Center",
    "nav.contactos": "Contactos",
    "nav.pyramid": "Por qué la Pirámide",
    "nav.pyramidStory": "La Nobleza del \"Bien Hacer\"",
    "nav.openMenu": "Abrir Menú",
    "nav.closeMenu": "Cerrar Menú",
    "popover.heading": "Por qué la pirámide",
    "popover.body": "Elegimos nuestro logotipo en homenaje deliberado a los maestros constructores y matemáticos del Antiguo Egipto. Las pirámides permanecen intactas desde hace más de cuatro milenios porque se erigieron bajo una premisa inmutable: el rigor absoluto del cálculo geométrico y el arte del bien hacer.",
    "popover.action": "La Nobleza del Bien Hacer",
    "hero.title": "PROYECTAMOS EL FUTURO CON LA<br />EXPERIENCIA DEL PASADO",
    "hero.lead": "En Barbosas Prime, unimos nuestra experiencia en intermediación y rehabilitación para idear conceptos únicos, seleccionando prestigiosos estudios para hacerlos realidad.",
    "hero.cta": "Conocer Vizela Living Center",
    "modelo.title": "NUESTRO MODELO",
    "modelo.subtitle": "Inspirados en la perennidad de las grandes construcciones del pasado, aplicamos un rigor absoluto en cada fase constructiva del presente.",
    "modelo.card1.title": "Concepción para el Usuario",
    "modelo.card1.desc": "Aprovechamos nuestra experiencia en el sector para diseñar plantas modernas y funcionales. Priorizamos el confort real (baño privado en cada dormitorio y garajes cerrados en box), adaptando cada metro cuadrado a lo que busca el mercado de calidad.",
    "modelo.card2.title": "Visión de Futuro y Prestigio",
    "modelo.card2.desc": "No construimos para el beneficio rápido. Exigimos a los estudios de arquitectura soluciones que garanticen la máxima privacidad y bienestar, consolidando una marca de referencia donde cada cliente sienta orgullo de vivir en un inmueble Barbosas Prime.",
    "modelo.card3.title": "Fiscalización y Comercialización",
    "modelo.card3.desc": "Aseguramos el rigor técnico mediante una fiscalización externa independiente liderada por un ingeniero veterano. Para la comercialización, confiamos en agentes expertos del mercado local, cuyo prestigio avala una venta impecable.",
    "vlc.badge": "Próximamente en Vizela",
    "vlc.manifesto.title": "Apartamentos diferenciados para quienes exigen más — con ADN de chalet",
    "vlc.manifesto.lead": "Desarrollado para quienes reconocen que la auténtica calidad tiene un valor y rechazan lo convencional...",
    "vlc.manifesto.readMore": "Leer más",
    "vlc.spec1.title": "Tipologías T1, T2 y T3",
    "vlc.spec1.desc": "Distribuciones trazadas con precisión, garantizando una separación perfecta entre la zona de descanso y la social.",
    "vlc.spec2.title": "Locales Comerciales",
    "vlc.spec2.desc": "Espacios comerciales diáfanos en planta baja, ideales para despachos profesionales, servicios o comercio selecto.",
    "vlc.spec3.title": "Dos Fachadas Paralelas/Opuestas",
    "vlc.spec3.desc": "Viviendas con al menos 2 fachadas, garantizando abundante luz natural y ventilación cruzada óptima.",
    "vlc.spec4.title": "100% Suites",
    "vlc.spec4.desc": "Todos los dormitorios son suites con baño propio, asegurando total privacidad para cada habitante.",
    "vlc.spec5.title": "Aseo de Cortesía",
    "vlc.spec5.desc": "Aseo de servicio independiente para visitas, preservando la intimidad de las estancias privadas.",
    "vlc.spec6.title": "Balcones y Terrazas",
    "vlc.spec6.desc": "Presentes en ambas fachadas para prolongar las zonas de estar de forma fluida hacia el exterior.",
    "vlc.spec7.title": "Preinstalación de SPA",
    "vlc.spec7.desc": "Preinstalación para bañera de hidromasaje/SPA privado, ideal para momentos de bienestar en casa.",
    "vlc.spec8.title": "Box de Garaje Cerrado",
    "vlc.spec8.desc": "Cochera cerrada tipo box para garantizar máxima seguridad para su vehículo y espacio de almacenamiento adicional.",
    "vlc.loc.title": "Ubicación Central y Conectividad Excepcional",
    "vlc.loc.text": "Vizela se encuentra en una posición privilegiada en el norte de Portugal, a tan solo <strong>10 km de ciudades clave como Guimarães y Felgueiras</strong>, con accesos directos por autovía.",
    "vlc.loc.b1": "<strong>A pie de calle:</strong> Parada de autobús disponible a ambos lados de la calzada.",
    "vlc.loc.b2": "<strong>Paseo y Naturaleza:</strong> Acceso peatonal inmediato a las pasarelas fluviales y al campo de fútbol.",
    "vlc.loc.b3": "<strong>En Coche:</strong> A escasos minutos de zonas comerciales, del Parque de la Ciudad y del célebre Balneario Termal de Vizela.",
    "vlc.author.title": "Arquitectura y Rigor por Nidus Ars",
    "vlc.author.btn": "Ver Sitio Web",
    "vlc.author.desc": "Firmado por el prestigioso estudio <strong>Nidus Ars</strong> — bajo la dirección del arquitecto <strong>Filipe Costa</strong> — el proyecto cuenta con el respaldo de más de 20 años de reconocida trayectoria. Su prestigio se refleja en obras de referencia como la remodelación de la emblemática Praça da República y Jardín Manuel Faria junto al Ayuntamiento de Vizela.",
    "vip.pill": "ACCESO PRIORITARIO",
    "vip.formTitle": "Asegure su Prioridad en la Elección de la Fracción",
    "vip.formLead": "El acceso VIP le otorga la ventaja competitiva de conocer de forma <strong>anticipada los planos oficiales</strong> antes del lanzamiento público.",
    "vip.field.name": "Nombre Completo *",
    "vip.field.namePlaceholder": "Su nombre",
    "vip.field.email": "Correo Electrónico *",
    "vip.field.emailPlaceholder": "nombre@ejemplo.com",
    "vip.field.phone": "Teléfono de Contacto",
    "vip.field.phonePlaceholder": "Su teléfono",
    "vip.field.profile": "Perfil de Interés *",
    "vip.field.profilePlaceholder": "Seleccione su perfil",
    "vip.field.profilePart": "Particular / Comprador Final",
    "vip.field.profileInv": "Inversor / Empresa",
    "vip.field.type": "Tipología Pretendida *",
    "vip.field.typePlaceholder": "Seleccione una opción",
    "vip.field.typeT1": "Vivienda T1 (1 Dormitorio)",
    "vip.field.typeT2": "Vivienda T2 (2 Dormitorios)",
    "vip.field.typeT3": "Vivienda T3 (3 Dormitorios)",
    "vip.field.typeLoja": "Local Comercial (≥ 100 m²)",
    "vip.field.typeMulti": "Múltiples Fracciones / Bloque Inversión",
    "vip.btn": "GARANTIZAR ACCESO VIP",
    "vip.fallback.text": "Iniciando apertura de su gestor de correo.",
    "vip.fallback.noApp": "¿No se abrió su cliente de correo?",
    "vip.fallback.link": "Haga clic aquí para enviar mediante Gmail en el navegador.",
    "contacts.title": "CONTACTOS",
    "contacts.subtitle": "Estamos a su entera disposición para facilitarle información detallada y presentarle oportunidades exclusivas de inversión.",
    "contacts.emailLabel": "Correo General",
    "contacts.locLabel": "Ubicación",
    "contacts.locValue": "Vizela, Portugal",
    "footer.copyright": "© 2026 Barbosas Prime Promotora Imobiliária Lda. Todos los derechos reservados.",
    "modal.manifesto.title": "Viviendas singulares para clientes exigentes — con ADN de chalet",
    "modal.manifesto.body": "Diseñado para quienes entienden que la calidad superior tiene su valor y renuncian a lo estándar. Vizela Living Center responde a la demanda de inmuebles de prestigio con sólida durabilidad, confort y revalorización garantizada.",
    "modal.pyramid.title": "La Nobleza del \"Bien Hacer\"",
    "modal.pyramid.body": "El bien hacer es una convicción ética. Supone rechazar soluciones constructivas baratas. Al igual que los maestros del pasado seleccionaban granito para perdurar milenios, Barbosas Prime apuesta por 100% suites, garajes cerrados, terrazas y preinstalación de SPA.",
    "modal.understood": "Entendido",
    "val.name": "Por favor, introduzca su Nombre Completo.",
    "val.email": "Por favor, introduzca un Correo Electrónico válido.",
    "val.profile": "Por favor, seleccione su perfil.",
    "val.type": "Por favor, elija la tipología deseada.",
    "val.success": "¡Solicitud procesada con éxito! Preparando envío...",
  },
};

/**
 * 2. CONFIGURAÇÕES E CONSTANTES
 */
const CONFIG = {
  RECIPIENT_EMAIL: "geral@barbosasprime.com",
  BREAKPOINT_MD: 768,
  HEADER_HEIGHT_DESKTOP: 80,
  HEADER_HEIGHT_MOBILE: 70,
  DEFAULT_LANG: "pt",
  SUPPORTED_LANGS: ["pt", "en", "fr", "es"],
  STORAGE_KEY: "barbosas_prime_lang",
};

/**
 * 3. MÓDULO I18N (GERENCIADOR DE INTERNACIONALIZAÇÃO)
 * Princípio da Responsabilidade Única (SRP):
 * - Gere a língua ativa
 * - Aplica traduções no DOM (innerHTML, texto e placeholders)
 * - Persiste a escolha em localStorage e URL (?lang=)
 * - Emite o evento 'langchange' para outros módulos reagirem
 */
class I18nManager {
  constructor() {
    this.currentLang = this.detectInitialLanguage();
    this.desktopToggleBtn = document.getElementById("langToggleBtn");
    this.desktopDropdown = document.getElementById("langDropdown");
    this.mobileLangOptions = document.querySelectorAll(".mobile-lang-btn");
  }

  init() {
    this.applyLanguage(this.currentLang, false);
    this.bindEvents();
  }

  detectInitialLanguage() {
    // 1. Query param no URL (?lang=fr)
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang")?.toLowerCase();
      if (urlLang && CONFIG.SUPPORTED_LANGS.includes(urlLang)) {
        return urlLang;
      }
    } catch (e) {
      console.warn("[I18n] Erro ao ler query params:", e);
    }

    // 2. LocalStorage
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEY)?.toLowerCase();
      if (saved && CONFIG.SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn("[I18n] Erro ao aceder ao localStorage:", e);
    }

    // 3. Idioma do Navegador
    try {
      const browserLang = (navigator.language || navigator.userLanguage || "").substring(0, 2).toLowerCase();
      if (CONFIG.SUPPORTED_LANGS.includes(browserLang)) {
        return browserLang;
      }
    } catch (e) {
      console.warn("[I18n] Erro ao detetar idioma do navegador:", e);
    }

    return CONFIG.DEFAULT_LANG;
  }

  getText(key, lang = this.currentLang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.DEFAULT_LANG];
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback seguro para Português se faltar no idioma ativo
    const fallbackDict = TRANSLATIONS[CONFIG.DEFAULT_LANG];
    if (fallbackDict && fallbackDict[key] !== undefined) {
      return fallbackDict[key];
    }
    return key;
  }

  applyLanguage(lang, updateUrl = true) {
    if (!CONFIG.SUPPORTED_LANGS.includes(lang)) return;

    this.currentLang = lang;
    document.documentElement.lang = lang;

    // 1. Atualizar todos os elementos com [data-i18n]
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = this.getText(key, lang);
      if (translation) {
        // Se contiver tags como <br /> ou <strong>, usa innerHTML
        if (translation.includes("<") && translation.includes(">")) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // 2. Atualizar placeholders com [data-i18n-placeholder]
    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderElements.forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = this.getText(key, lang);
      if (translation) {
        el.setAttribute("placeholder", translation);
      }
    });

    // 3. Atualizar aria-labels com [data-i18n-aria]
    const ariaElements = document.querySelectorAll("[data-i18n-aria]");
    ariaElements.forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const translation = this.getText(key, lang);
      if (translation) {
        el.setAttribute("aria-label", translation);
      }
    });

    // 4. Atualizar o aspeto visual do botão seletor de idiomas
    this.updateSelectorUI(lang);

    // 5. Persistência
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, lang);
      if (updateUrl && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.replaceState({}, "", url.toString());
      }
    } catch (e) {
      console.warn("[I18n] Não foi possível persistir o idioma:", e);
    }

    // 6. Notificar outros módulos via CustomEvent
    document.dispatchEvent(
      new CustomEvent("barbosas:langchange", {
        detail: { lang, i18n: this },
      })
    );
  }

  updateSelectorUI(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.DEFAULT_LANG];

    // Atualizar botão desktop
    if (this.desktopToggleBtn) {
      const flagSpan = this.desktopToggleBtn.querySelector(".lang-flag-current");
      const codeSpan = this.desktopToggleBtn.querySelector(".lang-code-current");
      if (flagSpan) flagSpan.textContent = dict.langFlag;
      if (codeSpan) codeSpan.textContent = dict.langCode;
    }

    // Atualizar estado ativo nos itens da dropdown desktop
    const dropdownItems = document.querySelectorAll(".lang-option-btn");
    dropdownItems.forEach((btn) => {
      const targetLang = btn.getAttribute("data-lang");
      if (targetLang === lang) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });

    // Atualizar botões mobile
    this.mobileLangOptions.forEach((btn) => {
      const targetLang = btn.getAttribute("data-lang");
      if (targetLang === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  bindEvents() {
    // Alternar dropdown no desktop
    if (this.desktopToggleBtn && this.desktopDropdown) {
      this.desktopToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });

      // Fechar dropdown ao clicar fora
      document.addEventListener("click", (e) => {
        if (!this.desktopToggleBtn.contains(e.target) && !this.desktopDropdown.contains(e.target)) {
          this.closeDropdown();
        }
      });

      // Fechar com Escape
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeDropdown();
        }
      });
    }

    // Cliques nas opções de idioma (Desktop)
    const options = document.querySelectorAll(".lang-option-btn");
    options.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute("data-lang");
        if (selectedLang) {
          this.applyLanguage(selectedLang, true);
          this.closeDropdown();
        }
      });
    });

    // Cliques nas opções de idioma (Mobile)
    this.mobileLangOptions.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute("data-lang");
        if (selectedLang) {
          this.applyLanguage(selectedLang, true);
        }
      });
    });
  }

  toggleDropdown() {
    if (!this.desktopDropdown) return;
    const isOpen = this.desktopDropdown.classList.contains("is-open");
    if (isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    if (!this.desktopDropdown || !this.desktopToggleBtn) return;
    this.desktopDropdown.classList.add("is-open");
    this.desktopToggleBtn.setAttribute("aria-expanded", "true");
  }

  closeDropdown() {
    if (!this.desktopDropdown || !this.desktopToggleBtn) return;
    this.desktopDropdown.classList.remove("is-open");
    this.desktopToggleBtn.setAttribute("aria-expanded", "false");
  }
}

/**
 * 4. MÓDULO DE NAVEGAÇÃO & HEADER
 */
class NavigationController {
  constructor() {
    this.header = document.querySelector(".site-header");
    this.mobileToggle = document.getElementById("mobileMenuToggle");
    this.mobileDrawer = document.getElementById("mobileNavDrawer");
    this.navLinks = document.querySelectorAll(".nav-link-item, .mobile-nav-link");
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
    if (this.mobileToggle && this.mobileDrawer) {
      this.mobileToggle.addEventListener("click", () => this.toggleMobileMenu());
    }

    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleSmoothScroll(e, link));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= CONFIG.BREAKPOINT_MD && this.isMobileMenuOpen()) {
        this.closeMobileMenu();
      }
    });
  }

  isMobileMenuOpen() {
    return this.mobileDrawer?.classList.contains("open") || false;
  }

  toggleMobileMenu() {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.mobileDrawer || !this.mobileToggle) return;
    this.mobileDrawer.classList.add("open");
    this.mobileToggle.setAttribute("aria-expanded", "true");
    const icon = this.mobileToggle.querySelector("i");
    if (icon) icon.className = "fas fa-times";
  }

  closeMobileMenu() {
    if (!this.mobileDrawer || !this.mobileToggle) return;
    this.mobileDrawer.classList.remove("open");
    this.mobileToggle.setAttribute("aria-expanded", "false");
    const icon = this.mobileToggle.querySelector("i");
    if (icon) icon.className = "fas fa-bars";
  }

  handleSmoothScroll(e, link) {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();
      this.closeMobileMenu();

      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - this.getHeaderHeight();

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  }
}

/**
 * 5. GESTOR DO POPOVER INTERATIVO ("PORQUÊ A PIRÂMIDE")
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
    if (this.triggerBtn && this.popover) {
      this.triggerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.mobileMenuPyramidBtn) {
      this.mobileMenuPyramidBtn.addEventListener("click", () => {
        if (this.navController) {
          this.navController.closeMobileMenu();
        }
        setTimeout(() => this.open(), 120);
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => this.close());
    }

    if (this.actionBtn) {
      this.actionBtn.addEventListener("click", () => this.close());
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    document.addEventListener("click", (e) => {
      if (this.isOpen() && !this.popover.contains(e.target) && !this.triggerBtn?.contains(e.target)) {
        this.close();
      }
    });
  }

  isOpen() {
    return this.popover?.classList.contains("is-open") || false;
  }

  toggle() {
    if (this.isOpen()) this.close();
    else this.open();
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
 * 6. GESTOR DE MODAIS ACESSÍVEIS (WCAG 2.1)
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
    const overlays = document.querySelectorAll(".modal-overlay");
    overlays.forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeModal(overlay);
      });
    });

    const closeButtons = document.querySelectorAll("[data-modal-close]");
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-overlay");
        if (modal) this.closeModal(modal);
      });
    });

    const triggers = document.querySelectorAll("[data-modal-target]");
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.getAttribute("data-modal-target");
        if (modalId) this.openModalById(modalId, trigger);
      });
    });
  }

  openModalById(modalId, triggerElement = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    this.openModal(modal, triggerElement);
  }

  openModal(modal, triggerElement = null) {
    this.previousFocusedElement = triggerElement || document.activeElement;
    this.activeModal = modal;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

    if (this.previousFocusedElement && typeof this.previousFocusedElement.focus === "function") {
      this.previousFocusedElement.focus();
    }
  }
}

/**
 * 7. MÓDULO DO FORMULÁRIO VIP COM TRADUÇÕES DINÂMICAS
 */
class VipFormController {
  constructor(i18nManager) {
    this.i18n = i18nManager;
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
    if (this.phoneInput) {
      this.phoneInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9+\s()-]/g, "");
      });
    }

    if (this.profileSelect && this.multipleUnitsOption) {
      this.profileSelect.addEventListener("change", () => this.handleProfileChange());
    }

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
      return { isValid: false, message: this.i18n.getText("val.name") };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      return { isValid: false, message: this.i18n.getText("val.email") };
    }

    if (!data.profile) {
      return { isValid: false, message: this.i18n.getText("val.profile") };
    }

    if (!data.propertyType) {
      return { isValid: false, message: this.i18n.getText("val.type") };
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

    this.processSubmission(rawData);
  }

  processSubmission(data) {
    const lang = this.i18n.currentLang.toUpperCase();
    const profileLabel = this.profileSelect.options[this.profileSelect.selectedIndex]?.text || data.profile;
    const propertyLabel = this.propertySelect.options[this.propertySelect.selectedIndex]?.text || data.propertyType;

    const emailSubject = `[VIP ACCESS - ${lang}] Pedido de Acesso Antecipado - ${data.name}`;
    const emailBody =
      `Olá Barbosas Prime,\n\n` +
      `Gostaria de solicitar o Acesso Prioritário VIP ao Vizela Living Center.\n\n` +
      `--- DADOS DO CONTACTO ---\n` +
      `• Nome: ${data.name}\n` +
      `• E-mail: ${data.email}\n` +
      `• Telefone: ${data.phone || "Não indicado"}\n` +
      `• Idioma do Site: ${lang}\n` +
      `• Perfil de Interesse: ${profileLabel}\n` +
      `• Tipologia Pretendida: ${propertyLabel}\n\n` +
      `Aguardo o envio das plantas e informações oficiais antes do lançamento público.\n\n` +
      `Com os melhores cumprimentos,\n` +
      `${data.name}`;

    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    const mailtoUrl = `mailto:${CONFIG.RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONFIG.RECIPIENT_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;

    this.showFeedback(this.i18n.getText("val.success"), false);

    if (this.fallbackLink) this.fallbackLink.href = webGmailUrl;
    if (this.fallbackBox) this.fallbackBox.classList.add("visible");
    if (this.submitBtn) this.submitBtn.style.display = "none";

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
 * 8. RESILIÊNCIA E TRATAMENTO DEFENSIVO DE RECURSOS (IMAGENS)
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
        target.src = "images/logos/company-logo-icon_8210f6d0.png";
      }
    }
  },
  true
);

/**
 * 9. INICIALIZAÇÃO DA APLICAÇÃO (BOOTSTRAP)
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    const i18n = new I18nManager();
    i18n.init();

    const navigation = new NavigationController();
    navigation.init();

    const popover = new PopoverController(navigation);
    popover.init();

    const modals = new ModalManager();
    modals.init();

    const vipForm = new VipFormController(i18n);
    vipForm.init();

    console.log(
      `[Barbosas Prime] Sistema multilíngue inicializado com sucesso em Vanilla JS (Idioma ativo: ${i18n.currentLang.toUpperCase()}).`
    );
  } catch (error) {
    console.error("[Barbosas Prime] Erro na inicialização da aplicação:", error);
  }
});
