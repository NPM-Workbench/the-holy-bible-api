/* node modules */
import { jest } from "@jest/globals";

/* app imports */
import createMSWMockServer from "../../shared/msw-mock-server.js";
import { API_ROOT } from "../../shared/index.js";
import { getRandomVerseOldTestament } from "../index.js";
import { getRandomVerseOldTestamentErr, getRandomVerseOldTestamentHandler } from "./msw-handlers.js";

/* suite */
describe("Get Random Verse: Old Testament", () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getRandomVerseOldTestamentHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test("throws err when fields are invalid", async () => {
    const errMsg = "Get Random Verse: Old Testament: Identifier Prop Cannot Be Empty!";
    await expect(getRandomVerseOldTestament({id: ""})).rejects.toThrow(errMsg);
  });

  /* 2 */
  test("fetch gets called with expected parameters", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mock";
    await getRandomVerseOldTestament({id: tId});

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/${tId}/random/OT`),
      expect.objectContaining({ method: "GET" })
    )
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  /* 3 */
  test("returns 200-OK response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mock";
    const response = await getRandomVerseOldTestament({id: tId});

    /* asserts */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("Success. Check Payload.");
    expect(response.payload).toMatchObject({
      translation: {
        identifier: 'mock',
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
    })
  });

  /* 4 */
  test("return 4xx-Err response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mock";
    mswServer.use(getRandomVerseOldTestamentErr);
    const response = await getRandomVerseOldTestament({id: tId});

    /* asserts */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("Get Random Verse: Old Testament: Something Went Wrong.");
    expect(response.payload).toBeNull();
  });
});
