/* imports */
import { jest } from "@jest/globals";
import { API_ROOT } from "../index.js";

/* suite */
describe("Root File Test", () => {
  /* 1 */
  test("base-api URL is as expected", () => {
    expect(API_ROOT.length).toBeGreaterThan(0);
    expect(API_ROOT).toEqual("https://bible-api.com");
  });
});
