import * as store from "../lib/stores/splitTestStore.mjs";
import { getSplitTestService } from "../lib/services/splitTest.mjs";
import { errorResponse } from "../lib/transport/http.mjs";

const splitTestService = getSplitTestService(store);

export const handler = async (event) => {
  const params = event.pathParameters;

  try {
    if (!params.id) {
      throw new Error("No id");
    }
    const target = await splitTestService.split(params.id);
    return {
      statusCode: 301,
      headers: {
        Location: target,
      },
    };
  } catch (err) {
    return errorResponse(
      `Error handling split with id: ${params.id}. Error: ${err.message}`
    );
  }
};
