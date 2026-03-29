import { motion } from 'framer-motion';
import { technologies } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';

const Tech = () => {
  // Agrupar tecnologias por categoria
  const groupedTechnologies = technologies.reduce(
    (acc, tech) => {
      const category = tech.category || 'Outros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tech);
      return acc;
    },
    {} as Record<string, typeof technologies>
  );

  const categories = Object.keys(groupedTechnologies);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4">
      {/* Título da seção */}
      <motion.div variants={textVariant()} className="text-center">
        <h2 className="text-[clamp(1.8rem,6vw,3.5rem)] font-bold text-[var(--dynamic-text-color)] mb-4 tracking-tight">
          Tecnologias & Linguagens
        </h2>
        <p className="text-[clamp(0.9rem,2.5vw,1.1rem)] text-[var(--dynamic-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Um ecossistema de ferramentas e linguagens que utilizo para construir soluções robustas,
          seguras e inovadoras.
        </p>
      </motion.div>

      {/* Renderização por Categoria */}
      {categories.map((category, catIndex) => (
        <div key={category} className="flex flex-col gap-4">
          <motion.div
            variants={fadeIn('right', 'spring', catIndex * 0.2, 0.75)}
            className="flex items-center gap-4"
          >
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#915EFF] to-transparent rounded-full" />
            <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] font-semibold text-white/90 tracking-wide">
              {category}
            </h3>
          </motion.div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {groupedTechnologies[category].map((technology, index) => (
              <motion.div
                key={technology.name}
                variants={fadeIn('up', 'spring', catIndex * 0.1 + index * 0.05, 0.5)}
                className="group relative"
              >
                {/* Efeito Glow de Fundo */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#915EFF] to-[#FF00FF] rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500" />

                {/* Container do Ícone */}
                <div className="relative flex h-[clamp(3.5rem,10vw,5rem)] w-[clamp(3.5rem,10vw,5rem)] items-center justify-center rounded-2xl bg-[#1d1836]/80 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className="h-[clamp(2rem,6vw,3rem)] w-[clamp(2rem,6vw,3rem)] object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 filter grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />

                  {/* Tooltip personalizado */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 rounded-lg bg-black/90 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                    {technology.name}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, 'tech');
