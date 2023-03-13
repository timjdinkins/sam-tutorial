import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../../lib/ddbDocClient";
import { SplitTest } from "../types";
import { getUUID, currentTime } from "../util";

const TABLE_NAME = process.env.SPLIT_TESTS_TABLE;

export const create = async (st: SplitTest): Promise<SplitTest> => {
  const now = currentTime();
  const id = getUUID();
  const ddbParams = {
    TableName: TABLE_NAME,
    Item: {
      pk: id,
      id: id,
      name: st.name,
      targets: st.targets || [],
      createdAt: now,
      updatedAt: now,
    },
  };
  await ddbDocClient.send(new PutCommand(ddbParams));
  return ddbParams.Item;
};

export const get = async (id: string): Promise<SplitTest> => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      pk: id,
    },
  };
  const data = await ddbDocClient.send(new GetCommand(params));
  return data.Item as SplitTest;
};
