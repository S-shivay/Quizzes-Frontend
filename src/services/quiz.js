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

export const createQuiz = async (quizData) => {
  try {
    console.log("Data sent to server:", quizData);
    const response = await axios.post(`${BACKEND_URL}/quiz/create`, quizData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error saving quiz:", error.message);
    console.error("Error details:", error.response?.data);
    throw new Error(error.response?.data?.message || "Error creating quiz");
  }
};

export const shareQuiz = async (quizId) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/quiz/share`, { quizId }, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error sharing quiz");
  }
};

export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/quiz/list`, getAuthHeaders());
    console.log("Fetched quizzes data:", response.data); 
    return response.data || {
      quizzesCreated: 0,
      questionsCreated: 0,
      totalImpressions: 0,
      trendingQuizzes: [],
    };
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    throw new Error(error.response?.data?.message || "Error fetching quizzes");
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/quiz/delete/${quizId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting quiz");
  }
};
