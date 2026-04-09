// Componente de Globo Terrestre estático para mobile/tablet
const StaticGlobe = () => (
  <div className='relative w-full max-w-2xl mx-auto flex items-center justify-center'>
    <svg
      viewBox='0 0 400 400'
      className='w-full h-auto drop-shadow-2xl'
      xmlns='http://www.w3.org/2000/svg'
    >
      {/* Globo */}
      <circle
        cx='200'
        cy='200'
        r='150'
        fill='#0a0a1a'
        stroke='url(#globeGradient)'
        strokeWidth='4'
      />

      {/* Continentes simplificados */}
      <path
        d='M120,150 Q140,120 180,130 Q200,100 240,120 Q280,140 260,180 Q240,220 200,200 Q160,180 140,200 Q100,220 120,150'
        fill='#1a3a1a'
        opacity='0.8'
      />
      <path
        d='M200,180 Q230,160 260,180 Q280,220 260,260 Q240,300 200,280 Q160,260 140,280 Q120,240 140,200 Q160,180 200,180'
        fill='#1a3a1a'
        opacity='0.8'
      />
      <path
        d='M180,250 Q200,230 220,250 Q240,280 220,310 Q200,330 180,310 Q160,280 180,250'
        fill='#1a3a1a'
        opacity='0.8'
      />

      {/* Linhas de latitude */}
      <ellipse
        cx='200'
        cy='200'
        rx='150'
        ry='40'
        fill='none'
        stroke='#00ffff'
        strokeWidth='1'
        opacity='0.3'
      />
      <ellipse
        cx='200'
        cy='200'
        rx='150'
        ry='80'
        fill='none'
        stroke='#00ffff'
        strokeWidth='1'
        opacity='0.3'
      />
      <ellipse
        cx='200'
        cy='200'
        rx='150'
        ry='120'
        fill='none'
        stroke='#00ffff'
        strokeWidth='1'
        opacity='0.3'
      />

      {/* Linhas de longitude */}
      <line
        x1='200'
        y1='50'
        x2='200'
        y2='350'
        stroke='#ff00ff'
        strokeWidth='1'
        opacity='0.3'
      />
      <line
        x1='80'
        y1='200'
        x2='320'
        y2='200'
        stroke='#ff00ff'
        strokeWidth='1'
        opacity='0.3'
      />
      <line
        x1='116'
        y1='92'
        x2='284'
        y2='308'
        stroke='#ff00ff'
        strokeWidth='1'
        opacity='0.3'
      />
      <line
        x1='284'
        y1='92'
        x2='116'
        y2='308'
        stroke='#ff00ff'
        strokeWidth='1'
        opacity='0.3'
      />

      {/* Efeito de brilho */}
      <circle cx='200' cy='200' r='140' fill='url(#glowGradient)' opacity='0.1' />

      {/* Definições de Gradientes */}
      <defs>
        <linearGradient id='globeGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#00ffff' />
          <stop offset='50%' stopColor='#ff00ff' />
          <stop offset='100%' stopColor='#00ffff' />
        </linearGradient>
        <radialGradient id='glowGradient' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='#00ffff' stopOpacity='0.3' />
          <stop offset='100%' stopColor='#ff00ff' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export default StaticGlobe;
