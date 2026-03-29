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
            className="glass-card group overflow-hidden flex flex-col h-full neon-hover"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors">
                    {project.title}
                </h3>

                <p className="mt-4 text-[var(--text-secondary)] line-clamp-4 flex-1">
                    {project.description}
                </p>

                {project.tags && (
                    <div className="flex flex-wrap gap-2 mt-6">
                        {project.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="text-xs px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-8 flex gap-4">
                    <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('works.viewCode')} - ${project.title}`}
                        className="flex-1 py-4 text-center border border-white/20 hover:border-[var(--cyber-purple)] rounded-2xl text-sm font-medium transition-all"
                    >
                        {t('works.viewCode')}
                    </a>
                    {project.liveDemo && (
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t('works.viewDemo')} - ${project.title}`}
                            className="flex-1 py-4 text-center bg-gradient-to-r from-[var(--cyber-purple)]/20 hover:from-[var(--cyber-purple)]/40 border border-[var(--cyber-purple)]/30 rounded-2xl text-sm font-medium transition-all"
                        >
                            {t('works.viewDemo')}
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;