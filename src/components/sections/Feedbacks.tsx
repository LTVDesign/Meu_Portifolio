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
      className='bg-black-200 w-full rounded-3xl p-[clamp(1.5rem,4vw,2.5rem)] flex flex-col justify-between'
    >
      <p className='text-[clamp(2rem,6vw,3rem)] font-black text-white leading-none'>"</p>

      <div className='mt-1 flex-1 flex flex-col justify-between'>
        <p className='text-[clamp(1rem,2vw,1.125rem)] tracking-wider text-white'>
          {t(testimonial)}
        </p>

        <div className='mt-[clamp(1.5rem,4vw,2rem)] flex items-center justify-between gap-[clamp(0.25rem,1vw,0.5rem)]'>
          <div className='flex flex-1 flex-col'>
            <p className='text-[clamp(0.875rem,2vw,1rem)] font-medium text-white'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='text-gray-400 mt-1 text-[clamp(0.75rem,1.5vw,0.875rem)]'>
              {t(designation)} {t('at')} {t(company)}
            </p>
          </div>

          <img
            src={image}
            alt={`feedback_by-${name}`}
            className='h-[clamp(2rem,4vw,2.5rem)] w-[clamp(2rem,4vw,2.5rem)] rounded-full object-cover'
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
    <div className='bg-black-100 mt-[clamp(2.5rem,8vw,4rem)] rounded-[20px]'>
      <div className='p-[clamp(1.5rem,5vw,3rem)] bg-tertiary min-h-[clamp(15rem,30vw,20rem)] rounded-2xl'>
        <Header useMotion={true} p={t('feedbacks.p')} h2={t('feedbacks.h2')} />
      </div>
      <div
        className='px-[clamp(1rem,4vw,2.5rem)] -mt-[clamp(3.5rem,10vw,5rem)] grid grid-cols-[repeat(auto-fit,minmax(clamp(16rem,22vw,22rem),1fr))] gap-[clamp(1rem,4vw,2rem)] pb-[clamp(2.5rem,6vw,3.5rem)] items-stretch justify-items-center'
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
