import {
  StatusContext,
  StatusContextInterface,
} from "../context/ConversionStatus";
import Toast from "react-bootstrap/Toast";
import { useContext, useEffect } from "react";
import { startConvertSession } from "../utils/convert";
import { File } from "../utils/interface";
import Spinner from "react-bootstrap/Spinner";
import { FcCheckmark } from "react-icons/fc";
import Button from "react-bootstrap/Button";

type ConversionProps = {
  blobName: string;
  file: File;
  onError: (errMsg: string, error?: Error) => void;
};

const Conversion = ({ blobName, file, onError }: ConversionProps) => {
  const { attachUpdateListener, taskStatusData, cancelConversion } =
    useContext<StatusContextInterface>(StatusContext);

  useEffect(() => {
    const convert = async () => {
      const fileName = file.name.replace(extensionRegexExp, "pdf");
      try {
        const { taskStatusId } = await startConvertSession(blobName, fileName);
        attachUpdateListener(taskStatusId);
      } catch (error) {
        onError("Something went wrong, Please reload page and try again");
      }
    };
    convert();
    return () => cancelConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (taskStatusData?.status === "failed") {
      onError("Something went wrong, Please reload page and try again");
    }
  }, [taskStatusData, onError]);

  return (
    <Toast>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">
          {taskStatusData ? msg[taskStatusData.status] : STARTING}
        </strong>
        <small className="text-muted">
          {!(taskStatusData?.status === "success") ? (
            <Spinner animation="border" />
          ) : (
            <FcCheckmark />
          )}
        </small>
      </Toast.Header>
      {taskStatusData?.status === "success" && taskStatusData.download_url && (
        <Toast.Body>
          <Button
            href={taskStatusData.download_url}
            target="_blank"
            size="sm"
            value="golden"
          >
            Download PDF
          </Button>
        </Toast.Body>
      )}
    </Toast>
  );
};

const STARTING = "Starting Conversion";

const msg = {
  running: "Converting to PDF",
  stasis: STARTING,
  success: "Converted Successfully",
  failed: "Oops something went wrong",
};

const extensionRegexExp = /(?<=(\.(?!.*\.))).*/;

export default Conversion;
