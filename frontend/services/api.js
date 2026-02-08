import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const startMilking = (data) => API.post("/start", data);

export const stopMilking = (id, data) => API.put(`/stop/${id}`, data);

export const getHistory = () => API.get("/");
