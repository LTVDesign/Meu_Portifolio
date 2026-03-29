import type React from 'react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import { experiences } from '../../constants';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import type { TExperience } from '../../types';
import { Header } from '../atoms/Header';

const ExperienceCard: React.FC<TExperience> = ({
  title,
  companyName,
  icon,
  iconBg,
  date,
  points,
}) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgba(21, 16, 48, 0.7)',
        color: 'var(--dynamic-text-color)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(145, 94, 255, 0.2)',
        borderRadius: '24px',
        boxShadow:
          '0 10px 40px -10px rgba(145, 94, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.02)',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(145, 94, 255, 0.2)' }}
      date={date}
      iconStyle={{ background: iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={icon}
            alt={companyName}
            className="h-[60%] w-[60%] object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      }
    >
      <div className="text-center flex flex-col items-center">
        <h3 className="text-[clamp(1.2rem,4vw,1.5rem)] font-bold text-[var(--dynamic-text-color)]">{title}</h3>
        <p
          className="text-[var(--dynamic-text-secondary)] text-[clamp(0.9rem,2vw,1.1rem)] font-semibold"
          style={{ margin: 0 }}
        >
          {companyName}
        </p>
      </div>

      <ul className="ml-5 mt-4 list-disc space-y-1">
        {points.map((point, index) => (
          <li
            key={index}
            className="text-[var(--dynamic-text-secondary)] pl-1 text-[clamp(0.8rem,2vw,0.9rem)] leading-snug tracking-normal"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.slice(0, showAll ? experiences.length : 4).map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
        {experiences.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="mt-10 self-center px-6 py-3 bg-tertiary text-[var(--dynamic-text-color)] rounded-lg hover:bg-secondary transition-colors"
          >
            {showAll ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
