const API_END_POINT = "http://localhost:3000/api";

export const request = async (url, options = {}) => {
  try {
    const fullUrl = API_END_POINT + url;
    const res = await fetch(fullUrl, options);

    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error("Request Failed");
  } catch (e) {
    alert(e.message);
  }
};
