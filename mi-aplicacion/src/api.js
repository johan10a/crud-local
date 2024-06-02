import axios from "axios";

const API_URL = "http://tu-servidor-node-js/api"; // Reemplaza con la URL de tu servidor

export const obtenerDatos = () => {
  return axios.get(`${API_URL}/datos`);
};

export const insertarDatos = (datos) => {
  return axios.post(`${API_URL}/datos`, datos);
};

export const actualizarDatos = (id, datos) => {
  return axios.put(`${API_URL}/datos/${id}`, datos);
};

export const eliminarDatos = (id) => {
  return axios.delete(`${API_URL}/datos/${id}`);
};
