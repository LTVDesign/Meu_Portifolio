import { motion } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const AllCursos = () => {
    const allCursos = [
        {
            id: '1',
            title: 'React - The Complete Guide',
            platform: 'Udemy',
            date: '2023',
            description: 'Curso completo de React do básico ao avançado, incluindo hooks, context API e Redux.',
            link: '#'
        },
        {
            id: '2',
            title: 'TypeScript for Professionals',
            platform: 'Coursera',
            date: '2023',
            description: 'TypeScript avançado com tipagem estática, generics e padrões de projeto.',
            link: '#'
        },
        {
            id: '3',
            title: 'Three.js Journey',
            platform: 'Three.js Journey',
            date: '2024',
            description: 'Desenvolvimento de experiências 3D na web com Three.js e WebGL.',
            link: '#'
        },
        {
            id: '4',
            title: 'Cybersecurity Fundamentals',
            platform: 'IBM',
            date: '2023',
            description: 'Fundamentos de cibersegurança, ethical hacking e proteção de redes.',
            link: '#'
        },
        {
            id: '5',
            title: 'Product Management',
            platform: 'University of Alberta',
            date: '2023',
            description: 'Gestão de produtos digitais, metodologias ágeis e estratégias de desenvolvimento.',
            link: '#'
        },
        {
            id: '6',
            title: 'Node.js - The Complete Guide',
            platform: 'Udemy',
            date: '2024',
            description: 'Desenvolvimento backend com Node.js, Express e MongoDB.',
            link: '#'
        }
    ];

    return (
        <div className="pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div variants={textVariant()} className="text-center mb-16">
                    <Header useMotion={false} p="Cursos Realizados" h2="Todos os Cursos e Especializações" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allCursos.map((curso) => (
                        <motion.div
                            key={curso.id}
                            variants={textVariant()}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="glass-card p-8 neon-hover flex flex-col"
                        >
                            <h3 className="text-2xl font-bold">{curso.title}</h3>
                            <p className="text-[var(--cyber-purple)] mt-2">{curso.platform}</p>
                            <p className="mt-4 text-[var(--text-secondary)] flex-1">{curso.description}</p>

                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm">
                                <span>{curso.date}</span>
                                <a href={curso.link} target="_blank" rel="noopener noreferrer" className="text-[var(--cyber-cyan)] hover:text-white">
                                    Ver Certificado →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionWrapper(AllCursos, 'all-cursos');
