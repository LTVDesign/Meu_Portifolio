// Componente de PC Gamer estático para mobile/tablet
const PCGamerStatic = () => (
  <div className='relative w-full max-w-3xl mx-auto flex items-center justify-center'>
    <img
      src='/assets/images/pc-gamer.webp'
      alt='PC Gamer Setup'
      className='w-full h-auto drop-shadow-2xl'
      width='600'
      height='600'
      loading='lazy'
    />
  </div>
);

export default PCGamerStatic;
