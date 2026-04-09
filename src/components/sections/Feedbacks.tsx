import { useTranslation } from 'react-i18next';
import { testimonials } from '../../constants';
import { m } from 'framer-motion';

import type { TTestimonial } from '../../types';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const FeedbackCard: React.FC<{ index: number } & TTestimonial> = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => {
  const { t } = useTranslation();
  return (
    <m.div
      variants={fadeIn('', 'spring', index * 0.5, 0.75)}
      className='glass-card w-full rounded-3xl p-[var(--fluid-space-l)] flex flex-col justify-between'
    >
      <p className='text-[var(--fluid-text-3xl)] font-black text-white leading-none'>"</p>

      <div className='mt-1 flex-1 flex flex-col justify-between'>
        <p className='text-[var(--fluid-text-base)] tracking-wider text-white'>
          {t(testimonial)}
        </p>

        <div className='mt-[var(--fluid-space-l)] flex items-center justify-between gap-[var(--fluid-space-xs)]'>
          <div className='flex flex-1 flex-col'>
            <p className='text-[var(--fluid-text-base)] font-medium text-white'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='text-gray-400 mt-1 text-[var(--fluid-text-sm)]'>
              {t(designation)} {t('at')} {t(company)}
            </p>
          </div>

          <img
            src={image}
            alt={`feedback_by-${name}`}
            className='h-[var(--fluid-space-l)] w-[var(--fluid-space-l)] rounded-full object-cover'
            loading='lazy'
            decoding='async'
          />
        </div>
      </div>
    </m.div>
  );
};

const Feedbacks = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-black-100 mt-[var(--fluid-space-xl)] rounded-[20px]'>
      <div className='p-[var(--fluid-space-l)] bg-tertiary min-h-[var(--fluid-space-2xl)] rounded-2xl'>
        <Header useMotion={true} p={t('feedbacks.p')} h2={t('feedbacks.h2')} />
      </div>
      <div
        className='px-[var(--fluid-space-l)] -mt-[var(--fluid-space-2xl)] grid grid-cols-[repeat(auto-fit,minmax(clamp(16rem,22vw,22rem),1fr))] gap-[var(--fluid-space-l)] pb-[var(--fluid-space-xl)] items-stretch justify-items-center'
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
