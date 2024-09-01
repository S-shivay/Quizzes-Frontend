import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchAnalytics = async (id) => {
  if (!id) throw new Error("Quiz ID is required"); // Ensure ID is passed
  try {
    const response = await axios.get(`${BACKEND_URL}/quiz/analytics/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    throw new Error(error.response?.data?.message || "Error fetching analytics");
  }
};
