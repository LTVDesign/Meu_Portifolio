import type { CaseStudyData } from '../components/layout/CaseStudyLayout';

export const caseStudies: CaseStudyData[] = [
  {
    id: 'getnexo',
    name: 'GetNexo',
    tagline:
      'Plataforma SaaS inteligente que conecta profissionais e empresas com IA, realidade aumentada e experiência 3D.',
    category: 'SaaS Platform',
    year: '2024',
    role: 'Full-Stack Developer & Designer',
    stack: ['Astro', 'React', 'TypeScript', 'AI/ML', 'Three.js', 'AR'],
    status: 'Em desenvolvimento',
    image: '/assets/projects/getnexo.webp',
    color: '#00FFFF',
    problem:
      'Profissionais e empresas enfrentam dificuldade em se conectar de forma significativa. Plataformas existentes são genéricas, não oferecem personalização profunda e carecem de ferramentas que realmente destaquem o perfil profissional.',
    process: [
      'Pesquisa extensa com profissionais de diversas áreas para entender suas necessidades reais de presença digital.',
      'Design de uma identidade visual que transmite inovação e confiança, com paleta cyber-clean e tipografia moderna.',
      'Arquitetura técnica com Astro para performance + React para interatividade, garantindo SSR e islands architecture.',
      'Implementação de motor de IA para recomendações inteligentes e matching profissional.',
      'Criação de sistema de visualização 3D/AR para portfólios interativos que se destacam.',
      'Iteração contínua baseada em feedback de usuários beta.',
    ],
    solution:
      'GetNexo é uma plataforma que combina IA, realidade augmentada e web 3D para criar experiências profissionais imersivas. Cada profissional pode construir um portfólio interativo, receber matching inteligente de oportunidades e se destacar com apresentações 3D de seus trabalhos.',
    results: [
      'Protótipo funcional com IA de matching operacional',
      'Sistema de portfólio 3D/AR funcionando em browsers modernos',
      'Arquitetura escalável pronta para crescimento',
      'Performance Lighthouse 95+ em todas as métricas',
    ],
    behindTheScenes:
      'O maior desafio técnico foi integrar Three.js com Astro de forma performática. Usamos islands architecture para carregar componentes 3D apenas quando necessários, e implementamos lazy loading agressivo com IntersectionObserver. O motor de IA foi treinado com dados sintéticos para o MVP.',
    nextProject: { id: 'sondvolt', name: 'SondVolt', color: '#915eff' },
  },
  {
    id: 'sondvolt',
    name: 'SondVolt',
    tagline:
      'Instrumento de diagnóstico eletrônico portátil com interface gráfica avançada para análise de circuitos.',
    category: 'Hardware & Embedded',
    year: '2024',
    role: 'Embedded Developer & Hardware Designer',
    stack: ['C++', 'Arduino', 'ESP32', 'PCB Design', 'Oscilloscope'],
    status: 'Concluído',
    image: '/assets/projects/sondvolt.webp',
    color: '#915eff',
    problem:
      'Eletrônicos e makers precisam de instrumentos de diagnóstico acessíveis e portáteis. Equipamentos profissionais são caros e difíceis de transportar, enquanto alternativas baratas carecem de funcionalidade.',
    process: [
      'Definição dos requisitos técnicos: medição de tensão, corrente, frequência e formas de onda.',
      'Design do hardware com ESP32 como microcontrolador principal, aproveitando seu WiFi para interface web.',
      'Desenvolvimento do firmware em C++ com algoritmos de processamento de sinal em tempo real.',
      'Criação de interface gráfica OLED para display local e interface web para visualização detalhada.',
      'Design de PCB otimizado para produção, com componentes SMD e layout compacto.',
      'Testes extensivos com diversos tipos de circuitos e condições de operação.',
    ],
    solution:
      'SondVolt é um instrumento portátil que combina hardware customizado com firmware inteligente. Oferece medições precisas, interface gráfica intuitiva e conectividade WiFi para visualização remota. Tudo em um formato que cabe no bolso.',
    results: [
      'Precisão de medição de ±0.1% em tensões até 30V',
      'Taxa de amostragem de 1MS/s para análise de sinais',
      'Interface web responsiva para visualização em tempo real',
      'Autonomia de bateria de 8+ horas de operação contínua',
    ],
    behindTheScenes:
      'O maior desafio foi otimizar o código C++ para rodar algoritmos de processamento de sinal em tempo real no ESP32, que tem recursos limitados. Implementamos uma pipeline de processamento com DMA para maximizar throughput e minimizar latência.',
    prevProject: { id: 'getnexo', name: 'GetNexo', color: '#00FFFF' },
    nextProject: { id: 'willy', name: 'Willy Cyber-Multitool', color: '#f59e0b' },
  },
  {
    id: 'willy',
    name: 'Willy Cyber-Multitool',
    tagline:
      'Kit completo de ferramentas de cibersegurança integrado em um dispositivo ESP32 S3 compacto.',
    category: 'Cybersecurity',
    year: '2024',
    role: 'Security Researcher & Embedded Developer',
    stack: ['ESP32 S3', 'C++', 'WiFi', 'BLE', 'Deauth', 'Packet Analysis'],
    status: 'Em desenvolvimento',
    image: '/assets/projects/willy.webp',
    color: '#f59e0b',
    problem:
      'Profissionais de segurança precisam de ferramentas portáteis e versáteis para testes de penetração. Dispositivos comerciais são caros e proprietários, enquanto soluções opensource carecem de integração e usabilidade.',
    process: [
      'Pesquisa de ferramentas de segurança existentes e seus casos de uso em campo.',
      'Seleção do ESP32 S3 como plataforma por sua potência, conectividade WiFi+BLE e custo acessível.',
      'Implementação de módulos de segurança: deauth, packet capture, beacon spam, e more.',
      'Criação de interface web integrada para controle e visualização em tempo real.',
      'Design de carcaça 3D para impressão, com(botões, LEDs e antena externa.',
      'Documentação completa e criação de guia de uso para cada ferramenta.',
    ],
    solution:
      'Willy é um dispositivo ESP32 S3 que integra múltiplas ferramentas de cibersegurança em um formato compacto e portátil. Com interface web intuitiva, permite executar testes de penetração, análise de pacotes e demonstrações de vulnerabilidades de forma controlada e educacional.',
    results: [
      'Integração de 8+ ferramentas de segurança em um único dispositivo',
      'Interface web responsiva para controle via smartphone/laptop',
      'Documentação completa com guias de uso ético',
      'Comunidade ativa contribuindo com novas funcionalidades',
    ],
    behindTheScenes:
      'O projeto começou como uma ferramenta pessoal para estudos de segurança. A maior dificuldade foi implementar todas as funcionalidades mantendo o consumo de memória dentro dos limites do ESP32 S3. Usamos técnicas de streaming para processar pacotes de rede sem sobrecarregar a RAM.',
    prevProject: { id: 'sondvolt', name: 'SondVolt', color: '#915eff' },
  },
];

export const getCaseStudyById = (id: string): CaseStudyData | undefined =>
  caseStudies.find((study) => study.id === id);
