import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import uploadFile from "../utils/upload";

import { File, FileUploadResponse } from "../utils/interface";
import Toast from "react-bootstrap/Toast";
import { FcCheckmark } from "react-icons/fc";
import axios from "axios";

type UploadProps = {
  file: File;
  onUploadComplete: (uploadData: FileUploadResponse) => Promise<void>;
  onError: (errMsg: string, error?: Error) => void;
};

const Upload = ({ file, onUploadComplete, onError }: UploadProps) => {
  const [progress, setProgress] = useState(0);
  const fileSize = file.size;

  const updateProgress = (progressEvent: ProgressEvent) => {
    const progress = (progressEvent.loaded / fileSize) * 100;
    setProgress(progress);
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const startUpload = async () => {
      try {
        const uploadData = await uploadFile(file, updateProgress, source);
        onUploadComplete(uploadData);
      } catch (error) {
        console.error(error);
        onError("Something went wrong, Please reload the page and try again");
      }
    };
    startUpload();

    return () => source.cancel("Operation canceled by the user.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Toast>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">
          {progress === 100 ? UPLOADED : UPLOADING}
        </strong>
        <small className="text-muted">
          {progress === 100 && <FcCheckmark />}
        </small>
      </Toast.Header>

      {progress !== 100 && (
        <Toast.Body>
          <ProgressBar
            animated
            striped
            variant="success"
            now={progress}
            label={`${progress.toFixed()}%`}
          />
        </Toast.Body>
      )}
    </Toast>
  );
};

const UPLOADING = "Uploading file";

const UPLOADED = "Uploaded Successfully";

export default Upload;
