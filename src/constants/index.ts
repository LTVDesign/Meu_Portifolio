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
    title: 'constants.services.infraestrutura',
    description: 'constants.services.infraestruturaDesc',
    icon: web,
  },
  {
    title: 'constants.services.ciberseguranca',
    description: 'constants.services.cibersegurancaDesc',
    icon: mobile,
  },
  {
    title: 'constants.services.iaDados',
    description: 'constants.services.iaDadosDesc',
    icon: backend,
  },
  {
    title: 'constants.services.gestao',
    description: 'constants.services.gestaoDesc',
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  // Sistemas e Infraestrutura
  {
    name: 'Linux',
    icon: linux,
    category: 'tech.categories.infra',
  },
  {
    name: 'Windows',
    icon: windows,
    category: 'tech.categories.infra',
  },
  {
    name: 'Docker',
    icon: docker,
    category: 'tech.categories.infra',
  },
  {
    name: 'Microsoft 365',
    icon: microsoft365,
    category: 'tech.categories.infra',
  },
  // Hardware e Projetos Autorais
  {
    name: 'ESP32',
    icon: esp32,
    category: 'tech.categories.hardware',
  },
  {
    name: 'Arduino',
    icon: arduino,
    category: 'tech.categories.hardware',
  },
  {
    name: 'Android',
    icon: android,
    category: 'tech.categories.hardware',
  },
  // Linguagens e Desenvolvimento
  {
    name: 'Python',
    icon: python,
    category: 'tech.categories.languages',
  },
  {
    name: 'JavaScript',
    icon: javascript,
    category: 'tech.categories.languages',
  },
  {
    name: 'HTML5',
    icon: html,
    category: 'tech.categories.frontend',
  },
  {
    name: 'CSS3',
    icon: css,
    category: 'tech.categories.frontend',
  },
  {
    name: 'TypeScript',
    icon: typescript,
    category: 'tech.categories.languages',
  },
  {
    name: 'SQL',
    icon: sql,
    category: 'tech.categories.languages',
  },
  // Segurança e Redes
  {
    name: 'Kali Linux',
    icon: kali,
    category: 'tech.categories.security',
  },
  {
    name: 'DrayTek/Redes',
    icon: daytek,
    category: 'tech.categories.security',
  },
  {
    name: 'Ubiquiti',
    icon: ubiquiti,
    category: 'tech.categories.security',
  },
  {
    name: 'SonicWall',
    icon: sonicwall,
    category: 'tech.categories.security',
  },
  // Frameworks e Bibliotecas
  {
    name: 'React',
    icon: reactjs,
    category: 'tech.categories.frontend',
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
    category: 'tech.categories.frontend',
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
    category: 'tech.categories.frontend',
  },
  {
    name: 'Three.js',
    icon: threejs,
    category: 'tech.categories.frontend',
  },
  // Ferramentas
  {
    name: 'git',
    icon: git,
    category: 'tech.categories.devops',
  },
  {
    name: 'figma',
    icon: figma,
    category: 'tech.categories.frontend',
  },
  {
    name: 'Node.js',
    icon: nodejs,
    category: 'tech.categories.languages',
  },
  {
    name: 'VS Code',
    icon: vscode,
    category: 'tech.categories.devops',
  },
  // Plataforma do Site
  {
    name: 'Vite',
    icon: threejs,
    category: 'tech.categories.devops',
  },
];

