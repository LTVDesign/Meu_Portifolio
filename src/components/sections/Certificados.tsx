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
    // Cibersegurança - Hackers do Bem (com validação)
    {
      name: t('certificates.list.18.name'),
      path: '/certificados/Certificado - Nivelamento.pdf',
      institution: t('certificates.list.18.institution'),
      description: t('certificates.list.18.description'),
      date: '2024',
      courseLink: 'https://hackersdobem.org.br/',
      validationLink: 'https://ava.hackersdobem.org.br/mod/customcert/verify_certificate.php?contextid=366&code=EzFXn4WcDw&qrcode=1',
      authCode: 'EzFXn4WcDw'
    },

    // Banco de Dados - Fundação Bradesco (com validação)
    {
      name: t('certificates.list.20.name'),
      path: '/certificados/Implementando Banco de Dados - Fundação Bradesco.pdf',
      institution: t('certificates.list.20.institution'),
      description: t('certificates.list.20.description'),
      date: '2024',
      workload: '20 horas',
      courseLink: 'https://www.ev.org.br/trilhas-de-conhecimento/banco-de-dados',
      validationLink: 'https://www.ev.org.br/validar-certificado',
      authCode: 'AD76C8BE-50C2-46A8-84B1-81078939B923'
    },
    {
      name: t('certificates.list.21.name'),
      path: '/certificados/Administrando Banco de Dados - Fundação Bradesco.pdf',
      institution: t('certificates.list.21.institution'),
      description: t('certificates.list.21.description'),
      date: '2024',
      workload: '20 horas',
      courseLink: 'https://www.ev.org.br/trilhas-de-conhecimento/banco-de-dados',
      validationLink: 'https://www.ev.org.br/validar-certificado',
      authCode: 'AD76C8BE-50C2-46A8-84B1-81078939B923'
    },

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
      date: '2024',
      workload: 'Cerca de 120 horas',
      courseLink: 'https://www.coursera.org/professional-certificates/google-it-support',
      validationLink: 'https://www.credly.com/badges/b573280d-6af1-4a73-8cf2-c1e434693c9f/print',
      authCode: 'b573280d-6af1-4a73-8cf2-c1e434693c9f'
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
      date: '2024',
      workload: '120 horas',
      courseLink: 'https://www.coursera.org/professional-certificates/google-it-support',
      validationLink: 'https://www.coursera.org/account/accomplishments/verify/XQUDR4SCZEYA',
      authCode: 'XQUDR4SCZEYA'
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

    // Banco de Dados - Fundação Bradesco (apenas o de fundamentos, sem os de implementação/administração que já estão no topo)
    {
      name: t('certificates.list.19.name'),
      path: '/certificados/fundamentos de ti - Fundação Bradesco.pdf',
      institution: t('certificates.list.19.institution'),
      description: t('certificates.list.19.description'),
    },

    // Segurança de TI - Fundação Bradesco (índice 22)
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
        className='mb-8 sm:mb-16'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
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
              className='text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 sm:mt-6 text-[14px] sm:text-[17px] leading-[26px] sm:leading-[30px] text-center'
            >
              {config.sections.certificados.content}
            </motion.p>

            {/* Badges de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='flex flex-wrap justify-center gap-2 sm:gap-3 mt-5 sm:mt-8'
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
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
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

      <div className='mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 md:gap-10 justify-items-center'>
        {certificadosFiles.slice(0, 6).map((certificado, index) => (
          <motion.div
            key={`certificado-${index}`}
            variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
            className='bg-tertiary w-full rounded-2xl p-5 sm:p-8 hover:scale-[1.02] sm:hover:scale-105 transition-transform shadow-card relative overflow-hidden group'
          >
            {/* Efeito de borda glow no hover */}
            <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--cyber-cyan)]/50 transition-all duration-500 pointer-events-none' />

            <div className='mt-5 relative z-10'>
              <h3 className='text-[16px] font-bold text-white sm:text-[18px] text-center leading-tight'>
                {certificado.name}
              </h3>
              {certificado.institution && (
                <p className='text-gray-300 text-[13px] text-center mt-2 flex items-center justify-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' />
                  </svg>
                  {certificado.institution}
                </p>
              )}
              {certificado.description && (
                <p className='text-gray-400 text-[12px] text-center mt-3 leading-relaxed'>
                  {certificado.description}
                </p>
              )}

              {/* Informações adicionais - Data e Carga Horária */}
              {(certificado.date || certificado.workload) && (
                <div className='flex justify-center gap-4 mt-4 flex-wrap'>
                  {certificado.date && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyber-purple)]/20 border border-[var(--cyber-purple)]/30 text-[11px] text-[var(--cyber-purple)]'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                      </svg>
                      {certificado.date}
                    </span>
                  )}
                  {certificado.workload && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--cyber-cyan)]/20 border border-[var(--cyber-cyan)]/30 text-[11px] text-[var(--cyber-cyan)]'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      {certificado.workload}
                    </span>
                  )}
                </div>
              )}

              {/* Botão principal - Ver Certificado */}
              <div className='mt-5 flex w-full justify-center'>
                <LinkAnimado
                  href={certificado.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-btn text-[13px] px-6 py-2.5 text-center font-medium rounded-full min-h-[44px] flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/20 border border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/60 hover:from-[var(--cyber-purple)]/30 hover:to-[var(--cyber-cyan)]/30 transition-all duration-300'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  {t('certificates.viewAll')}
                </LinkAnimado>
              </div>

              {/* Links de validação e curso - apenas para certificados com essas informações */}
              {(certificado.validationLink || certificado.courseLink) && (
                <div className='mt-4 pt-4 border-t border-[var(--cyber-cyan)]/10'>
                  <p className='text-[10px] text-gray-500 text-center mb-3 uppercase tracking-wider'>
                    {t('certificados.verificationCourse')}
                  </p>
                  <div className='flex flex-col gap-2'>
                    {certificado.courseLink && (
                      <LinkAnimado
                        href={certificado.courseLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[11px] px-4 py-2 text-center font-medium rounded-lg min-h-[36px] flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-500/50 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 text-blue-300'
                      >
                        <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        {t('certificados.knowledgeTrack')}
                      </LinkAnimado>
                    )}
                    {certificado.validationLink && certificado.authCode && (
                      <div className='relative'>
                        <LinkAnimado
                          href={certificado.validationLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-[11px] px-4 py-2 text-center font-medium rounded-lg min-h-[36px] flex items-center justify-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500/50 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 text-green-300'
                        >
                          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                          </svg>
                          {t('certificados.validateAuthenticity')}
                        </LinkAnimado>
                        {/* Código de autenticidade tooltip */}
                        <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 min-w-max'>
                          <p className='text-[10px] text-gray-300 text-center whitespace-nowrap'>
                            Código: {certificado.authCode}
                          </p>
                          <div className='absolute top-full left-1/2 transform -translate-x-1/2 -mt-1'>
                            <div className='border-4 border-transparent border-t-gray-900'></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {certificadosFiles.length > 6 && (
        <div className='mt-10 flex justify-center'>
          <button
            type='button'
            onClick={() => setViewMode?.('allcertificados')}
            className='glass-btn px-5 sm:px-6 py-3 rounded-lg font-bold tracking-wider min-h-[44px]'
          >
            {t('allCertificados.loadMore')}
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Certificados, 'certificados');
