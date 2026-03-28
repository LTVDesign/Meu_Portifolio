import { motion } from 'framer-motion';
import type React from 'react';
import Tilt from 'react-parallax-tilt';

import { services } from '../../constants';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <Tilt glareEnable tiltEnable tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="#aaa6c3">
    <div className="max-w-[250px] w-full xs:w-[250px]">
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary dark:bg-black-100 flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5">
          <img
            src={icon}
            alt={title}
            className="h-16 w-16 object-contain"
            loading="lazy"
            decoding="async"
          />

          <h3 className="text-center text-[20px] font-bold text-[var(--dynamic-text-color)]">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const AllCurriculo = ({ setViewMode }: { setViewMode: (mode: string) => void }) => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <div className="flex w-full justify-between items-center">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 text-[17px] leading-[30px]"
        >
          {config.sections.about.content}
        </motion.p>
        <button
          type="button"
          onClick={() => setViewMode?.('main')}
          className="bg-primary text-[var(--dynamic-text-color)] px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors mt-4"
        >
          Voltar
        </button>
      </div>

      <div className="mt-20 flex flex-wrap gap-10 max-sm:justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(AllCurriculo, 'allcurriculo');
