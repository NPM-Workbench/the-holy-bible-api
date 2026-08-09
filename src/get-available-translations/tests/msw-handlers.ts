/* imports */
import { http, HttpResponse, HttpHandler } from "msw";
import { API_ROOT } from "../../shared/index.js";

/* mock: data */
const mockTData: Record<string, any>[] = [
  {
    identifier: "cherokee",
    name: "Cherokee New Testament",
    language: "Cherokee",
    language_code: "chr",
    license: "Public Domain",
    url: "https://bible-api.com/data/cherokee",
  },
  {
    identifier: "cuv",
    name: "Chinese Union Version",
    language: "Chinese",
    language_code: "zh-tw",
    license: "Public Domain",
    url: "https://bible-api.com/data/cuv",
  },
  {
    identifier: "web",
    name: "World English Bible",
    language: "English",
    language_code: "eng",
    license: "Public Domain",
    url: "https://bible-api.com/data/web",
  },
];

/* 200:OK */
const getAvailableTranslationsOK: HttpHandler = http.get(`${API_ROOT}/data`, () => {
  const cloned = { translations: [...mockTData] };
  return HttpResponse.json(cloned, {status: 200});
});

/* 4XX:OK */
const getAvailableTranslationsErr: HttpHandler = http.get(`${API_ROOT}/data`, () => {
  return HttpResponse.json(null, {status: 400});
});

/* exports */
export { mockTData, getAvailableTranslationsOK, getAvailableTranslationsErr };
