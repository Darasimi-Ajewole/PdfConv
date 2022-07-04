export const DEV = process.env.REACT_APP_ENVIRONMENT === "development";
export const PROD = !DEV;

const prodConfig = {
  apiKey: "AIzaSyBgkYGo3fZksO5fKfcML4edkVwiVU_e_SU",
  authDomain: "pdf-conv-3d1f5.firebaseapp.com",
  projectId: "pdf-conv-3d1f5",
  storageBucket: "pdf-conv-3d1f5.appspot.com",
  messagingSenderId: "1027537161135",
  appId: "1:1027537161135:web:099ab5decbba6a8c8ffd5a",
};
const devConfig = {
  projectId: process.env.REACT_APP_PROJECT_ID,
};
export const firebaseConfig = DEV ? devConfig : prodConfig;

const DEV_API_ROOT = "http://localhost:8080/public";
const PROD_API_ROOT = "https://default-xwijo2rjaa-uc.a.run.app/public";
const API_ROOT = DEV ? DEV_API_ROOT : PROD_API_ROOT;
export const START_UPLOAD_URL = `${API_ROOT}/start-upload`;
export const CONVERT_API = `${API_ROOT}/convert-document`;
