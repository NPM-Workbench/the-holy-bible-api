/* node modules */
import { jest, test } from '@jest/globals';

/* app imports */
import { API_ROOT } from '../../shared/index.js';
import { getTranslationByParams } from '../index.js';
import {
  getMockData,
  getTranslationByParamsOk,
  getTranslationByParamsBookOk,
  getTranslationByParamsBookChapterOk,
  getTranslationByParamsWebOk,
  getTranslationByParamsErr,
} from './msw-handlers.js';
import createMSWMockServer from '../../shared/msw-mock-server.js';

/* suite */
describe('Get Translation By Params', () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  beforeAll(() => {
    mswServer = createMSWMockServer([getTranslationByParamsOk]);
    mswServer.listen();
  });

  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });

  afterAll(() => mswServer.close());

  test('fetch gets called with expected parameters for translation-only', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    const translationId = 'mock-value';
    await getTranslationByParams({ translationId });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/${translationId}`),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('fetch gets called with expected parameters for translation + book id', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getTranslationByParamsBookOk);
    const translationId = 'mock-value';
    const bookId = 'GEN';
    await getTranslationByParams({ translationId, bookId });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/${translationId}/${bookId}`),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  test('returns 200-OK response for translation-only', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    const translationId = 'mock-value';
    const response = await getTranslationByParams({ translationId });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toBe('api-ok');
    expect(response.message).toBe('Success. Check Payload.');
    expect(response.payload).toMatchObject(getMockData(translationId));
  });

  test('returns 200-OK response for translation + book id', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getTranslationByParamsBookOk);
    const translationId = 'mock-value';
    const bookId = 'GEN';
    const response = await getTranslationByParams({ translationId, bookId });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/${translationId}/${bookId}`),
      expect.objectContaining({ method: 'GET' }),
    );
    expect(response.code).toBe('api-ok');
    expect(response.message).toBe('Success. Check Payload.');
    expect(response.payload).toMatchObject(getMockData(translationId, bookId));
  });

  test('returns 200-OK response for translation + book id + chapter id', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getTranslationByParamsBookChapterOk);
    const translationId = 'mock-value';
    const bookId = 'GEN';
    const chapterId = 1;
    const response = await getTranslationByParams({
      translationId,
      bookId,
      chapterId,
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `${API_ROOT}/data/${translationId}/${bookId}/${chapterId}`,
      ),
      expect.objectContaining({ method: 'GET' }),
    );
    expect(response.code).toBe('api-ok');
    expect(response.message).toBe('Success. Check Payload.');
    expect(response.payload).toMatchObject(
      getMockData(translationId, bookId, String(chapterId)),
    );
  });

  test('returns 200-OK response for web default endpoint', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getTranslationByParamsWebOk);
    const response = await getTranslationByParams();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/web`),
      expect.objectContaining({ method: 'GET' }),
    );
    expect(response.code).toBe('api-ok');
    expect(response.message).toBe('Success. Check Payload.');
    expect(response.payload).toMatchObject(getMockData('web'));
  });

  test('returns 4xx-Err response', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getTranslationByParamsErr);
    const translationId = 'mock-value';
    const response = await getTranslationByParams({ translationId });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toBe('api-fail');
    expect(response.message).toBe(
      'Get Translation By Params: Something Went Wrong.',
    );
    expect(response.payload).toBeNull();
  });
});
