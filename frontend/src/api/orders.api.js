import axios from "axios";
const API_URL = "http://localhost:8000";

/**
 * GET /orders
 */
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};