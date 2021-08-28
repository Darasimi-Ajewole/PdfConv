import Modal from 'react-bootstrap/Modal';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Upload from './Upload';
import Conversion from './Converter';
const ConversionModal = (props) => {
  return (
    <Modal
      {...props.modalProps}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <ToastContainer>
          {props.file && <Upload file={props.file} onUploadComplete={props.onUploadComplete} />}
          {props.blobName && <Conversion blobName={props.blobName} file={props.file} />}
        </ToastContainer>
      </Modal.Body>
    </Modal>
  );
}

export default ConversionModal