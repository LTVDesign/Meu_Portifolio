import {
  android,
  arduino,
  backend,
  comptester,
  creator,
  css,
  daytek,
  docker,
  esp32,
  figma,
  getnexo,
  git,
  html,
  javascript,
  kali,
  // Novas tecnologias
  linux,
  microsoft365,
  mobile,
  nodejs,
  python,
  reactjs,
  redux,
  sonicwall,
  sql,
  tailwind,
  threejs,
  typescript,
  ubiquiti,
  vscode,
  web,
  willy,
  windows,
} from '../assets';
import type {
  TExperience,
  TNavLink,
  TProject,
  TService,
  TTechnology,
  TTestimonial,
} from '../types';

export const navLinks: TNavLink[] = [
  {
    id: 'about',
    title: 'Sobre',
  },
  {
    id: 'formacao',
    title: 'Formação',
  },
  {
    id: 'experiencia',
    title: 'Experiência Profissional',
  },
  {
    id: 'cursos',
    title: 'Cursos',
  },
  {
    id: 'projects',
    title: 'Projetos',
  },
  {
    id: 'curriculo',
    title: 'Currículo',
  },
  {
    id: 'doom',
    title: 'DOOM',
  },
  {
    id: 'contact',
    title: 'Contato',
  },
];

const services: TService[] = [
  {
    title: 'Infraestrutura',
    description:
      'Especialista em suporte N2 e redes, com domínio em ambientes Microsoft 365, servidores e infraestrutura física/nuvem',
    icon: web,
  },
  {
    title: 'Cibersegurança',
    description:
      'Focado em defesa digital, proteção de ativos e mitigação de vulnerabilidades, com base sólida em segurança de redes e compliance',
    icon: mobile,
  },
  {
    title: 'IA & Dados',
    description:
      'Desenvolvimento de soluções inteligentes e análise preditiva, utilizando algoritmos para transformar dados em decisões estratégicas',
    icon: backend,
  },
  {
    title: 'Gestão',
    description:
      'Liderança de times através de frameworks ágeis (Scrum) e visão de produto focada na experiência do usuário e entrega de valor',
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  // Sistemas e Infraestrutura
  {
    name: 'Linux',
    icon: linux,
    category: 'Sistemas & Infraestrutura',
  },
  {
    name: 'Windows',
    icon: windows,
    category: 'Sistemas & Infraestrutura',
  },
  {
    name: 'Docker',
    icon: docker,
    category: 'Sistemas & Infraestrutura',
  },
  // Microsoft 365
  {
    name: 'Microsoft 365',
    icon: microsoft365,
    category: 'Sistemas & Infraestrutura',
  },
  // Hardware e Projetos Autorais
  {
    name: 'ESP32',
    icon: esp32,
    category: 'Hardware & IoT',
  },
  {
    name: 'Arduino',
    icon: arduino,
    category: 'Hardware & IoT',
  },
  {
    name: 'Android',
    icon: android,
    category: 'Hardware & IoT',
  },
  // Linguagens e Desenvolvimento
  {
    name: 'Python',
    icon: python,
    category: 'Linguagens & Backend',
  },
  {
    name: 'JavaScript',
    icon: javascript,
    category: 'Linguagens & Backend',
  },
  {
    name: 'HTML5',
    icon: html,
    category: 'Front-end & Design',
  },
  {
    name: 'CSS3',
    icon: css,
    category: 'Front-end & Design',
  },
  {
    name: 'TypeScript',
    icon: typescript,
    category: 'Linguagens & Backend',
  },
  {
    name: 'SQL',
    icon: sql,
    category: 'Linguagens & Backend',
  },
  // Segurança e Redes
  {
    name: 'Kali Linux',
    icon: kali,
    category: 'Segurança & Redes',
  },
  {
    name: 'DrayTek/Redes',
    icon: daytek,
    category: 'Segurança & Redes',
  },
  {
    name: 'Ubiquiti',
    icon: ubiquiti,
    category: 'Segurança & Redes',
  },
  {
    name: 'SonicWall',
    icon: sonicwall,
    category: 'Segurança & Redes',
  },
  // Frameworks e Bibliotecas
  {
    name: 'React',
    icon: reactjs,
    category: 'Front-end & Design',
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
    category: 'Front-end & Design',
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
    category: 'Front-end & Design',
  },
  {
    name: 'Three.js',
    icon: threejs,
    category: 'Front-end & Design',
  },
  // Ferramentas
  {
    name: 'git',
    icon: git,
    category: 'Ferramentas & DevOps',
  },
  {
    name: 'figma',
    icon: figma,
    category: 'Front-end & Design',
  },
  {
    name: 'Node.js',
    icon: nodejs,
    category: 'Linguagens & Backend',
  },
  {
    name: 'VS Code',
    icon: vscode,
    category: 'Ferramentas & DevOps',
  },
  // Plataforma do Site
  {
    name: 'Vite',
    icon: threejs,
    category: 'Ferramentas & DevOps',
  },
];

const experiences: TExperience[] = [
  {
    title: 'Técnico de Informática N2',
    companyName: 'Terabyte Consultoria em TI',
    icon: '/empresas/terabyte.webp',
    iconBg: '#E6DEDD',
    date: 'Março 2024 - Dezembro 2025',
    points: [
      'Suporte técnico N2 presencial e remoto para incidentes complexos com alta taxa de resolução no primeiro contato',
      'Administração de redes, servidores e sistemas corporativos',
      'Gestão de acessos e usuários via Microsoft 365 e Entra ID',
      'Deploy e instalação de sistemas operacionais Windows e Linux',
      'Configuração de infraestrutura de rede, incluindo roteadores DrayTek e switches',
      'Implementação de firewalls, proteção contra ataques e atualizações críticas de segurança',
      'Manutenção de sistemas de câmeras e som',
      'Atendimento consultivo ao cliente via WhatsApp e redes sociais com registro preciso de chamados',
    ],
  },
  {
    title: 'Web Master',
    companyName: 'DotKom',
    icon: '/empresas/dotkom.webp',
    iconBg: '#383E56',
    date: 'Junho 2023 - Janeiro 2024',
    points: [
      'Desenvolvimento de websites e plataformas de E-commerce utilizando WordPress, Tray, Nuvemshop e Shopify',
      'Integração de sistemas ERP como Bling!, Alterdata e Linx',
      'Configuração e integração de meios de pagamento, incluindo Mercado Pago, PagSeguro e Vindi',
      'Integração e configuração de ferramentas de CRM como Wake, CRM&Bonus e RD Station',
    ],
  },
  {
    title: 'Técnico de Manutenção de Computadores',
    companyName: 'Autônomo',
    icon: '/empresas/autonomo.webp',
    iconBg: '#E6DEDD',
    date: 'Janeiro 2023 - Presente',
    points: [
      'Diagnóstico avançado de falhas, reparo de ineficiências e otimização de hardware e software',
      'Instalação e configuração de hardwares, softwares e drivers',
      'Implementação de soluções de acesso remoto e VPN (AnyDesk/TeamViewer)',
      'Gerenciamento de redes LAN/WAN, servidores e IPs',
      'Gestão de segurança e privacidade de dados, incluindo proteção contra ataques',
      'Execução de melhorias regulares para assegurar a atualização dos sistemas',
      'Manutenção de registros de reparos e correções para referência futura',
      'Instrução técnica de usuários sobre o uso correto de hardware e software',
    ],
  },
  {
    title: 'Responsável Técnico de TI / Suporte Técnico',
    companyName: 'Mercedito',
    icon: '/empresas/mercedito.webp',
    iconBg: '#E6DEDD',
    date: 'Março 2022 - Dezembro 2022',
    points: [
      'Manutenção integral do parque tecnológico: computadores, internet, softwares e sistemas de monitoramento',
      'Treinamento e orientação de colaboradores para uso eficiente de dispositivos e resolução de problemas de acesso',
      'Suporte operacional ao cadastramento de produtos e atualização de sistemas de vendas e cardápios',
      'Manutenção periódica de sistemas de câmeras e som',
      'Configuração e monitoramento de VPN',
      'Criação e atualização diária de ChatBot para suporte a clientes via WhatsApp',
      'Gestão de SEO em redes sociais e Google My Place',
    ],
  },
  {
    title: 'Gerente Geral',
    companyName: "Abra Kebab's",
    icon: '/empresas/abrakebab.webp',
    iconBg: '#E6DEDD',
    date: '2022',
    points: [
      'Gestão completa da operação da unidade, incluindo financeiro, estoque e liderança de equipe',
      'Controle de fluxo de caixa e análise de indicadores de desempenho',
    ],
  },
  {
    title: 'Gerente de Atendimento ao Cliente',
    companyName: 'Mundo Trader',
    icon: '/empresas/trader.webp',
    iconBg: '#383E56',
    date: 'Março 2016 - Fevereiro 2021',
    points: [
      'Liderança de Customer Experience e gestão de equipe de atendimento e suporte',
      'Gestão de SLA, resolução de conflitos e estratégias de fidelização',
      'Otimização de processos internos baseada em feedbacks e registros de pedidos',
      'Manutenção da comunicação com clientes sobre mudanças nos serviços e tendências de mercado',
      'Criação de Landing Pages para captação de clientes e recuperação de carrinhos abandonados',
      'Organização de vendas, reembolsos e gestão do sucesso do cliente com a solução contratada',
    ],
  },
  {
    title: 'Técnico de TI / Gerente Técnico / Designer',
    companyName: 'Blitz Haus',
    icon: '/empresas/blitz.webp',
    iconBg: '#383E56',
    date: 'Março 2015 - Fevereiro 2016',
    points: [
      'Planejamento, implantação de sistemas e avaliação de operações de dados eletrônicos',
      'Garantia da segurança de dados, estabilidade das redes locais e sistemas de backup',
      'Manutenção e configuração integral de hardware e software da empresa',
      'Treinamento de funcionários em procedimentos padrões e uso de softwares/periféricos',
      'Identificação de áreas problemáticas e implementação de soluções estratégicas',
      'Criação de artes para eventos e publicidade em mídias impressas e redes sociais',
    ],
  },
  {
    title: 'CEO / Fundador e Gestor',
    companyName: 'Garagemod',
    icon: '/empresas/garage.webp',
    iconBg: '#383E56',
    date: 'Maio 2014 - Fevereiro 2015',
    points: [
      'Desenvolvimento e programação completa da plataforma de e-commerce utilizando Magento',
      'Gestão operacional de logística, meios de pagamento, antifraude e controle de estoque',
      'Definição estratégica de mix de produtos, linguagem de comunicação e investimentos',
      'Acompanhamento de métricas, indicadores de vendas e campanhas promocionais',
      'Responsabilidade por funções administrativas, contábeis e de recursos humanos',
    ],
  },
  {
    title: 'Analista de TI / Técnico em Informática / Logística',
    companyName: 'Colonial Racing',
    icon: '/empresas/colonial.webp',
    iconBg: '#E6DEDD',
    date: 'Março 2012 - Maio 2014',
    points: [
      'Projeto e implantação de infraestrutura de rede para 18 computadores',
      'Implementação do sistema ERP Cauto, otimizando a operação da empresa',
      'Suporte técnico contínuo em hardware (CPUs, impressoras, roteadores) e configuração de software',
      'Gerenciamento de opções de segurança e proteção de rede contra ataques',
      'Diagnóstico e execução de melhorias para restauração de funcionalidades do sistema',
    ],
  },
  {
    title: 'Web Designer / Web Master',
    companyName: 'LTV Design',
    icon: '/empresas/ltv.webp',
    iconBg: '#383E56',
    date: 'Fevereiro 2009 - Fevereiro 2012',
    points: [
      'Desenvolvimento de sites utilizando Flash, HTML, CSS, PHP, SQL, JavaScript, Magento e WordPress',
      'Design gráfico, tratamento de imagens via Photoshop e criação de banners, folders e cartões',
      'Desenvolvimento da navegação e interface visual das aplicações',
    ],
  },
  {
    title: 'Subgerente de Vendas / Operador de Caixa',
    companyName: 'Cafe Beach / Açai Beach',
    icon: '/empresas/acai.webp',
    iconBg: '#383E56',
    date: 'Fevereiro 2007 - Fevereiro 2009',
    points: [
      'Planejamento e controle de vendas e faturamento',
      'Gestão de equipe e controle de indicadores de estoque',
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      'Pensei que fosse impossível criar um site tão bonito quanto nosso produto, mas Leandro provou o contrário.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      'Nunca conheci um desenvolvedor web que se preocupa tanto com o sucesso dos clientes como Leandro.',
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      'Depois que Leandro otimizou nosso site, nosso tráfego aumentou 50%. Não podemos agradecê-lo o suficiente!',
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const projects: TProject[] = [
  {
    name: 'GetNexo v1.0+',
    description:
      'Plataforma All-in-One de automação de vendas e inteligência de atendimento que transforma o WhatsApp em um canal de alta performance com IA Generativa e Realidade Aumentada.',
    tags: [
      {
        name: 'astro',
        color: 'blue-text-gradient',
      },
      {
        name: 'react',
        color: 'green-text-gradient',
      },
      {
        name: 'ai-engine',
        color: 'pink-text-gradient',
      },
      {
        name: 'ar-3d',
        color: 'orange-text-gradient',
      },
    ],
    image: getnexo,
    sourceCodeLink: 'https://github.com/lelebrr/GetNexo',
    status: 'v1.0+ (Full Release)',
    category: 'SaaS & Automação AI',
  },
  {
    name: 'Component Tester PRO v2.0',
    description:
      'Ecossistema avançado de diagnóstico para componentes eletrônicos com Arduino Uno e interface Pixel Art em TFT.',
    tags: [
      {
        name: 'c++',
        color: 'blue-text-gradient',
      },
      {
        name: 'arduino',
        color: 'green-text-gradient',
      },
      {
        name: 'embedded',
        color: 'pink-text-gradient',
      },
      {
        name: 'pixel-art-ui',
        color: 'orange-text-gradient',
      },
    ],
    image: comptester,
    sourceCodeLink: 'https://github.com/lelebrr/Component_Tester',
    status: 'v2.0 (Finalizado)',
    category: 'Hardware & IoT',
  },
  {
    name: 'Willy Cyber-Multitool',
    description:
      'Multi-ferramenta portátil de segurança com ESP32, protocolos RF multi-banda (Sub-GHz, NFC, IR) e interface LVGL moderna.',
    tags: [
      {
        name: 'esp32',
        color: 'blue-text-gradient',
      },
      {
        name: 'cybersecurity',
        color: 'green-text-gradient',
      },
      {
        name: 'lvgl-gui',
        color: 'pink-text-gradient',
      },
      {
        name: 'rf-protocols',
        color: 'orange-text-gradient',
      },
    ],
    image: willy,
    sourceCodeLink: 'https://github.com/lelebrr/Willy',
    status: 'v1.0 (Protótipo)',
    category: 'Cibersegurança & Hardware',
  },
];

export { experiences, projects, services, technologies, testimonials };
