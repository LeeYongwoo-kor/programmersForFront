// https://www.back4app.com/database/paul-datasets/list-of-all-programming-languages/get-started/node-js/rest-api/node-fetch?objectClassSlug=dataset
import { ISearchPrgLanguagesRslt } from "../types/pLangs";
import fetch, { Headers, HeadersInit } from "node-fetch";

const cache: { [key: string]: any } = {};

const API_END_POINT =
  "https://parseapi.back4app.com/classes/All_Programming_Languages";

const count = 1;
const limit = 705;
const order = "ProgrammingLanguage";

async function api<T>(url: string): Promise<T> {
  // if (!globalThis.fetch) {
  //   globalThis.fetch = fetch;
  //   globalThis.Headers = Headers;
  // }

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.append(
    "X-Parse-Application-Id",
    process.env.API_APPLICATION_ID!
  );
  requestHeaders.append("X-Parse-Master-Key", process.env.API_MASTER_KEY!);

  return fetch(url, { headers: requestHeaders })
    .then(async (res) => {
      if (!res.ok) {
        console.error("Request Failed");
      }

      const json = await (res.json() as Promise<T>);
      cache[url] = json;
      return json;
    })
    .catch((e) => {
      throw new Error(`Something Wrong! ${e.message}`);
    });
}

const request = async (url: string) => {
  if (cache[url]) {
    return cache[url];
  }

  return api<ISearchPrgLanguagesRslt>(url);
};

export async function fetchedLanguages(keyword: string) {
  return request(
    `${API_END_POINT}?count=${count}&limit=${limit}&order=${order}`
  );
}
