import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn } from '../../utils/motion';

interface ProjectCardProps {
  project: {
    id?: string;
    title: string;
    description: string;
    image: string;
    tags?: string[];
    sourceCode: string;
    liveDemo?: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.07, 0.8)}
      className='glass-card group overflow-hidden flex flex-col h-full neon-hover'
    >
      <div className='relative h-64 overflow-hidden'>
        <img
          src={project.image}
          alt={project.title}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />
      </div>

      <div className='p-8 flex-1 flex flex-col'>
        <h3 className='text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors'>
          {project.title}
        </h3>

        <p className='mt-4 text-[var(--text-secondary)] line-clamp-4 flex-1'>
          {project.description}
        </p>

        {project.tags && (
          <div className='flex flex-wrap gap-2 mt-6'>
            {project.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className='text-xs px-4 py-1.5 bg-white/5 border border-white/10 rounded-full'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className='mt-auto pt-8 flex justify-center'>
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: '0 10px 40px rgba(0, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(project.sourceCode, '_blank', 'noopener,noreferrer')
            }
            className='relative px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden'
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/20 to-transparent'
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <span className='relative z-10'>{t('works.viewCode')}</span>
            <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
          </motion.button>
          {project.liveDemo && (
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: '0 10px 40px rgba(189, 0, 255, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(project.liveDemo, '_blank', 'noopener,noreferrer')
              }
              className='relative px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-purple)]/10 to-[var(--cyber-cyan)]/10 border border-[var(--cyber-purple)]/30 text-[var(--cyber-purple)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(189,0,255,0.2)] transition-all duration-300 overflow-hidden ml-4'
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-purple)]/20 to-transparent'
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className='relative z-10'>{t('works.viewDemo')}</span>
              <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-purple)]/0 group-hover/btn:border-[var(--cyber-purple)]/60 transition-all duration-300' />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
