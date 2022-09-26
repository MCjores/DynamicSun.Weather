import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './main.css';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="main-content" > 
        <Button onClick={() => navigate('/view')}>
          Просмотр архивов погодных условий в городе Москве
        </Button>
        <Button onClick={() => navigate('/upload')}>
          Загрузка архивов погодных условий в городе Москве
        </Button>
      </div>
    </div>
  );
};

export default Main;
