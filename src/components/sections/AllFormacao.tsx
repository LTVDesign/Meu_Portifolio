import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';
import faculImg from '../../assets/facul.png';

const diplomaImg = '/formacao/diploma.png';

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
      logo: faculImg,
    },
    {
      title: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade Pitágoras Unopar Anhanguera',
      period: 'Concluído em Dezembro de 2025',
      description:
        'Formação superior com carga horária total de 2100h, voltada para o ciclo completo de desenvolvimento de software, incluindo análise de requisitos, arquitetura de sistemas e programação. Experiência prática na implementação de bancos de dados, engenharia de software e utilização de metodologias ágeis para garantir a qualidade e escalabilidade das entregas técnicas.',
      logo: faculImg,
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
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={education.logo}
                  alt="Logo da faculdade"
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-[18px] font-bold text-[var(--dynamic-text-color)]">
                    {education.institution}
                  </h3>
                  <p className="text-[16px] text-[var(--cyber-cyan)] font-semibold">
                    {education.period}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <LinkAnimado
                  href="#curriculo"
                  className="text-[20px] font-bold text-[var(--dynamic-text-color)] hover:text-secondary transition-colors sm:text-[24px]"
                >
                  {education.title}
                </LinkAnimado>
                <p className="mt-4 text-[14px] text-[var(--dynamic-text-secondary)]">
                  {education.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Histórico Acadêmico Completo */}
      <div className="mt-16 min-h-screen">
        <h3 className="text-[24px] font-bold text-[var(--dynamic-text-color)] mb-8 text-center">
          Histórico Acadêmico Completo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { semestre: '1º Semestre', media: 8.5 },
            { semestre: '2º Semestre', media: 8.8 },
            { semestre: '3º Semestre', media: 9.0 },
            { semestre: '4º Semestre', media: 9.2 },
            { semestre: '5º Semestre', media: 9.1 },
            { semestre: '6º Semestre', media: 9.3 },
          ].map((item, index) => (
            <motion.div
              key={item.semestre}
              variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
              className="bg-tertiary rounded-xl p-4"
            >
              <p className="text-[16px] font-semibold text-[var(--dynamic-text-color)] mb-2">
                {item.semestre}
              </p>
              <div className="w-full max-w-[200px] bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] h-1.5 rounded-full"
                  style={{ width: `${(item.media / 10) * 100}%` }}
                />
              </div>
              <p className="text-[14px] text-[var(--cyber-cyan)] mt-2 font-bold">
                {item.media.toFixed(1)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Verificação de Autenticidade */}
      <div className="mt-16 min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${diplomaImg})` }}
        />
        <div className="relative z-10">
          <h3 className="text-[24px] font-bold text-[var(--dynamic-text-color)] mb-8 text-center">
            Verificação de Autenticidade
          </h3>
          <div className="max-w-2xl mx-auto bg-tertiary rounded-2xl p-8">
            <div className="flex flex-col items-center">
              <img
                src={diplomaImg}
                alt="Diploma"
                className="w-full max-w-md rounded-lg shadow-2xl mb-6"
              />
              <div className="text-center">
                <h4 className="text-[20px] font-bold text-[var(--dynamic-text-color)] mb-4">
                  Diploma e Autenticação
                </h4>
                <p className="text-[16px] text-[var(--dynamic-text-secondary)] mb-4">
                  Documento oficial de conclusão do curso de Tecnologia em Análise e Desenvolvimento de Sistemas
                </p>
                <p className="text-[14px] text-[var(--cyber-cyan)]">
                  Universidade Pitágoras Unopar Anhanguera - Dezembro de 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(AllFormacao, 'allformacao');
