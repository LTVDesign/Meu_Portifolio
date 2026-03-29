import { motion } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const AllCertificados = () => {
  const allCertificados = [
    {
      id: '1',
      title: 'React Developer',
      issuer: 'Meta',
      date: '2023',
      image: '/assets/certificados/react-cert.png',
      link: '#'
    },
    {
      id: '2',
      title: 'TypeScript Specialist',
      issuer: 'Microsoft',
      date: '2023',
      image: '/assets/certificados/typescript-cert.png',
      link: '#'
    },
    {
      id: '3',
      title: 'Three.js Developer',
      issuer: 'Three.js',
      date: '2024',
      image: '/assets/certificados/threejs-cert.png',
      link: '#'
    },
    {
      id: '4',
      title: 'Cybersecurity Fundamentals',
      issuer: 'IBM',
      date: '2023',
      image: '/assets/certificados/cybersec-cert.png',
      link: '#'
    },
    {
      id: '5',
      title: 'Product Management',
      issuer: 'University of Alberta',
      date: '2023',
      image: '/assets/certificados/product-cert.png',
      link: '#'
    },
    {
      id: '6',
      title: 'Node.js Backend',
      issuer: 'OpenJS Foundation',
      date: '2024',
      image: '/assets/certificados/nodejs-cert.png',
      link: '#'
    }
  ];

  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={textVariant()} className="text-center mb-16">
          <Header useMotion={false} p="Certificações" h2="Todas as Certificações" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCertificados.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={textVariant()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="glass-card p-8 neon-hover flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden border border-white/10">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold">{cert.title}</h3>
              <p className="text-[var(--cyber-purple)] mt-2">{cert.issuer}</p>
              <p className="text-sm text-white/70 mt-1">{cert.date}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 btn-primary text-sm px-8 py-3"
              >
                Ver Certificado
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(AllCertificados, 'all-certificados');