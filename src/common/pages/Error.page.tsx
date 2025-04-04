import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from '../components/Button';
import './Error.scss';

const Error = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  console.error(error);

  return (
    <main className="error">
      <h1>Aradığınız sayfaya ulaşılamıyor.</h1>
      <p>Sayfa kaldırılmış veya değiştirilmiş olabilir.</p>
      <Button onClick={() => navigate('/')}>Anasayfaya dön</Button>
    </main>
  );
};
export default Error;
