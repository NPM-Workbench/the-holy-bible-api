/* node modules */
import { jest } from "@jest/globals";

/* app imports */
import { API_ROOT } from "../../shared/index.js";
import { getListOfBookIds } from "../index.js";
import { getMockData, getListOfBookIdsOk, getListOfBookIdsErr } from "./msw-handlers.js";
import createMSWMockServer from "../../shared/msw-mock-server.js";

/* suite */
describe("Get List Of Book Ids", () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getListOfBookIdsOk]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test("fails when invalid props are passed", async () => {
    /* setup */
    const errMsg = "Get List of Book Ids: Identifier Prop Cannot Be Empty!";
    await expect(getListOfBookIds({id: ""})).rejects.toThrow(errMsg);
  });

  /* 2 */
  test("fetch gets called with expected parameters", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "mockId";
    await getListOfBookIds({id: tId});

    /* assert */
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${API_ROOT}/data/${tId}`),
      expect.objectContaining({ method: "GET" })
    )
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  /* 3 */
  test("return 200OK response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    const tId = "abc";
    const response = await getListOfBookIds({id: tId});

    /* assert: fetch, code, message */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toBe("api-ok");
    expect(response.message).toBe("Success. Check Payload.");

    /* assert: payload */
    expect(response.payload).not.toBeNull();
    expect(response.payload).toMatchObject(getMockData(tId));
  });

  /* 4 */
  test("returns 4xx-Err response", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, "fetch");
    mswServer.use(getListOfBookIdsErr);
    const tId = "abc";
    const response = await getListOfBookIds({id: tId});

    /* asserts */
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(response.code).toBe("api-fail");
    expect(response.message).toBe("Get List of Book Ids: Something Went Wrong.");
    expect(response.payload).toBeNull();
  });
});

