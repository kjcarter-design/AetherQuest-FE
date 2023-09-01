import axios from 'axios';

const BASE_URL = 'https://www.dnd5eapi.co';

// Helper function to fetch data from the API
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Check if data exists in local storage
const checkLocalStorage = (key) => {
  return localStorage.getItem(key);
};

// Store data in local storage
const storeInLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getRaces = async () => {
  if (checkLocalStorage('races')) {
    return JSON.parse(localStorage.getItem('races'));
  }
  const data = await fetchData('/api/races');
  storeInLocalStorage('races', data);
  return data;
};

export const getClasses = async () => {
  if (checkLocalStorage('classes')) {
    return JSON.parse(localStorage.getItem('classes'));
  }
  const data = await fetchData('/api/classes');
  storeInLocalStorage('classes', data);
  return data;
};

export const getWeapons = async () => {
  if (checkLocalStorage('weapons')) {
    return JSON.parse(localStorage.getItem('weapons'));
  }
  const data = await fetchData('/api/equipment-categories/weapon');
  storeInLocalStorage('weapons', data);
  return data;
};

export const getCantrips = async () => {
  if (checkLocalStorage('cantrips')) {
    return JSON.parse(localStorage.getItem('cantrips'));
  }
  const data = await fetchData('/api/spells?level=0');
  storeInLocalStorage('cantrips', data);
  return data;
};
