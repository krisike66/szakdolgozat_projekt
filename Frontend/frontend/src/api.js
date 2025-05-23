import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});


export const getCimkek = async () => {
  try {
    const response = await api.get('/cimkek');
    return response.data;
  } catch (error) {
    console.error("Hiba a címkék betöltésekor:", error);
    return [];
  }
};

export const createCimke = async (nev) => {
  try {
    const response = await api.post('/cimkek', { nev });
    return response.data;
  } catch (error) {
    console.error("Hiba a címke létrehozásakor:", error);
    return null;
  }
};

export default api;