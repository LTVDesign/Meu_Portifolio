import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

interface EducationCardProps {
  item: {
    id?: string;
    title: string;
    institution: string;
    period: string;
    description: string;
    logo?: string;
    status?: string;
    link?: string;
    disciplines?: string[];
  };
  index: number;
}

const EducationCard = ({ item, index }: EducationCardProps) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.07, 0.8)}
      className='glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover'
    >
      {/* Badge Status */}
      <div className='absolute -top-4 -right-4 px-6 py-2 text-xs font-bold rounded-2xl bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white shadow-lg z-10'>
        {item.status || 'CONCLUÍDO'}
      </div>

      <div className='flex items-start gap-6'>
        {item.logo && (
          <div className='w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center'>
            <img
              src={item.logo}
              alt={item.institution}
              className='w-14 h-14 object-contain'
            />
          </div>
        )}

        <div className='flex-1'>
          <h3 className='text-2xl font-bold leading-tight text-white group-hover:text-[var(--cyber-cyan)] transition-colors'>
            {item.title}
          </h3>
          <p className='text-[var(--cyber-purple)] font-medium mt-1'>
            {item.institution}
          </p>
          <p className='text-sm text-white/70 mt-1'>{item.period}</p>

          <p className='mt-6 text-[var(--text-secondary)] leading-relaxed flex-1'>
            {item.description}
          </p>

          {item.disciplines && item.disciplines.length > 0 && (
            <div className='mt-6 flex flex-wrap gap-2'>
              {item.disciplines.map((disc, i) => (
                <span
                  key={i}
                  className='text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full'
                >
                  {disc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {item.link && (
        <a
          href={item.link}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--cyber-cyan)] hover:text-white transition-colors'
        >
          Ver Diploma / Detalhes →
        </a>
      )}
    </motion.div>
  );
};

export default EducationCard;
