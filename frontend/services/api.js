import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const startMilking = (data) => API.post("/milking/start", data);

export const stopMilking = (id) => API.put(`/milking/stop/${id}`);

export const getHistory = () => API.get("/milking");
