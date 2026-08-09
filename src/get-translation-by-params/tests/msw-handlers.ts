/* imports */
import { http, HttpResponse, HttpHandler } from 'msw';
import { API_ROOT } from '../../shared/index.js';

/* mock: data */
function getMockData(
  translationId: string,
  bookId?: string,
  chapterId?: string,
): Record<string, any> {
  const payload: Record<string, any> = {
    translation: {
      identifier: translationId,
      name: `mock-name-${translationId}`,
      language: 'mock-language',
      language_code: `mock-code-${translationId}`,
      license: 'mock-license',
    },
  };

  if (bookId) {
    payload.book = {
      id: bookId,
      name: `mock-book-${bookId}`,
    };
  }

  if (chapterId) {
    payload.chapter = Number(chapterId);
    payload.text = `mock-chapter-text-${chapterId}`;
  }

  return payload;
}

/* 200: OK */
const getTranslationByParamsOk: HttpHandler = http.get<{
  translationId: string;
}>(`${API_ROOT}/data/:translationId`, ({ params }) => {
  const { translationId } = params;
  return HttpResponse.json(getMockData(translationId), { status: 200 });
});

const getTranslationByParamsBookOk: HttpHandler = http.get<{
  translationId: string;
  bookId: string;
}>(`${API_ROOT}/data/:translationId/:bookId`, ({ params }) => {
  const { translationId, bookId } = params;
  return HttpResponse.json(getMockData(translationId, bookId), { status: 200 });
});

const getTranslationByParamsBookChapterOk: HttpHandler = http.get<{
  translationId: string;
  bookId: string;
  chapterId: string;
}>(`${API_ROOT}/data/:translationId/:bookId/:chapterId`, ({ params }) => {
  const { translationId, bookId, chapterId } = params;
  return HttpResponse.json(getMockData(translationId, bookId, chapterId), {
    status: 200,
  });
});

const getTranslationByParamsWebOk: HttpHandler = http.get(
  `${API_ROOT}/data/web`,
  () => {
    return HttpResponse.json(getMockData('web'), { status: 200 });
  },
);

/* 4xx: err */
const getTranslationByParamsErr: HttpHandler = http.get<{
  translationId: string;
}>(`${API_ROOT}/data/:translationId`, () =>
  HttpResponse.json(null, { status: 400 }),
);

/* exports */
export {
  getMockData,
  getTranslationByParamsOk,
  getTranslationByParamsBookOk,
  getTranslationByParamsBookChapterOk,
  getTranslationByParamsWebOk,
  getTranslationByParamsErr,
};
