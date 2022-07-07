import axios from "axios";
import { CONVERT_API } from "../config";
import { StartConvertSesssionResponse } from "./interface";

export const startConvertSession = async (
  blobName: string,
  pdfName: string
): Promise<StartConvertSesssionResponse> => {
  const endpoint = `${CONVERT_API}/${blobName}?pdf-name=${pdfName}`;
  const response = await axios.post(endpoint);
  return { taskStatusId: response.data };
};
