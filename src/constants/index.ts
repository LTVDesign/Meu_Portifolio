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
    id: 'experience',
    title: 'Experiência Profissional',
  },
  {
    id: 'cursos',
    title: 'Cursos',
  },
  {
    id: 'works',
    title: 'Projetos',
  },
  {
    id: 'curriculo',
    title: 'Currículo',
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
    title: 'IT Technician N2',
    companyName: 'Terabyte Consultoria em TI',
    icon: '/empresas/terabyte.webp',
    iconBg: '#E6DEDD',
    date: 'March 2024 - December 2025',
    points: [
      'On-site and remote N2 technical support for complex incidents with high first-contact resolution rate',
      'Network, server and corporate systems administration',
      'User and access management via Microsoft 365 and Entra ID',
      'Deployment and installation of Windows and Linux operating systems',
      'Network infrastructure configuration, including DrayTek routers and switches',
      'Firewall implementation, attack protection and critical security updates',
      'Camera and sound systems maintenance',
      'Consultative customer service via WhatsApp and social media with accurate ticket logging',
    ],
  },
  {
    title: 'Web Master',
    companyName: 'DotKom',
    icon: '/empresas/dotkom.webp',
    iconBg: '#383E56',
    date: 'June 2023 - January 2024',
    points: [
      'Website and E-commerce platform development using WordPress, Tray, Nuvemshop and Shopify',
      'ERP systems integration such as Bling!, Alterdata and Linx',
      'Payment gateway configuration and integration, including Mercado Pago, PagSeguro and Vindi',
      'CRM tools integration and configuration such as Wake, CRM&Bonus and RD Station',
    ],
  },
  {
    title: 'Computer Maintenance Technician',
    companyName: 'Autônomo',
    icon: '/logo.svg',
    iconBg: '#E6DEDD',
    date: 'January 2023 - Present',
    points: [
      'Advanced fault diagnosis, inefficiency repair and hardware/software optimization',
      'Hardware, software and drivers installation and configuration',
      'Remote access and VPN solutions implementation (AnyDesk/TeamViewer)',
      'LAN/WAN networks, servers and IPs management',
      'Data security and privacy management, including attack protection',
      'Regular improvements execution to ensure systems are up-to-date',
      'Repair and correction records maintenance for future reference',
      'Technical instruction to users on proper hardware and software usage',
    ],
  },
  {
    title: 'IT Technical Responsible / Technical Support',
    companyName: 'Mercedito',
    icon: '/empresas/mercedito.webp',
    iconBg: '#E6DEDD',
    date: 'March 2022 - December 2022',
    points: [
      'Complete technology park maintenance: computers, internet, software and monitoring systems',
      'Employee training and guidance for efficient device usage and access troubleshooting',
      'Operational support for product registration and sales/menu systems update',
      'Periodic camera and sound systems maintenance',
      'VPN configuration and monitoring',
      'Daily ChatBot creation and update for customer support via WhatsApp',
      'SEO management on social media and Google My Business',
    ],
  },
  {
    title: 'General Manager',
    companyName: "Abra Kebab's",
    icon: '/empresas/abrakebab.webp',
    iconBg: '#E6DEDD',
    date: '2022',
    points: [
      'Complete unit operation management, including finances, inventory and team leadership',
      'Cash flow control and performance indicators analysis',
    ],
  },
  {
    title: 'Customer Service Manager',
    companyName: 'Mundo Trader',
    icon: '/empresas/trader.webp',
    iconBg: '#383E56',
    date: 'March 2016 - February 2021',
    points: [
      'Customer Experience leadership and customer service/support team management',
      'SLA management, conflict resolution and loyalty strategies',
      'Internal processes optimization based on feedback and order records',
      'Customer communication maintenance about service changes and market trends',
      'Landing Pages creation for customer acquisition and abandoned cart recovery',
      'Sales organization, refunds and customer success management with contracted solution',
    ],
  },
  {
    title: 'IT Technician / Technical Manager / Designer',
    companyName: 'Blitz Haus',
    icon: '/empresas/blitz.webp',
    iconBg: '#383E56',
    date: 'March 2015 - February 2016',
    points: [
      'Planning, systems deployment and electronic data operations evaluation',
      'Data security, local network stability and backup systems assurance',
      'Complete company hardware and software maintenance and configuration',
      'Employee training on standard procedures and software/peripherals usage',
      'Problematic areas identification and strategic solutions implementation',
      'Art creation for events and advertising in print media and social networks',
    ],
  },
  {
    title: 'CEO / Founder and Manager',
    companyName: 'Garagemod',
    icon: '/empresas/garage.webp',
    iconBg: '#383E56',
    date: 'May 2014 - February 2015',
    points: [
      'Complete e-commerce platform development using Magento',
      'Logistics, payment methods, anti-fraud and inventory control operational management',
      'Strategic product mix definition, communication language and investments',
      'Sales metrics, indicators and promotional campaigns monitoring',
      'Administrative, accounting and human resources responsibilities',
    ],
  },
  {
    title: 'IT Analyst / Computer Technician / Logistics',
    companyName: 'Colonial Racing',
    icon: '/empresas/colonial.webp',
    iconBg: '#E6DEDD',
    date: 'March 2012 - May 2014',
    points: [
      'Network infrastructure design and deployment for 18 computers',
      'Cauto ERP system implementation, optimizing company operations',
      'Continuous technical support in hardware (CPUs, printers, routers) and software configuration',
      'Security options management and network protection against attacks',
      'Diagnosis and improvements execution for system functionality restoration',
    ],
  },
  {
    title: 'Web Designer / Web Master',
    companyName: 'LTV Design',
    icon: '/empresas/ltv.webp',
    iconBg: '#383E56',
    date: 'February 2009 - February 2012',
    points: [
      'Website development using Flash, HTML, CSS, PHP, SQL, JavaScript, Magento and WordPress',
      'Graphic design, image treatment via Photoshop and creation of banners, folders and cards',
      'Application navigation and visual interface development',
    ],
  },
  {
    title: 'Sales Sub-Manager / Cashier',
    companyName: 'Cafe Beach / Açai Beach',
    icon: '/empresas/acai.webp',
    iconBg: '#383E56',
    date: 'February 2007 - February 2009',
    points: [
      'Sales and billing planning and control',
      'Team management and inventory indicators control',
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
    status: 'v1.3 (Em andamento)',
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
