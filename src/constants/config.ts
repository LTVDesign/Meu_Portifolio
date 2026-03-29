type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    formacao: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
    cursos: Required<TSection>;
    certificados: Required<TSection>;
    curriculo: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: 'Portfólio',
    fullName: 'Leandro Barbosa',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'leandro@garagemod.com.br',
  },
  hero: {
    name: 'Leandro Barbosa',
    p: ['Bem-vindo à minha vida profissional'],
  },
  contact: {
    p: 'Entre em contato',
    h2: 'Contato',
    form: {
      name: {
        span: 'Seu Nome',
        placeholder: 'Qual é o seu nome?',
      },
      email: { span: 'Seu Email', placeholder: 'Qual é o seu email?' },
      message: {
        span: 'Sua Mensagem',
        placeholder: 'O que você quer dizer?',
      },
    },
  },
  sections: {
    about: {
      p: 'Engenheiro de Software • Tecnólogo em ADS • Pós-Graduando em IA & Data Science',
      h2: 'Experiência Consolidada, Olhar no Futuro.',
      content: `Sou um profissional de tecnologia com uma trajetória sólida, unindo a resiliência do suporte técnico de alto nível à inovação da análise de dados. Recentemente, consolidei minha base acadêmica com o título de Tecnólogo em Análise e Desenvolvimento de Sistemas e estou em fase de especialização em Inteligência Artificial e Data Science pela Anhanguera.

Minha bagagem inclui:
• Domínio Técnico: Vasta experiência como Técnico de Informática Nível 2, com expertise em infraestrutura de redes, Microsoft Entra ID e gestão de ambientes 365.
• Visão Estratégica: Certificado em Product Management pela University of Alberta e Scrum Master, focado em entregar valor real através de metodologias ágeis.
• Segurança e Dados: Formação avançada em Cibersegurança pelo programa Hackers do Bem e certificações profissionais da Google e IBM.

Mais do que resolver problemas técnicos, busco transformar dados em decisões e infraestruturas em plataformas seguras e inteligentes. Sou um aprendiz constante, entusiasta de hardware modding e sempre pronto para o próximo desafio complexo.`,
    },
    formacao: {
      p: 'Minha formação acadêmica',
      h2: 'Formação',
      content: `Aqui estão minhas qualificações acadêmicas e formações complementares.`,
    },
    experience: {
      p: 'O que fiz até agora',
      h2: 'Experiência Profissional',
    },
    feedbacks: {
      p: 'O que os outros dizem',
      h2: 'Depoimentos.',
    },
    works: {
      p: 'Criações & Experimentos',
      h2: 'Projetos',
      content: `Uma vitrine de projetos que desenvolvi por paixão, hobby e para aprofundar meus conhecimentos técnicos. Cada iniciativa reflete minha curiosidade em explorar novas fronteiras, desde hardware modding até automações inteligentes com IA.`,
    },
    cursos: {
      p: 'Meus cursos',
      h2: 'Cursos',
      content: `Uma curadoria das minhas principais formações técnico-estratégicas, certificações profissionais e especializações em gestão de produtos e cibersegurança.`,
    },
    certificados: {
      p: 'Meus certificados',
      h2: 'Certificados.',
      content: `Aqui estão os certificados que obtive através de cursos, treinamentos e exames de certificação em diferentes plataformas e instituições.`,
    },
    curriculo: {
      p: 'Meu currículo',
      h2: 'Currículo',
      content: `Confira meu currículo completo com todas as minhas qualificações, experiências e habilidades técnicas.`,
    },
  },
};
