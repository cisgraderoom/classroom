import axios from "axios";
import config from "../config/config";

const httpClient = axios.create({
  baseURL: config.backendURL,
});

export default httpClient;
