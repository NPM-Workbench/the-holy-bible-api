/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIRes } from "../types/index.js";

/* types */
type TGetAvailableTranslationsRes = TAPIRes & {
  payload: Record<string, any> | null;
};
type TOutput = TGetAvailableTranslationsRes;

/* module */
async function getAvailableTranslations(): Promise<TOutput> {
  /* setup */
  const API_URL = `${API_ROOT}/data`;
  const fName = "Get Available Translations";

  try {
    /* fetch */
    const response = await fetch(API_URL, {method: "GET"});

    /* check and end */
    if (!response.ok) {
      return { code: "api-fail", message: `${fName}: Something Went Wrong.`, payload: null };
    } else {
      const data = await response.json();
      return { code: "api-ok", message: "Success. Check Payload.", payload: data };
    }
  } catch (error) {
    console.log(error);
    return { code: "api-fail", message: `${fName}: Something Went Wrong.`, payload: null };
  }
}

/* exports */
export type { TGetAvailableTranslationsRes };
export { getAvailableTranslations };
