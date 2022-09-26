import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sendDataAsync } from 'redux/upload/uploadSlice';
import Alerts from './Alerts';

import './upload.css';

const UploadWeatherDatas = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const status = useAppSelector((state) => state.uploadWether.status);

  const dispatch = useAppDispatch();

  const chooseFiles = (e: any) => {
    const data = new FormData();
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) data.append(files[i].name, files[i]);
    setSelectedFiles(files);
  };

  const sendHandle = () => {
    dispatch(sendDataAsync(selectedFiles));
  };

  return (
    <div className="upload">
      <div className="upload-content">
        <Form.Group>
          <Form.Label>Выберите файл с данными погодных условий</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={chooseFiles}
          />
        </Form.Group>

        <Button
          onClick={sendHandle}
          disabled={
            selectedFiles?.length === 0 ||
            selectedFiles === undefined ||
            status.isLoading
          }
        >
          {status.isLoading ? 'Отправляем...' : 'Отправить'}
        </Button>

        <Alerts />
      </div>
    </div>
  );
};

export default UploadWeatherDatas;
