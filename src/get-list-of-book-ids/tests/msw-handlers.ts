/* imports */
import { http, HttpResponse, HttpHandler } from "msw";
import { API_ROOT } from "../../shared/index.js";

/* mock: data */
function getMockData(bookId: string): Record<string, any> {
  return {
    translation: {
      identifier: bookId,
      name: `mock-${bookId}`,
      language: "mock-lang",
      language_code: `mock-code-${bookId}`,
      license: "demo"
    },
    books: [
      {
        id: "mock-id-1",
        name: "mock-name-1",
        url: `https://bible-api.com/data/${bookId}/mock-name-1`
      },
      {
        id: "mock-id-2",
        name: "mock-name-2",
        url: `https://bible-api.com/data/${bookId}/mock-name-2`
      }
    ]
  };
}

/* 200:OK */
const getListOfBookIdsOk: HttpHandler = http.get<{bookId: string}>(`${API_ROOT}/data/:bookId`, ({ params }) => {
  const { bookId } = params;
  return HttpResponse.json(getMockData(bookId), {status: 200});
});

/* 4xx:err */
const getListOfBookIdsErr: HttpHandler = http.get<{bookId: string}>(`${API_ROOT}/data/:bookId`, () => {
  return HttpResponse.json(null, {status: 400});
});

/* exports */
export {
  getMockData,
  getListOfBookIdsOk,
  getListOfBookIdsErr
};
