import { useAppSelector } from 'app/hooks';
import { Alert } from 'react-bootstrap';

const Alerts = () => {
  const status = useAppSelector((state) => state.uploadWether.status);
  const msg = useAppSelector((state) => state.uploadWether.msg);

  return (
    <>
      {status.isError ? (
        <Alert variant="danger" style={{ textAlign: 'center' }}>
          {msg.error}
        </Alert>
      ) : (
        status.isSuccess && (
          <Alert variant="success" style={{ textAlign: 'center' }}>
            {msg.success}
          </Alert>
        )
      )}
    </>
  );
};

export default Alerts;
