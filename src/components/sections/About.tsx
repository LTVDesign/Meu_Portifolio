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
  description?: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon, description }) => (
  <Tilt glareEnable tiltEnable tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="#aaa6c3">
    <div className="max-w-[250px] w-full xs:w-[250px]">
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary dark:bg-black-100 flex min-h-[400px] flex-col items-center justify-center gap-10 rounded-[20px] px-14 py-20">
          <img
            src={icon}
            alt={title}
            className="h-14 w-14 object-contain mb-6"
            loading="lazy"
            decoding="async"
          />

          <div className="flex flex-col gap-4">
            <h3 className="text-center text-[18px] font-bold text-[var(--dynamic-text-color)] leading-tight px-2">
              {title}
            </h3>
            {description && (
              <p className="text-secondary text-center text-[11px] leading-[18px] opacity-80 px-6">
                {description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 text-[17px] leading-[30px] text-center whitespace-pre-line"
      >
        {config.sections.about.content}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 justify-center items-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
