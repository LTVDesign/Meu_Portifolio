import { useTranslation } from 'react-i18next';
import { testimonials } from '../../constants';
import { m } from 'framer-motion';
import { styles } from '../../constants/styles';
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
      className='bg-black-200 xs:w-[320px] w-full rounded-3xl p-10'
    >
      <p className='text-[48px] font-black text-white'>"</p>

      <div className='mt-1'>
        <p className='text-[18px] tracking-wider text-white'>
          {t(testimonial)}
        </p>

        <div className='mt-7 flex items-center justify-between gap-1'>
          <div className='flex flex-1 flex-col'>
            <p className='text-[16px] font-medium text-white'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='text-gray-400 mt-1 text-[12px]'>
              {t(designation)} {t('at')} {t(company)}
            </p>
          </div>

          <img
            src={image}
            alt={`feedback_by-${name}`}
            className='h-10 w-10 rounded-full object-cover'
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
    <div className='bg-black-100 mt-12 rounded-[20px]'>
      <div className={`${styles.padding} bg-tertiary min-h-[300px] rounded-2xl`}>
        <Header useMotion={true} p={t('feedbacks.p')} h2={t('feedbacks.h2')} />
      </div>
      <div
        className={`${styles.paddingX} -mt-20 flex flex-wrap gap-7 pb-14 max-sm:justify-center items-center`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
