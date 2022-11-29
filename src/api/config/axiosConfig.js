import axios from "axios";
import eventBus from "../../utils/eventBus";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://192.168.0.6:3000/api/",
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;
  const message = error.response?.data?.message || "Sin conexión";
  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  } else if (statusCode && statusCode === 401){
    eventBus.dispatch("logout");
  }
  return Promise.reject(message);
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});