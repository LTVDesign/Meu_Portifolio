import { motion } from 'framer-motion';
import { testimonials } from '../../constants';
import { config } from '../../constants/config';
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
  return (
    <motion.div
      variants={fadeIn('', 'spring', index * 0.5, 0.75)}
      className='bg-black-200 xs:w-[320px] w-full rounded-3xl p-10'
    >
      <p className='text-[48px] font-black text-[var(--dynamic-text-color)]'>"</p>

      <div className='mt-1'>
        <p className='text-[18px] tracking-wider text-[var(--dynamic-text-color)]'>
          {testimonial}
        </p>

        <div className='mt-7 flex items-center justify-between gap-1'>
          <div className='flex flex-1 flex-col'>
            <p className='text-[16px] font-medium text-[var(--dynamic-text-color)]'>
              <span className='blue-text-gradient'>@</span> {name}
            </p>
            <p className='text-[var(--dynamic-text-secondary)] mt-1 text-[12px]'>
              {designation} de {company}
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
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className='bg-black-100 mt-12 rounded-[20px]'>
      <div className={`${styles.padding} bg-tertiary min-h-[300px] rounded-2xl`}>
        <Header useMotion={true} {...config.sections.feedbacks} />
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
