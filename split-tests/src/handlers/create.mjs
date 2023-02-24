import { createSplitTest } from "../lib/services/splitTest.mjs";
import { errorResponse, response } from "../lib/transport/http.mjs";

export const handler = async (event) => {
  const params = JSON.parse(event.body);

  try {
    const st = await createSplitTest(params);
    return response({
      result: "OK",
      splitTest: st,
    });
  } catch (err) {
    return errorResponse(
      `Failed to create workflow with payload: ${params}.`,
      err
    );
  }
};
