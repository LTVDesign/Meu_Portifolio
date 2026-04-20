import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0414a7] font-[VT323] text-[#e0e2f4]">
      <main className="container mx-auto w-[90%] max-w-[640px] pt-[10%]">
        <h1 className="neg title text-center text-[2.75rem]/1.05em">
          <span className="bg-[#aaaaaa] px-[15px] py-[2px] pb-[13px]">Error - 404</span>
        </h1>
        <p>{t('notFound.errorOccurred')}</p>
        <p>
          * {t('notFound.returnHome')}<br />
          * {t('notFound.sendEmail')}
        </p>
        <nav className="nav mt-[35px] text-center">
          <Link to="/" className="link px-[9px] py-[2px] pb-[8px] hover:bg-[#aaaaaa] hover:text-[#0414a7] transition-colors">
            {t('notFound.index')}
          </Link>
          &nbsp;|&nbsp;
          <a href={`mailto:${t('common.email')}`} className="link px-[9px] py-[2px] pb-[8px] hover:bg-[#aaaaaa] hover:text-[#0414a7] transition-colors">
            {t('notFound.webmaster')}
          </a>
        </nav>
      </main>
    </div>
  );
};

export default NotFoundPage;
