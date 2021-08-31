import DropContainer from './Drop-Container';
import { ToastContainer, toast } from 'react-toastify';
import StatusContextProvider from '../context/ConversionStatus';
import ConversionModal from './Conversion-Modal';
import { useState } from 'react';

const Main = () => {
	const [file, setFile] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [blobName, setBlobName] = useState(null);

	const handleFileChange = (file) => {
		setFile(file)
		setShowModal(true);
	}

	const onUploadComplete = async (uploadData) => {
		const { blobName } = uploadData;
		setBlobName(blobName);
	}

	const cancelConversion = () => {
		setFile(null);
		setShowModal(null);
		setBlobName(null);
	}

	const onError = (errMsg, error) => {
		setShowModal(false);
		toast.error(errMsg);
		console.error(error);
	}

	return (
		<>
			<main className="container text-center">
				<div className="wrapper wow fadeInUp delay-05s">
					<StatusContextProvider>
						<DropContainer handleChange={handleFileChange} />
						<ConversionModal
							file={file}
							blobName={blobName}
							modalProps={{ show: showModal }}
							onUploadComplete={onUploadComplete}
							onError={onError}
							cancelConversion={cancelConversion}
						/>
						<ToastContainer theme="light" />
					</StatusContextProvider>
				</div>
			</main>
		</>
	)
}

export default Main;