/* node modules */
import { jest } from "@jest/globals";

/* app imports */
import { API_ROOT } from "../../shared/index.js";
import { getRandomVerse } from "../index.js";
import {
  rootWebRandomErr,
  rootWebRandomHandler,
  rootTIdRandomHandler,
  rootTIdRandomHandlerErr,
  rootTIdBIdRandomHandler,
  rootTIdBIdRandomErr
} from "./msw-handlers.js";
import createMSWMockServer from "../../shared/msw-mock-server.js";

/* suite */
describe("Get Random Verse", () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([rootWebRandomHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });
  afterAll(() => mswServer.close());

  test("random verse: translation-id = mock-value; 200-ok", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(rootTIdRandomHandler);
    const tId = "xyz";
    const response = await getRandomVerse({ translationId: tId });

    /* assert: fetch */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringMatching(`${API_ROOT}/data/${tId}/random`),
      expect.objectContaining({ method: "GET" })
    );

    /* assert: code, message */
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("Success. Check Payload.");

    /* assert: payload */
    expect(response.payload).not.toBeNull();
    expect(response.payload?.translation).toMatchObject({
      identifier: "xyz",
      name: "mock-name-xyz",
      language: "mock-language",
      language_code: "mock-lang-code",
      license: "mock-license",
    });
    expect(response.payload?.random_verse).toMatchObject({
      book_id: "mock-book-id",
      book: "mock-book-name",
      chapter: 1,
      verse: 1,
      text: "lorem ipsum",
    });
  });

  test("random verse: translation-id = mock-value; 4xx-er", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(rootTIdRandomHandlerErr);
    const tId = "xyz";
    const response = await getRandomVerse({ translationId: tId });

    /* assert: fetch */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringMatching(`${API_ROOT}/data/${tId}/random`),
      expect.objectContaining({ method: "GET" })
    );

    /* assert: response */
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("Get Random Verse: Something Went Wrong.");
    expect(response.payload).toBeNull();
  });

  test("random verse: translation-id = web; 200-ok", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const response = await getRandomVerse();

    /* assert: fetch */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringMatching(`${API_ROOT}/data/web/random`),
      expect.objectContaining({ method: "GET" })
    );

    /* assert: code, message */
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("Success. Check Payload.");

    /* assert: payload */
    expect(response.payload).toMatchObject({
      translation: {
        identifier: "web",
        name: "World English Bible",
        language: "English",
        language_code: "eng",
        license: "Public Domain",
      },
      random_verse: {
        book_id: "ACT",
        book: "Acts",
        chapter: 2,
        verse: 20,
        text:
          "The sun will be turned into darkness,\n" +
          "and the moon into blood,\n" +
          "before the great and glorious day of the Lord comes.",
      },
    });
  });

  test("random verse: translation-id = web; 4xx-er", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(rootWebRandomErr);
    const response = await getRandomVerse();

    /* assert: fetch */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringMatching(`${API_ROOT}/data/web/random`),
      expect.objectContaining({ method: "GET" })
    );

    /* assert: response */
    expect(response).toMatchObject({
      code: "api-fail",
      message: "Get Random Verse: Something Went Wrong.",
      payload: null,
    });
  });

  test("random verse: translation-id = mock-value, book-id = mock-value; 200-ok", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(rootTIdBIdRandomHandler);
    const tId = "xyz";
    const bId = "zbc";
    const response = await getRandomVerse({ translationId: tId, bookId: bId });

    /* assert: fetch */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringMatching(`${API_ROOT}/data/${tId}/random/${bId}`),
      expect.objectContaining({ method: "GET" })
    );

    /* assert: code, message */
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("Success. Check Payload.");

    /* assert: payload */
    expect(response.payload).not.toBeNull();
    expect(response.payload?.translation).toMatchObject({
      identifier: "xyz",
      name: "mock-name-xyz",
      language: "mock-language",
      language_code: "mock-lang-code",
      license: "mock-license",
    });
    expect(response.payload?.random_verse).toMatchObject({
      book_id: "mock-zbc-id",
      book: "mock-zbc-name",
      chapter: 1,
      verse: 1,
      text: "lorem ipsum",
    });
  });

  test("random verse: translation-id = mock-value, book-id = mock-value; 4xx-er", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(rootTIdBIdRandomErr);
    const tId = "xyz";
    const bId = "zbc";
    const response = await getRandomVerse({ translationId: tId, bookId: bId });

    /* assert: fetch */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringMatching(`${API_ROOT}/data/${tId}/random/${bId}`),
      expect.objectContaining({ method: "GET" })
    );

    /* assert: response */
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("Get Random Verse: Something Went Wrong.");
    expect(response.payload).toBeNull();
  });
});
