import { useAppDispatch, useAppSelector } from 'app/hooks';
import IWeatherData from 'models/Interface/IWeatherData';
import Pagination from 'Components/Paginator';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { clearData, getDataAsync } from 'redux/view/viewSlice';
import './view.css';

const pageSize = 10;

const TableWeather = () => {
  const dispatch = useAppDispatch();
  const { weatherDatas, filter, status } = useAppSelector(
    (state) => state.view
  );

  const [viewWeatherDatas, setViewData] = useState<Array<IWeatherData>>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return viewWeatherDatas.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, viewWeatherDatas]);

  useEffect(() => {
    dispatch(getDataAsync());

    return () => {
      dispatch(clearData());
    };
  }, []);

  const withFilter = () => {
    let data = [...weatherDatas];
    //Нет фильтров
    if (!!!(filter.month! + 1) && !!!filter.year) {
    }

    // по годам
    if (!!!(filter.month! + 1) && filter.year) {
      data = weatherDatas.filter(
        (item) => moment(item.dateTime).year() === filter.year!
      );
    }

    //по месяцам
    if (filter.month! + 1 && !!!filter.year) {
      data = weatherDatas.filter(
        (item) => moment(item.dateTime).month() === filter.month!
      );
    }

    //по году и месяцу
    if (filter.month! + 1 && filter.year) {
      data = weatherDatas.filter(
        (item) =>
          moment(item.dateTime).month() === filter.month! &&
          moment(item.dateTime).year() === filter.year!
      );
    }

    setViewData(sortData(data));
  };

  const sortData = (data: Array<IWeatherData>): Array<IWeatherData> =>
    data!.sort((a, b) => {
      if (a.dateTime < b.dateTime) return -1;

      if (a.dateTime > b.dateTime) return 1;

      return 0;
    });

  useEffect(() => {
    withFilter();
    setCurrentPage(1);
  }, [filter, weatherDatas]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>DateTime</th>
            <th>Temp</th>
            <th>Wet</th>
            <th>Td</th>
            <th>AtmPressure</th>
            <th>WindDirection</th>
            <th>WindSpeed</th>
            <th>Сloudiness</th>
            <th>H</th>
            <th>VV</th>
            <th>Phenomen</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((data) => (
            <tr key={data.dateTime}>
              <td>{moment(data.dateTime).format('DD-MM-yyyy HH:mm')}</td>
              <td>{data.temp}</td>
              <td>{data.wet}</td>
              <td>{data.td}</td>
              <td>{data.atmPressure}</td>
              <td>{data.windDirection}</td>
              <td>{data.windSpeed}</td>
              <td>{data.сloudiness}</td>
              <td>{data.h}</td>
              <td>{data.vv}</td>
              <td>{data.phenomen}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {currentTableData.length === 0 && (
        <span>
          {status.isError ? 'Ошибка получения данных' : 'Собираю данные...'}
        </span>
      )}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={viewWeatherDatas.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default TableWeather;
