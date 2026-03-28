import {
  backend,
  comptester,
  creator,
  css,
  docker,
  figma,
  git,
  getnexo,
  html,
  javascript,
  mobile,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  typescript,
  willy,
  web,
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
    id: 'work',
    title: 'Trabalhos',
  },
  {
    id: 'cursos',
    title: 'Cursos & Certificados',
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
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: 'Técnico de Informática N2',
    companyName: 'Terabyte Soluções em TI',
    icon: '/empresas/terabyte.png',
    iconBg: '#E6DEDD',
    date: '2024 - 2025',
    points: [
      'Suporte técnico especializado N2 para infraestrutura de TI',
      'Administração de sistemas e servidores',
      'Gestão de redes e segurança da informação',
      'Monitoramento e manutenção de ambientes computacionais',
      'Resolução de incidentes complexos e atendimento a clientes',
    ],
  },
  {
    title: 'Gerente Geral',
    companyName: "Abra Kebab's",
    icon: '/empresas/abrakebab.png',
    iconBg: '#E6DEDD',
    date: '2022 - Present',
    points: [
      'Administração geral do restaurante.',
      'Controle de caixa e estoque.',
      'Gestão de equipe e operações diárias.',
      'Implementação de melhorias em processos.',
    ],
  },
  {
    title: 'CEO e Desenvolvedor Web',
    companyName: 'Garagemod',
    icon: web,
    iconBg: '#383E56',
    date: '2014 - 2015',
    points: [
      'Criação de design para loja virtual de acessórios automotivos.',
      'Gerenciamento de Fan Page e redes sociais.',
      'Cadastro de produtos e otimização SEO.',
      'Atendimento ao público e gestão geral.',
    ],
  },
  {
    title: 'Tecnologia da Informação',
    companyName: 'Colonial Racing',
    icon: '/empresas/colonial.png',
    iconBg: '#E6DEDD',
    date: '2012 - 2013',
    points: [
      'Modernização da empresa com 18 computadores conectados em rede.',
      'Implantação de sistema Cauto para gestão.',
      'Manutenção e suporte técnico de infraestrutura de TI.',
      'Otimização de processos tecnológicos para eficiência.',
    ],
  },
  {
    title: 'Web Designer',
    companyName: 'LTV Design',
    icon: web,
    iconBg: '#383E56',
    date: '2009 - 2012',
    points: [
      'Criação de sites utilizando Flash, HTML, CSS, PHP e JavaScript.',
      'Desenvolvimento de interfaces web responsivas e compatíveis com navegadores.',
      'Colaboração com equipes para criar produtos de alta qualidade.',
      'Participação em revisões de código e feedback construtivo.',
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
  },
];

export { experiences, projects, services, technologies, testimonials };
