// https://www.back4app.com/database/paul-datasets/list-of-all-programming-languages/get-started/node-js/rest-api/node-fetch?objectClassSlug=dataset
import { ISearchPrgLanguagesRslt } from "../types/pLangs";
import fetch, { Headers, HeadersInit } from "node-fetch";

const API_END_POINT =
  "https://parseapi.back4app.com/classes/All_Programming_Languages";

const LOCAL_API_END_POINT = "http://localhost:3000/api";

async function api<T>(
  url: string,
  requestHeaders: HeadersInit = {}
): Promise<T> {
  return fetch(url, { headers: requestHeaders })
    .then(async (res) => {
      if (!res.ok && res.status !== 404) {
        throw new Error("Request failed!");
      }

      const json = await (res.json() as Promise<T>);
      return json;
    })
    .catch((e) => {
      throw new Error(`Something Wrong! ${e.message}`);
    });
}

export async function fetchedAllLanguages() {
  const count = 1;
  const limit = 705;
  const order = "ProgrammingLanguage";

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.append(
    "X-Parse-Application-Id",
    process.env.API_APPLICATION_ID!
  );
  requestHeaders.append("X-Parse-Master-Key", process.env.API_MASTER_KEY!);

  return api<ISearchPrgLanguagesRslt>(
    `${API_END_POINT}?count=${count}&limit=${limit}&order=${order}`,
    requestHeaders
  );
}

export async function fetchedLanguagesByKeyword(keyword: string, limit?: string) {
  return api<ISearchPrgLanguagesRslt>(
    `${LOCAL_API_END_POINT}?keyword=${keyword}&limit=${limit}`
  );
}
