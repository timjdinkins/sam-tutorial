import * as store from "../lib/stores/splitTestStore";
import { getSplitTestService } from "../lib/services/splitTest";
import { errorResponse, response } from "../lib/transport/http";
import { SplitTest } from "../lib/types";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const splitTestService = getSplitTestService(store);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const params: SplitTest = JSON.parse(event.body || "");

  try {
    const st: SplitTest = await splitTestService.create(params);
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
