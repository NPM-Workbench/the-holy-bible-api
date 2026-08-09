/* imports */
import { http, HttpResponse, HttpHandler } from "msw";
import { API_ROOT } from "../../shared/index.js";

/* 200-ok: root/web/random */
const rootWebRandomHandler: HttpHandler = http.get(`${API_ROOT}/data/web/random`, () => {
  return HttpResponse.json({
    translation: {
      identifier: "web",
      name: "World English Bible",
      language: "English",
      language_code: "eng",
      license: "Public Domain"
    },
    random_verse: {
      book_id: "ACT",
      book: "Acts",
      chapter: 2,
      verse: 20,
      text: "The sun will be turned into darkness,\nand the moon into blood,\nbefore the great and glorious day of the Lord comes."
    }
  }, {status: 200})
});

/* 4xx-Err: root/web/random */
const rootWebRandomErr: HttpHandler = http.get(`${API_ROOT}/data/web/random`, () => {
  return HttpResponse.json(null, {status: 400});
});

/* 200-ok: root/{tId - translation id}/random */
const rootTIdRandomHandler: HttpHandler = http.get(`${API_ROOT}/data/:tId/random`, ({ params }) => {
  const { tId } = params;
  return HttpResponse.json({
    translation: {
      identifier: tId,
      name: `mock-name-${tId}`,
      language: "mock-language",
      language_code: "mock-lang-code",
      license: "mock-license",
    },
    random_verse: {
      book_id: "mock-book-id",
      book: "mock-book-name",
      chapter: 1,
      verse: 1,
      text: "lorem ipsum"
    }
  });
});

/* 4xx-Err: root/{tId - translation id}/random */
const rootTIdRandomHandlerErr: HttpHandler = http.get(`${API_ROOT}/data/:tId/random`, () => {
  return HttpResponse.json(null, {status: 400});
});

/* 200-ok: root/{tId - translation id}/{bId - book id}/random */
const rootTIdBIdRandomHandler: HttpHandler = http.get(`${API_ROOT}/data/:tId/random/:bId`, ({ params }) => {
  const { tId, bId } = params;
  return HttpResponse.json({
    translation: {
      identifier: tId,
      name: `mock-name-${tId}`,
      language: "mock-language",
      language_code: "mock-lang-code",
      license: "mock-license",
    },
    random_verse: {
      book_id: `mock-${bId}-id`,
      book: `mock-${bId}-name`,
      chapter: 1,
      verse: 1,
      text: "lorem ipsum"
    }
  });
});

/* 4xx-er: root/{tId - translation id}/{bId - book id}/random */
const rootTIdBIdRandomErr: HttpHandler = http.get(`${API_ROOT}/data/:tId/random/:bId`, () => {
  return HttpResponse.json(null, {status: 400});
});

/* exports */
export {
  rootWebRandomHandler,
  rootWebRandomErr,
  rootTIdRandomHandler,
  rootTIdRandomHandlerErr,
  rootTIdBIdRandomHandler,
  rootTIdBIdRandomErr
};

