import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const AllCertificados = () => {
  const { t } = useTranslation();

  const allCertificados = [
    {
      id: '1',
      title: t('allCertificados.list.0.title'),
      issuer: t('allCertificados.list.0.issuer'),
      date: t('allCertificados.list.0.date'),
      image: '/assets/certificados/react-cert.png',
      link: '#',
    },
    {
      id: '2',
      title: t('allCertificados.list.1.title'),
      issuer: t('allCertificados.list.1.issuer'),
      date: t('allCertificados.list.1.date'),
      image: '/assets/certificados/typescript-cert.png',
      link: '#',
    },
    {
      id: '3',
      title: t('allCertificados.list.2.title'),
      issuer: t('allCertificados.list.2.issuer'),
      date: t('allCertificados.list.2.date'),
      image: '/assets/certificados/threejs-cert.png',
      link: '#',
    },
    {
      id: '4',
      title: t('allCertificados.list.3.title'),
      issuer: t('allCertificados.list.3.issuer'),
      date: t('allCertificados.list.3.date'),
      image: '/assets/certificados/cybersec-cert.png',
      link: '#',
    },
    {
      id: '5',
      title: t('allCertificados.list.4.title'),
      issuer: t('allCertificados.list.4.issuer'),
      date: t('allCertificados.list.4.date'),
      image: '/assets/certificados/product-cert.png',
      link: '#',
    },
    {
      id: '6',
      title: t('allCertificados.list.5.title'),
      issuer: t('allCertificados.list.5.issuer'),
      date: t('allCertificados.list.5.date'),
      image: '/assets/certificados/nodejs-cert.png',
      link: '#',
    },
  ];

  return (
    <div className='pt-20 pb-32'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div variants={textVariant()} className='text-center mb-16'>
          <Header
            useMotion={false}
            p={t('allCertificados.subtitle')}
            h2={t('allCertificados.title')}
          />
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {allCertificados.map((cert) => (
            <motion.div
              key={cert.id}
              variants={textVariant()}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
              className='glass-card p-8 neon-hover flex flex-col items-center text-center'
            >
              <div className='w-24 h-24 mb-6 rounded-2xl overflow-hidden border border-white/10'>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className='w-full h-full object-contain'
                />
              </div>
              <h3 className='text-xl font-bold'>{cert.title}</h3>
              <p className='text-[var(--cyber-purple)] mt-2'>{cert.issuer}</p>
              <p className='text-sm text-white/70 mt-1'>{cert.date}</p>
              <a
                href={cert.link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-8 glass-btn text-sm px-6 py-2 rounded-full flex items-center justify-center'
              >
                {t('courses.viewCertificate')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(AllCertificados, 'all-certificados');
