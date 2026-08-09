/* imports */
import { http, HttpHandler, HttpResponse } from "msw";
import { API_ROOT } from "../../shared/index";

/* get: 200-ok */
const getRandomVerseNewTestamentHandler: HttpHandler = http.get<{id: string}>(`${API_ROOT}/data/:id/random/NT`, ({ params }) => {
  /* extract */
  const { id } = params;

  /* response */
  return HttpResponse.json({
    translation: {
      identifier: id,
      name: "mock-name",
      language: "mock-language",
      language_code: "mock-code",
      license: "mock-lic",
    },
    random_verse: {
      book_id: "mock-book-id",
      book: "mock-book",
      chapter: 1,
      verse: 1,
      text: "mock-bible-text",
    }
  }, { status: 200 });
});

/* err: handler */
const getRandomVerseNewTestamentErr: HttpHandler = http.get<{id: string }>(`${API_ROOT}/data/:id/random/NT`, () => {
  return HttpResponse.json(null, {status: 400});
});

/* exports */
export { getRandomVerseNewTestamentHandler, getRandomVerseNewTestamentErr };
