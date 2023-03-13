import * as store from "../lib/stores/splitTestStore";
import { getSplitTestService } from "../lib/services/splitTest";
import { errorResponse } from "../lib/transport/http";
import { SplitTestTarget } from "../lib/types";

const splitTestService = getSplitTestService(store);

export const handler = async (event) => {
  const params = event.pathParameters;

  try {
    if (!params.id) {
      throw new Error("No id");
    }
    const target: SplitTestTarget | undefined = await splitTestService.split(params.id);
    if (target) {
      return {
        statusCode: 301,
        headers: {
          Location: target,
        },
      };
    } else {
      return { statusCode: 404 };
    }
  } catch (err) {
    return errorResponse(
      `Error handling split with id: ${params.id}. Error: ${err.message}`,
      err
    );
  }
};
