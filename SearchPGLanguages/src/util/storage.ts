import { JSONValue } from "src/types/json";

export const storage = localStorage;

export const getItem = (key: string, defaultValue = []) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setItem = (key: string, value: JSONValue) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
    console.warn("Didn't do anything.");
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(e);
    console.warn("Didn't do anything.");
  }
};
