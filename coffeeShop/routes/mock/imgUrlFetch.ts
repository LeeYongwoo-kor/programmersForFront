const fetch = require("node-fetch");

const defaultImage = "https://coffee.alexflipnote.dev/25hdZQ7Z7dI_coffee.jpg";

const randomImageUrl = "https://coffee.alexflipnote.dev/random.json";

const fetchImageUrl = async () => {
  return await fetch(randomImageUrl)
    .then(async (res: { ok: any; json: () => any }) => {
      if (!res.ok) {
        console.error("Request Failed!");
        return { file: defaultImage };
      }

      return await res.json();
    })
    .catch((err: any) => {
      console.error(err);
      return { file: defaultImage };
    });
};

export const getImageUrl = async () => {
  const data = await fetchImageUrl();
  return data?.file;
};
