import axios from "axios";

const API_URL = "http://localhost:8000";

/**
 * GET /materials
 */
export const getMaterials = async () => {
  const res = await axios.get(`${API_URL}/materials`);
  return res.data;
};
