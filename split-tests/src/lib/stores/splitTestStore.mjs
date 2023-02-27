import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../../lib/ddbDocClient.mjs";
import { getUUID, currentTime } from "../util.mjs";

const TABLE_NAME = process.env.SPLIT_TESTS_TABLE;

export const newSplitTest = () => {
  return {
    id: getUUID(),
    name: "",
    targets: [],
    createdAt: "",
    updatedAt: "",
  };
};

export const newTarget = () => {
  return {
    name: "",
    url: "",
    pct: 0,
    createdAt: "",
    updatedAt: "",
  };
};

export const create = async (params) => {
  const now = currentTime();
  const id = getUUID();
  const ddbParams = {
    TableName: TABLE_NAME,
    Item: {
      pk: id,
      id: id,
      name: params.name,
      targets: params.targets || [],
      createdAt: now,
      updatedAt: now,
    },
  };
  console.log(ddbParams);
  await ddbDocClient.send(new PutCommand(ddbParams));
  return ddbParams.Item;
};

export const get = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      pk: id,
    },
  };
  const data = await ddbDocClient.send(new GetCommand(params));
  return data.Item;
};
