import React, { useRef } from "react";
import { validateFileSize, validateMimeType } from "../utils/validate";
import { File } from "../utils/interface";

import { toast } from "react-toastify";

type ContainerProps = {
  handleChange: (file: File) => void;
};

const Container = (props: ContainerProps) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (file: File): void => {
    const validSize = validateFileSize(file);
    if (!validSize) {
      toast.error("Uploaded document too large, Maximum Size is 100MB");
      return;
    }

    const validType = validateMimeType(file);
    if (!validType) {
      toast.error("Oops, Unsupported document format");
      return;
    }

    const { handleChange } = props;
    handleChange(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    handleChange(files[0]);
    event.target.value = "";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) =>
    event.preventDefault();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    handleChange(files[0]);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLElement;
    if (element.tagName === "INPUT") return;
    const fileInputElement = uploadRef.current;
    fileInputElement && fileInputElement.click();
  };

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
        <h6>
          {" "}
          .png, .jpg, .svg, .xls, .pptx, .doc, .docx files are supported{" "}
        </h6>
      </div>
    </div>
  );
};

export default Container;
