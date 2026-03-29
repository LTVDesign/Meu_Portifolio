import { motion } from 'framer-motion';

import { styles } from '../constants/styles';

const SectionWrapper = (Component: React.ComponentType<any>, idName: string) =>
  function HOC(props: any) {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} relative z-0 w-full flex flex-col items-center scroll-mt-24 sm:scroll-mt-32`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component {...props} />
      </motion.section>
    );
  };

export default SectionWrapper;
