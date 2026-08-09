/* node modules */
import { jest } from "@jest/globals";

/* app imports */
import { API_ROOT } from "../../shared/index.js";
import { getAvailableTranslations } from "../index.js";
import { mockTData, getAvailableTranslationsOK, getAvailableTranslationsErr } from "./msw-handlers.js";
import createMSWMockServer from "../../shared/msw-mock-server.js";

/* suite */
describe("Get Available Translations", () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getAvailableTranslationsOK]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test("fetch gets called with expected parameters", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    await getAvailableTranslations();

    /* asserts */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data`),
      expect.objectContaining({ method: "GET" })
    );
  });

  /* 2 */
  test("returns 200-OK response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const response = await getAvailableTranslations();

    /* asserts */
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("Success. Check Payload.");
    expect(response.payload).toMatchObject({translations: [...mockTData]});
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  /* 3 */
  test("returns 4xx-Err response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(getAvailableTranslationsErr);
    const response = await getAvailableTranslations();

    /* assert */
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("Get Available Translations: Something Went Wrong.");
    expect(response.payload).toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
