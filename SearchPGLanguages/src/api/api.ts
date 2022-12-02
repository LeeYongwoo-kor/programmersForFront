// @ts-ignored
// https://www.back4app.com/database/paul-datasets/list-of-all-programming-languages/get-started/node-js/rest-api/node-fetch?objectClassSlug=dataset
import { ISearchPrgLanguagesRslt } from "../types/pLangs.ts";

export const API_END_POINT =
  "https://parseapi.back4app.com/classes/All_Programming_Languages";

const cache: { [key: string]: any } = {};

const count = 1;
const limit = 705;
const order = "ProgrammingLanguage";

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("X-Parse-Application-Id", process.env.API_APPLICATION_ID!);
requestHeaders.set("X-Parse-Master-Key", process.env.API_MASTER_KEY!);

async function api<T>(url: string): Promise<T> {
  return fetch(url, { headers: requestHeaders }).then(async (res) => {
    if (!res.ok) {
      console.error("Request Failed");
    }

    const json = await (res.json() as Promise<T>);
    cache[url] = json;
    return json;
  });
}

const request = async (url: string) => {
  if (cache[url]) {
    return cache[url];
  }

  return api<ISearchPrgLanguagesRslt>(url);
};

export async function fetchedLanguages(keyword: string) {
  // UTF-8 Incoding
  const where = encodeURIComponent(
    JSON.stringify({
      ProgrammingLanguage: keyword,
    })
  );

  return request(
    `${API_END_POINT}?count=${count}&limit=${limit}&order=${order}&where=${where}`
  );
}
