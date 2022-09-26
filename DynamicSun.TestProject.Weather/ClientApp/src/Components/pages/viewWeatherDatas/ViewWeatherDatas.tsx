import TableWeather from './TableWeather';
import './view.css';
import Filter from './Filter';

const ViewWeatherDatas = () => {
  return (
    <div className="view">
      <Filter />
      <TableWeather />
    </div>
  );
};

export default ViewWeatherDatas;
