import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (formData) => {
  try {
    const response = await api.post("/login", formData);
    return response.data;
  } catch (error) {
    console.error("Login Error", error);
    throw error;
  }
};

export const register = async (formData) => {
  try {
    const response = await api.post("/register", formData);
    return response.data;
  } catch (error) {
    console.error("Register Error", error);
    throw error;
  }
};

export const getTasks = async (page, limit) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/task?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getSearchTasks = async (name, page, limit) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(
      `/task/search?q=${name}&page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/task", taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/task/${taskId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/task/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export default api;
