import axios from "axios";
import { CONVERT_API } from "../config";

export const startConvertSession = async (blobName, pdfName) => {
  const endpoint = `${CONVERT_API}/${blobName}?pdf-name=${pdfName}`
  const response = await axios.post(endpoint)
  return { taskStatusId: response.data }
}

