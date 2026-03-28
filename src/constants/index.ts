import {
  backend,
  carrent,
  creator,
  css,
  docker,
  figma,
  git,
  html,
  javascript,
  jobit,
  mobile,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  tripguide,
  typescript,
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
    title: 'Cursos',
  },
  {
    id: 'certificados',
    title: 'Certificados',
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
    title: 'Desenvolvedor Full Stack',
    companyName: 'Terabyte',
    icon: web,
    iconBg: '#E6DEDD',
    date: '2024 - 2025',
    points: [
      'Desenvolvimento de aplicações web modernas',
      'Integração de APIs e bancos de dados',
      'Colaboração em equipe ágil',
      'Otimização de performance e segurança',
    ],
  },
  {
    title: 'Gerente Geral',
    companyName: "Abra Kebab's",
    icon: creator,
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
    icon: backend,
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
    name: 'Aluguel de Carros',
    description:
      'Plataforma web que permite aos usuários pesquisar, reservar e gerenciar aluguéis de carros de vários provedores, oferecendo uma solução conveniente e eficiente para necessidades de transporte.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: carrent,
    sourceCodeLink: 'https://github.com/lelebrr',
  },
  {
    name: 'Job IT',
    description:
      'Aplicação web que permite aos usuários pesquisar vagas de emprego, visualizar faixas salariais estimadas para posições e localizar empregos disponíveis com base na localização atual.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: jobit,
    sourceCodeLink: 'https://github.com/lelebrr',
  },
  {
    name: 'Guia de Viagens',
    description:
      'Uma plataforma abrangente de reserva de viagens que permite aos usuários reservar voos, hotéis e carros de aluguel, e oferece recomendações curadas para destinos populares.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: tripguide,
    sourceCodeLink: 'https://github.com/lelebrr',
  },
];

export { experiences, projects, services, technologies, testimonials };
