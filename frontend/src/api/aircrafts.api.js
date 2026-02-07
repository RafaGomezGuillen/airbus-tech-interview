import axios from "axios";

const API_URL = "http://localhost:8000";

/**
 * GET /aircrafts
 */
export const getAircrafts = async () => {
  const res = await axios.get(`${API_URL}/aircrafts`);
  return res.data;
};
