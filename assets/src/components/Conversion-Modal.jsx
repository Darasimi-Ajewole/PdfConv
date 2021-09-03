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
      <Modal.Header closeButton onHide={props.cancelConversion} />
      <Modal.Body>
        <ToastContainer>
          {
            props.file &&
            <Upload
              file={props.file}
              onUploadComplete={props.onUploadComplete}
              onError={props.onError}
            />
          }
          {
            props.blobName &&
            <Conversion
              blobName={props.blobName}
              file={props.file}
              onError={props.onError}
            />
          }
        </ToastContainer>
      </Modal.Body>
    </Modal>
  );
}

export default ConversionModal