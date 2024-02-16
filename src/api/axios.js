import axios from "axios";

const instance = axios.create({
  baseURL: "https://to-do-list.xyz/api/v1",
  withCredentials: true,
});

export default instance;
