import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosApiSetBaseURL = axios.create({
  withCredentials: true,
});

export default axiosApiSetBaseURL;