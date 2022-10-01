export const request = async (url, options = {}) => {
  try {
    const fullUrl = `${url}`;
    const res = await fetch(fullUrl, options);

    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error("Request Failed");
  } catch (e) {
    alert(e.message);
    throw new Error("Request Failed");
  }
};
