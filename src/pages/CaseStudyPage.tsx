import { useParams } from 'react-router-dom';
import CaseStudyLayout from '../components/layout/CaseStudyLayout';
import { getCaseStudyById } from '../constants/caseStudies';
import NotFoundPage from './NotFoundPage';

const CaseStudyPage = () => {
  const { id } = useParams<{ id: string }>();
  const study = id ? getCaseStudyById(id) : undefined;

  if (!study) {
    return <NotFoundPage />;
  }

  return <CaseStudyLayout data={study} />;
};

export default CaseStudyPage;
