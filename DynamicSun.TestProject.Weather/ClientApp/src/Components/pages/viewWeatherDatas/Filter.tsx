import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import moment from 'moment';
import { useRef } from 'react';
import { getDataAsync, setFilter } from 'redux/view/viewSlice';
import './view.css';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрья',
  'Декабрь',
];
const Filter = () => {
  const weatherDatas = useAppSelector((state) => state.view.weatherDatas);
  const statusLoading = useAppSelector((state) => state.view.status);

  const currMonth = useRef<HTMLSelectElement>(null);
  const currYear = useRef<HTMLSelectElement>(null);

  const dispatch = useAppDispatch();

  const uniqYears = () => {
    let years = weatherDatas.map((item) => moment(item.dateTime).year()).sort();
    return Array.from(new Set(years));
  };

  const acceptFilterHandle = () => {
    //todo применить фильтр

    const year =
      currYear.current?.value === 'Не выбрано'
        ? undefined
        : Number(currYear.current?.value);

    const month =
      currMonth.current?.value === 'Не выбрано'
        ? undefined
        : months.indexOf(currMonth.current?.value!);

    dispatch(
      setFilter({
        year: year,
        month: month,
      })
    );
  };

  const clearFilterHanlde = () => {
    dispatch(
      setFilter({
        year: undefined,
        month: undefined,
      })
    );
  };

  return (
    <div className="view--control">
      <div className="view--control_select">
        <FormGroup>
          <FormLabel>Год</FormLabel>
          <FormSelect ref={currYear}>
            <option>Не выбрано</option>
            {uniqYears().map((item) => (
              <option key={item}>{item}</option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Месяц</FormLabel>
          <FormSelect ref={currMonth}>
            <option>Не выбрано</option>
            {months.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </FormSelect>
        </FormGroup>
      </div>
      <div className="view--control_btns">
        <div className="btns">
          <Button
            onClick={acceptFilterHandle}
            disabled={statusLoading.isLoading || statusLoading.isError}
          >
            Применить
          </Button>
          <Button
            onClick={clearFilterHanlde}
            disabled={statusLoading.isLoading || statusLoading.isError}
          >
            Все
          </Button>

          {statusLoading.isError && (
            <Button
              disabled={statusLoading.isLoading}
              onClick={() => dispatch(getDataAsync())}
            >
              Обновить данные
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
