import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44396/",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error?.response?.status) {
      localStorage.clear();
      window.location = "";
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
