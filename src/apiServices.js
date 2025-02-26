import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token");

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getTasks = async (page, limit) => {
  try {
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
