import DropContainer from "./Drop-Container";
import { ToastContainer, toast } from "react-toastify";
import StatusContextProvider from "../context/ConversionStatus";
import ConversionModal from "./Conversion-Modal";
import { useState } from "react";
import { File, FileUploadResponse } from "../utils/interface";

const Main = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blobName, setBlobName] = useState<string | null>(null);

  const handleFileChange = (file: File): void => {
    setFile(file);
    setShowModal(true);
  };

  const onUploadComplete = async (
    uploadData: FileUploadResponse
  ): Promise<void> => {
    const { blobName } = uploadData;
    setBlobName(blobName);
  };

  const cancelConversion = (): void => {
    setFile(null);
    setShowModal(false);
    setBlobName(null);
  };

  const onError = (errMsg: string, error?: Error): void => {
    setShowModal(false);
    toast.error(errMsg);
    console.error(error);
  };

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
  );
};

export default Main;
