export const API_END_POINT = "API END POINT";

const cache = {};

const request = async (url) => {
  if (cache[url]) {
    return cache[url];
  }

  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    cache[url] = json;
    return json;
  }

  throw Error("Request Failed");
};

export const fetchedLanguages = async (keyword) =>
  `${API_END_POINT}/languages?keyword=${keyword}`;
