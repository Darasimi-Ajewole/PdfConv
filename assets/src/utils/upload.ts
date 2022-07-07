import axios, { AxiosResponse } from "axios";
import { CancelTokenSource } from "axios";
import { START_UPLOAD_URL } from "../config";
import {
  File,
  FileUploadResponse,
  StartUploadSessionResponse,
} from "./interface";

export const startUploadSession = async (
  file: File
): Promise<StartUploadSessionResponse> => {
  let data, status, response;

  // try {
  //   response = await axios.get(START_UPLOAD_URL);
  // } catch (error) {
  //   response = error && error.response;
  //   errored = true
  // }

  // if (errored || !response) {
  //   status = response && response.status
  //   return { sessionData: null, status: status || 417, error: 'Sorry Something went wrong' }
  // }
  response = await axios.post(START_UPLOAD_URL, {
    data: { mimetype: file.type },
  });

  data = response.data;
  status = response.status;
  return { sessionData: data, status };
};

export const upload2Storage = async (
  uploadUrl: string,
  file: File,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
  cancelSource: CancelTokenSource
): Promise<AxiosResponse<string>> => {
  const response = await axios({
    method: "put",
    url: uploadUrl,
    headers: { "Content-Type": file.type },
    data: file,
    onUploadProgress,
    cancelToken: cancelSource.token,
  });

  return response;
};

const uploadFile = async (
  file: File,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
  cancelSource: CancelTokenSource
): Promise<FileUploadResponse> => {
  console.log("Starting upload session");
  const { sessionData } = await startUploadSession(file);
  const { upload_url: uploadUrl, blob_name: blobName } = sessionData;
  console.log("Uploading to storage");
  await upload2Storage(uploadUrl, file, onUploadProgress, cancelSource);
  return { blobName };
};

export default uploadFile;