const experiences: TExperience[] = [
  {
    title: 'experience.titles.technicalSupport',
    companyName: 'experience.companies.consultingCompany',
    icon: '/empresas/terabyte.webp',
    iconBg: '#E6DEDD',
    date: 'experience.dates.terabyte',
    points: [
      'experience.points.terabyte1',
      'experience.points.terabyte2',
      'experience.points.terabyte3',
      'experience.points.terabyte4',
      'experience.points.terabyte5',
      'experience.points.terabyte6',
      'experience.points.terabyte7',
      'experience.points.terabyte8',
      'experience.points.terabyte9',
      'experience.points.terabyte10',
      'experience.points.terabyte11',
      'experience.points.terabyte12',
    ],
  },
  {
    title: 'experience.titles.webMaster',
    companyName: 'experience.companies.companyDotKom',
    icon: '/empresas/dotkom.webp',
    iconBg: '#383E56',
    date: 'experience.dates.dotkom',
    points: [
      'experience.points.dotkom1',
      'experience.points.dotkom2',
      'experience.points.dotkom3',
      'experience.points.dotkom4',
      'experience.points.dotkom5',
      'experience.points.dotkom6',
      'experience.points.dotkom7',
      'experience.points.dotkom8',
    ],
  },
  {
    title: 'experience.titles.computerTechnician',
    companyName: 'experience.companies.autonomous',
    icon: '/logo.svg',
    iconBg: '#E6DEDD',
    date: 'experience.dates.autonomo',
    points: [
      'experience.points.autonomo1',
      'experience.points.autonomo2',
      'experience.points.autonomo3',
      'experience.points.autonomo4',
      'experience.points.autonomo5',
      'experience.points.autonomo6',
      'experience.points.autonomo7',
      'experience.points.autonomo8',
      'experience.points.autonomo9',
      'experience.points.autonomo10',
      'experience.points.autonomo11',
    ],
  },
  {
    title: 'experience.titles.itResponsible',
    companyName: 'experience.companies.companyMercedito',
    icon: '/empresas/mercedito.webp',
    iconBg: '#E6DEDD',
    date: 'experience.dates.mercedito',
    points: [
      'experience.points.mercedito1',
      'experience.points.mercedito2',
      'experience.points.mercedito3',
      'experience.points.mercedito4',
      'experience.points.mercedito5',
      'experience.points.mercedito6',
      'experience.points.mercedito7',
    ],
  },
  {
    title: 'experience.titles.generalManager',
    companyName: "experience.companies.abraKebabs",
    icon: '/empresas/abrakebab.webp',
    iconBg: '#E6DEDD',
    date: 'experience.dates.abrakebabs',
    points: [
      'experience.points.abrakebabs1',
      'experience.points.abrakebabs2',
      'experience.points.abrakebabs3',
      'experience.points.abrakebabs4',
      'experience.points.abrakebabs5',
      'experience.points.abrakebabs6',
    ],
  },
  {
    title: 'experience.titles.customerServiceManager',
    companyName: 'experience.companies.mundoTrader',
    icon: '/empresas/trader.webp',
    iconBg: '#383E56',
    date: 'experience.dates.trader',
    points: [
      'experience.points.trader1',
      'experience.points.trader2',
      'experience.points.trader3',
      'experience.points.trader4',
      'experience.points.trader5',
      'experience.points.trader6',
      'experience.points.trader7',
      'experience.points.trader8',
      'experience.points.trader9',
    ],
  },
  {
    title: 'experience.titles.itTechnicianManager',
    companyName: 'experience.companies.blitzHaus',
    icon: '/empresas/blitz.webp',
    iconBg: '#383E56',
    date: 'experience.dates.blitzhaus',
    points: [
      'experience.points.blitz1',
      'experience.points.blitz2',
      'experience.points.blitz3',
      'experience.points.blitz4',
      'experience.points.blitz5',
      'experience.points.blitz6',
      'experience.points.blitz7',
      'experience.points.blitz8',
      'experience.points.blitz9',
    ],
  },
  {
    title: 'experience.titles.ceoFounder',
    companyName: 'experience.companies.garagemod',
    icon: '/empresas/garage.webp',
    iconBg: '#383E56',
    date: 'experience.dates.garagemod',
    points: [
      'experience.points.garagemod1',
      'experience.points.garagemod2',
      'experience.points.garagemod3',
      'experience.points.garagemod4',
      'experience.points.garagemod5',
      'experience.points.garagemod6',
      'experience.points.garagemod7',
      'experience.points.garagemod8',
      'experience.points.garagemod9',
    ],
  },
  {
    title: 'experience.titles.itAnalystLogistics',
    companyName: 'experience.companies.colonialRacing',
    icon: '/empresas/colonial.webp',
    iconBg: '#E6DEDD',
    date: 'experience.dates.colonial',
    points: [
      'experience.points.colonial1',
      'experience.points.colonial2',
      'experience.points.colonial3',
      'experience.points.colonial4',
      'experience.points.colonial5',
      'experience.points.colonial6',
      'experience.points.colonial7',
      'experience.points.colonial8',
    ],
  },
  {
    title: 'experience.titles.webDesignerMaster',
    companyName: 'experience.companies.ltvDesign',
    icon: '/empresas/ltv.webp',
    iconBg: '#383E56',
    date: 'experience.dates.ltv',
    points: [
      'experience.points.ltv1',
      'experience.points.ltv2',
      'experience.points.ltv3',
      'experience.points.ltv4',
      'experience.points.ltv5',
      'experience.points.ltv6',
    ],
  },
  {
    title: 'experience.titles.salesSubManager',
    companyName: 'experience.companies.cafeBeach',
    icon: '/empresas/acai.webp',
    iconBg: '#383E56',
    date: 'experience.dates.acai',
    points: [
      'experience.points.acai1',
      'experience.points.acai2',
      'experience.points.acai3',
      'experience.points.acai4',
      'experience.points.acai5',
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial: 'constants.testimonials.testimonial1',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial: 'constants.testimonials.testimonial1',
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial: 'constants.testimonials.testimonial1',
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const projects: TProject[] = [
  {
    name: 'GetNexo v1.0+',
    description: 'constants.projects.getnexo',
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
    status: 'status_ongoing',
    category: 'category_saas',
  },
  {
    name: 'Component Tester PRO v2.0',
    description: 'constants.projects.comptester',
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
    status: 'status_finished',
    category: 'category_hardware',
  },
  {
    name: 'Willy Cyber-Multitool',
    description: 'constants.projects.willy',
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
    status: 'status_ongoing',
    category: 'category_security',
  },
];

export { experiences, projects, services, technologies, testimonials };
