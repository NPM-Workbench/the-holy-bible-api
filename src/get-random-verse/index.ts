/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIRes } from "../types/index.js";

/* types */
type TGetRandomVerseRes = TAPIRes & {
  payload: Record<string, any> | null;
};
type TInput = undefined | {
  translationId: string,
  bookId?: string
};
type TOutput = TGetRandomVerseRes;

/* module */
async function getRandomVerse(props?: TInput): Promise<TOutput> {
  /* setup */
  let API_URL = `${API_ROOT}/data`;
  const fName = "Get Random Verse";

  /* props? */
  if (props) {
    const tId = props.translationId;
    const bId = props.bookId ?? "";
    API_URL = `${API_URL}/${tId}/random${(!!bId) ? "/" + bId : ''}`;
  } else {
    API_URL = `${API_URL}/web/random`;
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
export type { TGetRandomVerseRes };
export { getRandomVerse };
