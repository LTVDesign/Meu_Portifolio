import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';

const AllFormacao = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const educations = [
    {
      title: 'Pós-Graduação em Inteligência Artificial e Data Science',
      institution: 'Anhanguera',
      period: 'Cursando – Previsão: Dezembro de 2026',
      description:
        'Especialização focada na criação de modelos preditivos e sistemas inteligentes utilizando técnicas avançadas de Machine Learning e Ciência de Dados. O curso abrange o processamento de grandes volumes de informações para a geração de insights estratégicos, automação de processos e desenvolvimento de soluções baseadas em dados.',
    },
    {
      title: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade Pitágoras Unopar Anhanguera',
      period: 'Concluído em Dezembro de 2025',
      description:
        'Formação superior voltada para o ciclo completo de desenvolvimento de software, incluindo análise de requisitos, arquitetura de sistemas e programação. Experiência prática na implementação de bancos de dados, engenharia de software e utilização de metodologias ágeis para garantir a qualidade e escalabilidade das entregas técnicas.',
    },
  ];

  return (
    <>
      <Header useMotion={true} p={t('formacao.p')} h2={t('formacao.h2')} />

      <div className="flex w-full justify-between items-center">
        <motion.p
          variants={fadeIn('up', 'tween', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {t('formacao.content')}
        </motion.p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-primary text-[var(--dynamic-text-color)] px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors mt-3"
        >
          Voltar
        </button>
      </div>

      <div className="mt-20 flex flex-col">
        <div className="flex flex-wrap gap-7">
          {educations.map((education, index) => (
            <motion.div
              key={education.title}
              variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
              className="w-full rounded-[20px] bg-tertiary p-5 sm:w-[360px]"
            >
              <div className="mt-5">
                <LinkAnimado
                  href="#curriculo"
                  className="text-[20px] font-bold text-[var(--dynamic-text-color)] hover:text-secondary transition-colors sm:text-[24px]"
                >
                  {education.title}
                </LinkAnimado>
                <p className="mt-2 text-[14px] text-[var(--dynamic-text-secondary)]">
                  {education.institution} | {education.period}
                </p>
                <p className="mt-4 text-[14px] text-[var(--dynamic-text-secondary)]">
                  {education.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(AllFormacao, 'allformacao');
