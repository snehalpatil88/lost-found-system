const API_URL = "http://localhost:5000/api";

// Items API
export const addItem = async (itemData) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });
  return await response.json();
};

export const getItems = async (status = '') => {
  const url = status ? `${API_URL}/items?status=${status}` : `${API_URL}/items`;
  const response = await fetch(url);
  return await response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

export const markAsReturned = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}/return`, {
    method: "PUT",
  });
  return await response.json();
};

// Users API
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};
