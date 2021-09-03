import { useRef } from 'react';
import { validateFileSize, validateMimeType } from '../utils/validate';
import { toast } from 'react-toastify';

const Container = (props) => {
	const uploadRef = useRef(null);

	const handleChange = (file) => {
		const validSize = validateFileSize(file);
		if (!validSize) {
			toast.error('Uploaded document too large, Maximum Size is 100MB')
			return
		}

		const validType = validateMimeType(file);
		if (!validType) {
			toast.error('Oops, Unsupported document format')
			return
		}

		const { handleChange } = props;
		handleChange(file)
	}

	const handleFileChange = (event) => {
		const { files } = event.target;
		handleChange(files[0]);
		event.target.value = '';
	}

	const handleDragEnter = (event) => event.preventDefault();

	const handleDrop = (event) => {
		event.preventDefault();
		const { files } = event.dataTransfer;
		handleChange(files)
	}

	const handleContainerClick = (event) => {
		if (event.target.tagName === "INPUT") return
		const file = uploadRef.current;
		file.click();
	}

	return (
		<div
			className="image-upload-wrap"
			onClick={handleContainerClick}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragEnter}
			onDrop={handleDrop}
		>
			<form>
				<fieldset>
					<input
						className="file-upload-input"
						type="file"
						onChange={handleFileChange}
						ref={uploadRef}
					/>
					{/* accept=".docx," */}
				</fieldset>
			</form>
			<div className="drag-text">
				<h3>Drag and drop a file or click to add</h3>
			</div>
		</div>

	)
}

export default Container;