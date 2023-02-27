import * as store from "../lib/stores/splitTestStore.mjs";
import { getSplitTestService } from "../lib/services/splitTest.mjs";
import { errorResponse, response } from "../lib/transport/http.mjs";

const splitTestService = getSplitTestService(store);

export const handler = async (event) => {
  const params = JSON.parse(event.body);

  try {
    const st = await splitTestService.create(params);
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
