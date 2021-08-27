import ProgressBar from 'react-bootstrap/ProgressBar'
import { useEffect, useState } from 'react'
import uploadFile from '../utils/upload';
import Toast from 'react-bootstrap/Toast';
import { FcCheckmark } from "react-icons/fc";

const UPLOADING = 'Uploading file';

const UPLOADED = 'Uploaded Successfully';

const Upload = ({ file, onUploadComplete }) => {
  const [progress, setProgress] = useState(0);
  const fileSize = file.size

  const updateProgress = (progressEvent) => {
    const progress = (progressEvent.loaded / fileSize) * 100
    setProgress(progress)
  }

  useEffect(() => {
    const startUpload = async () => {
      const uploadData = await uploadFile(file, updateProgress);

      onUploadComplete(uploadData);
    }
    startUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Toast>
      <Toast.Header>
        <strong className="me-auto">{progress === 100 ? UPLOADED : UPLOADING}</strong>
        <small className="text-muted">{progress === 100 && <FcCheckmark />}</small>
      </Toast.Header>

      {
        progress !== 100 && (
          <Toast.Body>
            <ProgressBar
              animated
              striped
              variant="success"
              now={progress}
              label={`${progress.toFixed()}%`}
            />
          </Toast.Body>)
      }

    </Toast>

  )
}

export default Upload