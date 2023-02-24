import { getTargetFromSplit } from "../lib/services/splitTest.mjs";
import { errorResponse } from "../lib/transport/http.mjs";

export const handler = async (event) => {
  const params = event.pathParameters;

  try {
    if (!params.id) {
      throw new Error("No id");
    }
    const target = await getTargetFromSplit(params.id);
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
