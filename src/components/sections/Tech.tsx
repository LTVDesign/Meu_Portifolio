import { technologies } from '../../constants';
import { SectionWrapper } from '../../hoc';

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          className="group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-tertiary p-4 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
          key={technology.name}
        >
          <img
            src={technology.icon}
            alt={technology.name}
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform duration-300 group-hover:rotate-12"
            loading="lazy"
          />
          <span className="pointer-events-none absolute -bottom-8 rounded-md bg-black-200 px-2 py-1 text-xs text-[var(--dynamic-text-color)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
            {technology.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, 'tech');
