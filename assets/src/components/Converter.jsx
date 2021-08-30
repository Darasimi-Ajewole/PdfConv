import { StatusContext } from '../context/ConversionStatus';
import Toast from 'react-bootstrap/Toast';
import { useContext, useEffect } from 'react';
import { startConvertSession } from '../utils/convert';
import Spinner from 'react-bootstrap/Spinner';
import { FcCheckmark } from "react-icons/fc";
import Button from 'react-bootstrap/Button'

const Conversion = ({ blobName, file }) => {
  const { attachUpdateListener, taskStatusData, cancelConversion } = useContext(StatusContext);

  useEffect(() => {
    const convert = async () => {
      const { taskStatusId } = await startConvertSession(blobName, file.name.replace(extensionRegexExp, 'pdf'));
      attachUpdateListener(taskStatusId);
    }
    convert()
    return () => cancelConversion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <Toast>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">{taskStatusData ? msg[taskStatusData.status] : STARTING}</strong>
        <small className="text-muted">
          {
            !(taskStatusData?.status === 'success')
              ? <Spinner animation="border" /> : <FcCheckmark />
          }
        </small>
      </Toast.Header>
      {
        (taskStatusData?.status === 'success') && (
          <Toast.Body>
            <Button
              href={taskStatusData.download_url}
              download
              target='_blank'
              size="sm"
            >
              Download PDF
            </Button>
          </Toast.Body>)
      }
    </Toast>
  )
}

const STARTING = 'Starting Conversion';

const msg = {
  running: 'Converting your document to PDF',
  stasis: STARTING,
  success: 'Converted Successfully',
}

const extensionRegexExp = /(?<=(\.(?!.*\.))).*/;

export default Conversion;