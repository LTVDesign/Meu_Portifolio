import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import type { Certificado } from '../../types';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';
import { useTranslation } from 'react-i18next';

const Certificados = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  const { t } = useTranslation();

  // Lista de arquivos de certificados organizados por categoria
  const certificadosFiles: Certificado[] = [
    // Gerenciamento de Produtos - University of Alberta
    {
      name: t('certificates.list.0.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.0.institution'),
      description: t('certificates.list.0.description'),
    },
    {
      name: t('certificates.list.1.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.1.institution'),
      description: t('certificates.list.1.description'),
    },
    {
      name: t('certificates.list.2.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.2.institution'),
      description: t('certificates.list.2.description'),
    },
    {
      name: t('certificates.list.3.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.3.institution'),
      description: t('certificates.list.3.description'),
    },
    {
      name: t('certificates.list.4.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.4.institution'),
      description: t('certificates.list.4.description'),
    },
    {
      name: t('certificates.list.5.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.5.institution'),
      description: t('certificates.list.5.description'),
    },
    {
      name: t('certificates.list.6.name'),
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: t('certificates.list.6.institution'),
      description: t('certificates.list.6.description'),
    },

    // Certificações Google - Suporte em TI
    {
      name: t('certificates.list.7.name'),
      path: '/certificados/CertificadoProfissionaldeSuporteemTIdoGoogle_Badge20230225-28-1iiyqbg.pdf',
      institution: t('certificates.list.7.institution'),
      description: t('certificates.list.7.description'),
    },
    {
      name: t('certificates.list.8.name'),
      path: '/certificados/Suporte em TI do Google.pdf',
      institution: t('certificates.list.8.institution'),
      description: t('certificates.list.8.description'),
    },
    {
      name: t('certificates.list.9.name'),
      path: '/certificados/TechnicalSupportBasics_Badge20230225-28-ldlr1j.pdf',
      institution: t('certificates.list.9.institution'),
      description: t('certificates.list.9.description'),
    },
    {
      name: t('certificates.list.10.name'),
      path: '/certificados/Estrutura e Funcionamento das Redes de computadores.pdf',
      institution: t('certificates.list.10.institution'),
      description: t('certificates.list.10.description'),
    },
    {
      name: t('certificates.list.11.name'),
      path: '/certificados/Sistemas Operacionais e Você - Google.pdf',
      institution: t('certificates.list.11.institution'),
      description: t('certificates.list.11.description'),
    },
    {
      name: t('certificates.list.12.name'),
      path: '/certificados/Administração de Sistemas e Serviços de Infraestrutura de TI.pdf',
      institution: t('certificates.list.12.institution'),
      description: t('certificates.list.12.description'),
    },
    {
      name: t('certificates.list.13.name'),
      path: '/certificados/Defesa Contra as Artes Obscuras.pdf',
      institution: t('certificates.list.13.institution'),
      description: t('certificates.list.13.description'),
    },

    // Certificações IBM
    {
      name: t('certificates.list.14.name'),
      path: '/certificados/Introduction to Technical Support IBM.pdf',
      institution: t('certificates.list.14.institution'),
      description: t('certificates.list.14.description'),
    },
    {
      name: t('certificates.list.15.name'),
      path: '/certificados/Introduction to Scrum Master Profession.pdf',
      institution: t('certificates.list.15.institution'),
      description: t('certificates.list.15.description'),
    },

    // Desenvolvimento Web
    {
      name: t('certificates.list.16.name'),
      path: '/certificados/HTML, CSS, and Javascript for Web Developers.pdf',
      institution: t('certificates.list.16.institution'),
      description: t('certificates.list.16.description'),
    },

    // Cibersegurança
    {
      name: t('certificates.list.17.name'),
      path: '/certificados/Foundations of Cybersecurity.pdf',
      institution: t('certificates.list.17.institution'),
      description: t('certificates.list.17.description'),
    },
    {
      name: t('certificates.list.18.name'),
      path: '/certificados/Certificado - Nivelamento.pdf',
      institution: t('certificates.list.18.institution'),
      description: t('certificates.list.18.description'),
    },

    // Banco de Dados - Fundação Bradesco
    {
      name: t('certificates.list.19.name'),
      path: '/certificados/fundamentos de ti - Fundação Bradesco.pdf',
      institution: t('certificates.list.19.institution'),
      description: t('certificates.list.19.description'),
    },
    {
      name: t('certificates.list.20.name'),
      path: '/certificados/Implementando Banco de Dados - Fundação Bradesco.pdf',
      institution: t('certificates.list.20.institution'),
      description: t('certificates.list.20.description'),
    },
    {
      name: t('certificates.list.21.name'),
      path: '/certificados/Administrando Banco de Dados - Fundação Bradesco.pdf',
      institution: t('certificates.list.21.institution'),
      description: t('certificates.list.21.description'),
    },
    {
      name: t('certificates.list.22.name'),
      path: '/certificados/Segurança em Tecnologia da Informação - Fundação Bradesco.pdf',
      institution: t('certificates.list.22.institution'),
      description: t('certificates.list.22.description'),
    },

    // Marketing Digital - Google
    {
      name: t('certificates.list.23.name'),
      path: '/certificados/Exame de certificação no Search Ads 360  Google.pdf',
      institution: t('certificates.list.23.institution'),
      description: t('certificates.list.23.description'),
    },
    {
      name: t('certificates.list.24.name'),
      path: '/certificados/Waze Ads Fundamentals  Google certificado.pdf',
      institution: t('certificates.list.24.institution'),
      description: t('certificates.list.24.description'),
    },
    {
      name: t('certificates.list.25.name'),
      path: '/certificados/Google My Business  Google.pdf',
      institution: t('certificates.list.25.institution'),
      description: t('certificates.list.25.description'),
    },
    {
      name: t('certificates.list.26.name'),
      path: '/certificados/Creative Certification Exam _ Google.pdf',
      institution: t('certificates.list.26.institution'),
      description: t('certificates.list.26.description'),
    },

    // Atendimento e Ética - IPED
    {
      name: t('certificates.list.27.name'),
      path: '/certificados/Satisfação de clientes IPED.pdf',
      institution: t('certificates.list.27.institution'),
      description: t('certificates.list.27.description'),
    },
    {
      name: t('certificates.list.28.name'),
      path: '/certificados/Atendimento ao cliente IPED.pdf',
      institution: t('certificates.list.28.institution'),
      description: t('certificates.list.28.description'),
    },
    {
      name: t('certificates.list.29.name'),
      path: '/certificados/etica politica e cidadania.pdf',
      institution: t('certificates.list.29.institution'),
      description: t('certificates.list.29.description'),
    },
    {
      name: t('certificates.list.30.name'),
      path: '/certificados/Boas Práticas de Manipulação de Alimentos.pdf',
      institution: t('certificates.list.30.institution'),
      description: t('certificates.list.30.description'),
    },
  ];

  return (
    <>
      {/* Box de texto informativo com animação */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-16'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
          {/* Efeito de brilho animado no fundo */}
          <div className='absolute inset-0 opacity-30'>
            <motion.div
              className='absolute inset-0'
              style={{
                background:
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
              }}
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Conteúdo da box */}
          <div className='relative z-10'>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Header useMotion={true} {...config.sections.certificados} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-6 text-[17px] leading-[30px] text-center'
            >
              {config.sections.certificados.content}
            </motion.p>

            {/* Badges de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='flex flex-wrap justify-center gap-3 mt-8'
            >
              {[
                { text: t('certificates.badges.0.text'), color: 'from-blue-500 to-cyan-500' },
                { text: t('certificates.badges.1.text'), color: 'from-indigo-500 to-blue-500' },
                { text: t('certificates.badges.2.text'), color: 'from-purple-500 to-pink-500' },
                { text: t('certificates.badges.3.text'), color: 'from-red-500 to-orange-500' },
              ].map((badge, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                >
                  {badge.text}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Borda decorativa com glow */}
          <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
          <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
        </div>
      </motion.div>

      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center'>
        {certificadosFiles.slice(0, 6).map((certificado, index) => (
          <motion.div
            key={`certificado-${index}`}
            variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
            className='bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card'
          >
            <div className='mt-5'>
              <h3 className='text-[16px] font-bold text-white sm:text-[18px] text-center'>
                {certificado.name}
              </h3>
              {certificado.institution && (
                <p className='text-gray-300 text-[13px] text-center mt-2'>
                  {certificado.institution}
                </p>
              )}
              {certificado.description && (
                <p className='text-gray-400 text-[12px] text-center mt-2 leading-relaxed'>
                  {certificado.description}
                </p>
              )}
              <div className='mt-4 flex w-full justify-center'>
                <LinkAnimado
                  href={certificado.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-btn mt-4 text-[14px] px-6 py-2 text-center font-medium rounded-full'
                >
                  {t('certificates.viewAll')}
                </LinkAnimado>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {certificadosFiles.length > 6 && (
        <div className='mt-10 flex justify-center'>
          <button
            type='button'
            onClick={() => setViewMode?.('allcertificados')}
            className='glass-btn px-6 py-3 rounded-lg font-bold tracking-wider'
          >
            {t('allCertificados.loadMore')}
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Certificados, 'certificados');
