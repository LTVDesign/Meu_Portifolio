import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="error-page">
      <div className="error">
        <div className="wrap">
          <div className="404">
            <pre><code dangerouslySetInnerHTML={{
              __html: `
<span class="green"><!</span><span>DOCTYPE html</span><span class="green">></span>
<span class="orange"><html></span>
<span class="orange"><style></span>
* {t('notFound.everything')}:<span class="blue">${t('notFound.awesome')}</span>;
<span class="orange"></style></span>
<span class="orange"><body></span>
${t('notFound.error404')}
${t('notFound.fileNotFound')}
<span class="comment"><!--${t('notFileNotFoundComment')}--></span>
<span class="orange"></body></span>
<span class="orange"></html></span>
              `.trim()
            }} />
            </pre>
          </div>
        </div>
        <div className="info">
          <Link to="/" className="viewFull">{t('notFound.viewFull')}</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
