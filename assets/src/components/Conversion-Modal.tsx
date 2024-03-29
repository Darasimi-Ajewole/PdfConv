import Modal, { ModalProps } from "react-bootstrap/Modal";
import ToastContainer from "react-bootstrap/ToastContainer";
import Upload from "./Upload";
import Conversion from "./Converter";
import { File, FileUploadResponse } from "../utils/interface";

type ConversionModalProps = {
  file: File | null;
  blobName: string | null;
  modalProps: ModalProps;
  onUploadComplete: (uploadData: FileUploadResponse) => Promise<void>;
  onError: (errMsg: string, error?: Error) => void;
  cancelConversion: () => void;
};

const ConversionModal = (props: ConversionModalProps) => {
  return (
    <Modal
      {...props.modalProps}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={props.cancelConversion} />
      <Modal.Body>
        <ToastContainer>
          {props.file && (
            <Upload
              file={props.file}
              onUploadComplete={props.onUploadComplete}
              onError={props.onError}
            />
          )}
          {props.blobName && props.file && (
            <Conversion
              blobName={props.blobName}
              file={props.file}
              onError={props.onError}
            />
          )}
        </ToastContainer>
      </Modal.Body>
    </Modal>
  );
};

export default ConversionModal;
