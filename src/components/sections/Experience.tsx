import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const Experience = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div variants={textVariant()} className="text-center mb-16">
        <Header useMotion={true} {...config.sections.experience} />
      </motion.div>

      <div className="space-y-8">
        {[
          {
            title: 'Técnico de Informática Nível 2',
            company: 'Autônomo',
            period: '2020 - Presente',
            description: 'Suporte técnico de alto nível, infraestrutura de redes, Microsoft Entra ID e gestão de ambientes 365. Resolução de problemas complexos e implementação de soluções tecnológicas.',
            technologies: ['Microsoft 365', 'Entra ID', 'Redes', 'Suporte Técnico']
          },
          {
            title: 'Desenvolvedor Full Stack',
            company: 'Freelancer',
            period: '2022 - Presente',
            description: 'Desenvolvimento de aplicações web modernas com React, Node.js e TypeScript. Criação de soluções inovadoras e interfaces responsivas.',
            technologies: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS']
          },
          {
            title: 'Especialista em Cibersegurança',
            company: 'Programa Hackers do Bem',
            period: '2023',
            description: 'Formação avançada em cibersegurança, ethical hacking e proteção de infraestruturas digitais. Análise de vulnerabilidades e implementação de medidas de segurança.',
            technologies: ['Cibersegurança', 'Ethical Hacking', 'Análise de Vulnerabilidades']
          }
        ].map((exp, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card p-8 md:p-10 neon-hover flex flex-col md:flex-row gap-8 relative overflow-hidden"
          >
            {/* Período */}
            <div className="md:w-52 flex-shrink-0">
              <div className="text-sm font-mono text-[var(--cyber-cyan)] tracking-widest">
                {exp.period}
              </div>
              <div className="mt-2 text-white/70 text-sm">{exp.company}</div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{exp.title}</h3>

              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {exp.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {exp.technologies.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, 'experiencia');