import axios from "axios";

const authApiClient = axios.create({
  //baseURL: "https://phimart.vercel.app/api/v1", // as romjan ali vi
  baseURL: "https://drf-phimart.vercel.app/api", // my deployed drf app
});

export default authApiClient;

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token).access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);