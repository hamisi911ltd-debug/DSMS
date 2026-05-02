const STORAGE_KEYS = {
  USERS: 'dsms_users',
  BOOKINGS: 'dsms_bookings',
  VEHICLES: 'dsms_vehicles',
  PAYMENTS: 'dsms_payments',
  CURRENT_USER: 'dsms_current_user',
};

export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
};

export const setData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
};

export const getUsers = () => getData(STORAGE_KEYS.USERS) || [];
export const setUsers = (users) => setData(STORAGE_KEYS.USERS, users);

export const getBookings = () => getData(STORAGE_KEYS.BOOKINGS) || [];
export const setBookings = (bookings) => setData(STORAGE_KEYS.BOOKINGS, bookings);

export const getVehicles = () => getData(STORAGE_KEYS.VEHICLES) || [];
export const setVehicles = (vehicles) => setData(STORAGE_KEYS.VEHICLES, vehicles);

export const getPayments = () => getData(STORAGE_KEYS.PAYMENTS) || [];
export const setPayments = (payments) => setData(STORAGE_KEYS.PAYMENTS, payments);

export const getCurrentUser = () => getData(STORAGE_KEYS.CURRENT_USER);
export const setCurrentUser = (user) => setData(STORAGE_KEYS.CURRENT_USER, user);

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export { STORAGE_KEYS };