// Componente de PC Gamer estático para mobile/tablet
const PCGamerStatic = () => (
  <div className='relative w-full max-w-3xl mx-auto flex items-center justify-center'>
    <img
      src='/assets/images/pc-gamer.webp'
      alt='PC Gamer Setup'
      className='w-full h-auto drop-shadow-2xl'
      width='128'
      height='84'
      loading='eager'
      fetchPriority='high'
      decoding='sync'
      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 128px'
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  </div>
);

export default PCGamerStatic;
