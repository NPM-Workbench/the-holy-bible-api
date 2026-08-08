import { jest } from "@jest/globals";
import createMSWMockServer from "../../shared/msw-mock-server.js";
import { API_ROOT } from "../../shared/index.js";
import { getRandomVerseNewTestament } from "../index.js";
import { getRandomVerseNewTestamentErr, getRandomVerseNewTestamentHandler } from "./msw-handler.js";

/* suite */
describe(" Get Random Verse New Testament", () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getRandomVerseNewTestamentHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test("throws error when fields are invalid", async () => {
    const errMsg = "Get Random Verse: New Testament: Identifier Prop Cannot Be Empty!";
    await expect(getRandomVerseNewTestament({id: ""})).rejects.toThrow(errMsg);
  });

  /* 2 */
  test("fetch gets called with expected paramters", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mock";
    await getRandomVerseNewTestament({id: tId});

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/${tId}/random/NT`),
      expect.objectContaining({ method: "GET" })
    )
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  /* 3 */
  test("returns 200-OK response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mockId";
    const response = await getRandomVerseNewTestament({id: tId});

    /* assert */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toEqual("api-ok");
    expect(response.message).toEqual("Success. Check Payload.");
    expect(response.payload).toMatchObject({
      translation: {
        identifier: 'mockId',
        name: 'mock-name',
        language: 'mock-language',
        language_code: 'mock-code',
        license: 'mock-lic'
      },
      random_verse: {
        book_id: 'mock-book-id',
        book: 'mock-book',
        chapter: 1,
        verse: 1,
        text: 'mock-bible-text'
      }
    });
  });

  /* 4 */
  test("returns 4xx-Err response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mockId";
    mswServer.use(getRandomVerseNewTestamentErr);
    const response = await getRandomVerseNewTestament({id: tId});

    /* assert */
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("Get Random Verse: New Testament: Something Went Wrong.");
    expect(response.payload).toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
