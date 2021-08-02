import { toast } from 'react-toastify';
import { useRef, useState } from 'react';

const Container = () => {
	const uploadRef = useRef(null);
  const [savedfiles, storeFiles] = useState({});

	const handleChange = (files) => {
		toast('We are really good to go')
		storeFiles(files);
	};

	const handleFileChange = (event) => {
		const { files } = event.target;
		handleChange(files);
		event.target.value = '';
	}

	const handleDragEnter = (event) => {
		event.preventDefault();
	}

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