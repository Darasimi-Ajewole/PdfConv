import { StatusContext } from '../context/ConversionStatus';
import Toast from 'react-bootstrap/Toast';
import { useContext, useEffect } from 'react';
import { startConvertSession } from '../utils/convert';
import Spinner from 'react-bootstrap/Spinner';
import { FcCheckmark } from "react-icons/fc";

const STARTING = 'Starting Conversion';
const msg = {
  running: 'Converting your document to PDF',
  stasis: STARTING,
  success: 'Converted Successfully',
}

const Conversion = ({ blobName }) => {
  const { attachUpdateListener, taskStatusData } = useContext(StatusContext);

  useEffect(() => {
    const convert = async () => {
      const { taskStatusId } = await startConvertSession(blobName);
      attachUpdateListener(taskStatusId);
    }
    convert()
  }, [])



  return (
    <Toast>
      <Toast.Header>
        <strong className="me-auto">{taskStatusData ? msg[taskStatusData.status] : STARTING}</strong>
        <small className="text-muted">
          {
            !(taskStatusData && taskStatusData.status === 'success')
              ? <Spinner animation="border" /> : <FcCheckmark />
          }
        </small>
      </Toast.Header>
    </Toast>
  )
}

export default Conversion;