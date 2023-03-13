import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "./ddb";

const marshallOptions = {
  convertEmptyValues: false, // false, by default.
  removeUndefinedValues: true, // false, by default.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export { ddbDocClient };
