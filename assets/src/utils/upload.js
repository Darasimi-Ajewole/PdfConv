import axios from "axios";

const API_ROOT = 'http://localhost:8080/public'
const START_UPLOAD = `${API_ROOT}/start-upload`
const VALIDATE_UPLOAD = `${API_ROOT}/validate-upload/`

const startUploadSession = async (file) => {
  let data, status, response

  // try {
  //   response = await axios.get(START_UPLOAD);
  // } catch (error) {
  //   response = error && error.response;
  //   errored = true
  // }

  // if (errored || !response) {
  //   status = response && response.status
  //   return { sessionData: null, status: status || 417, error: 'Sorry Something went wrong' }
  // }
  response = await axios.post(START_UPLOAD, {
    data: {mimetype: file.type}
  });

  data = response.data
  status = response.status
  return { sessionData: data, status };    
}

const upload2Storage = async (uploadUrl, file) => {
  try {
    const response = await axios({
      method: 'put',
      url: uploadUrl,
      headers: { 'Content-Type': file.type },
      data: file,
    })
    return response

  } catch (error) {
    console.log(error)
    
    throw error
  } 

}

const validateUpload = async (blobName) => {
  const endpoint = `${VALIDATE_UPLOAD}/${blobName}`
  const response = await axios.get(endpoint)
  return response
}

const uploadFile = async (file) => {
  const { sessionData } = await startUploadSession(file);
  const { upload_url: uploadUrl, blob_name: blobName } = sessionData;
  const uploadResponse = await upload2Storage(uploadUrl, file); // TO-DO: Check if upload was really successful
  const validateResponse = await validateUpload(blobName);

  return Boolean(uploadResponse && validateResponse)
}

export default uploadFile