export const storage = localStorage;

export const getItem = (key, defaultValue = []) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
    console.warn("Didn't do anything.");
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(e);
    console.warn("Didn't do anything.");
  }
};
