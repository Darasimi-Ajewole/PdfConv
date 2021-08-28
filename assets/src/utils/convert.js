import axios from "axios";

const API_ROOT = 'http://localhost:8080/public'
const CONVERT_API = `${API_ROOT}/convert-document`

export const startConvertSession = async (blobName, pdfName) => {
  const endpoint = `${CONVERT_API}/${blobName}?pdf-name=${pdfName}`
  const response = await axios.post(endpoint) // TODO: Check for possible error from server
  return { taskStatusId: response.data }
}

