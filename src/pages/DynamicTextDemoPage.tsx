import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DynamicText from '../components/atoms/DynamicText';

export default function DynamicTextDemoPage() {
  const { t } = useTranslation();
  const [bgColor, setBgColor] = useState('#ffffff');
  const [mode, setMode] = useState<'auto' | 'dark' | 'light' | 'high-contrast'>('auto');
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      {/* Botão toggle */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 9999,
          padding: '0.5rem',
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        ⚙️
      </button>

      {/* Painel */}
      {showPanel && (
        <div
          style={{
            position: 'fixed',
            top: '5rem',
            right: '1rem',
            width: '300px',
            maxHeight: 'calc(100vh - 8rem)',
            overflowY: 'auto',
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            zIndex: 9998,
          }}
        >
          <h3 style={{ marginBottom: '1rem' }}>{t('dynamicTextDemo.controlsLabel')}</h3>

          <div style={{ marginBottom: '1rem' }}>
            <p>{t('dynamicTextDemo.colorModeLabel')}</p>
            {(['auto', 'dark', 'light', 'high-contrast'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.5rem',
                  margin: '0.25rem 0',
                  background: mode === m ? '#0066cc' : '#444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <div>
            <p>{t('dynamicTextDemo.backgroundLabel')}</p>
            {[
              { label: t('dynamicTextDemo.white'), color: '#ffffff' },
              { label: t('dynamicTextDemo.black'), color: '#000000' },
              { label: t('dynamicTextDemo.blue'), color: '#0000ff' },
              { label: t('dynamicTextDemo.red'), color: '#ff0000' },
            ].map(({ label, color }) => (
              <button
                key={label}
                onClick={() => setBgColor(color)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.5rem',
                  margin: '0.25rem 0',
                  background: bgColor === color ? '#0066cc' : '#444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DynamicText como container principal com background color */}
      <DynamicText
        colorMode={mode}
        style={{
          backgroundColor: bgColor,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem',
        }}
      >
        <h1 className='text-4xl font-bold mb-4'>{t('dynamicTextDemo.pageTitle')}</h1>
        <p className='text-xl mb-4'>
          {t('dynamicTextDemo.pageDescription')}
        </p>
        <p className='text-lg mb-4'>
          {t('dynamicTextDemo.backgroundInfo', { bgColor, mode })}
        </p>
        <button className='px-6 py-3 border rounded'>{t('dynamicTextDemo.buttonText')}</button>
      </DynamicText>
    </>
  );
}
