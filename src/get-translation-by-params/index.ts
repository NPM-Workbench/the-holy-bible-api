/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIRes } from "../types/index.js";

/* types */
type TGetTranslationByParamsRes = TAPIRes & {
  payload: Record<string, any> | null;
};
type TInput = {
  translationId: string,
  bookId?: string,
  chapterId?: number,
};
type TOutput = TGetTranslationByParamsRes;

/* module */
async function getTranslationByParams(props?: TInput): Promise<TOutput> {
  /* setup */
  let API_URL = `${API_ROOT}/data`;
  const fName = "Get Translation By Params";

  /* props? */
  if (props) {
    const tId = props.translationId;
    API_URL = `${API_URL}/${tId}`;

    const bId = props.bookId ?? "";
    const vId = props.chapterId ?? "";
    if (bId) {
      API_URL += `/${bId}`;
      API_URL += !!(vId) ? "/" + vId : "";
    }
  } else {
    API_URL += "/web";
  }

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
    console.error(error);
    return { code: "api-fail", message: `${fName}: Something Went Wrong.`, payload: null };
  }
}

/* exports */
export type { TGetTranslationByParamsRes };
export { getTranslationByParams };
