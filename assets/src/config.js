export const DEV = true;
export const PROD = !(DEV);

const prodConfig = {
  apiKey: "AIzaSyBgkYGo3fZksO5fKfcML4edkVwiVU_e_SU",
  authDomain: "pdf-conv-3d1f5.firebaseapp.com",
  projectId: "pdf-conv-3d1f5",
  storageBucket: "pdf-conv-3d1f5.appspot.com",
  messagingSenderId: "1027537161135",
  appId: "1:1027537161135:web:099ab5decbba6a8c8ffd5a"
};

const devConfig = {
  projectId: "foobar123",
}

export const firebaseConfig = DEV ? devConfig : prodConfig

const API_ROOT = 'http://localhost:8080/public'
export const START_UPLOAD = `${API_ROOT}/start-upload`
export const CONVERT_API = `${API_ROOT}/convert-document`
