/* imports */
import { API_ROOT } from "../shared/index.js";
import { TAPIRes } from "../types/index.js";

/* types */
type TGetRandVerseOldTestament = TAPIRes & {
  payload: Record<string, any> | null;
};
type TInput = { id: string };
type TOutput = TGetRandVerseOldTestament;

/* module */
async function getRandomVerseOldTestament(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { id } = props;
  const fName = "Get Random Verse: Old Testament";

  if (id.length <= 0) {
    throw new Error(`${fName}: Identifier Prop Cannot Be Empty!`);
  } else {
    /* setup */
    const API_URL = `${API_ROOT}/data/${id}/random/OT`;

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
}

/* exports */
export type { TGetRandVerseOldTestament };
export { getRandomVerseOldTestament };
