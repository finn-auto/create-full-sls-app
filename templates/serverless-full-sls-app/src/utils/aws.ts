import { APIGatewayProxyResult } from "aws-lambda";
import { ContextStore } from "../services";
import { config } from "../settings";

export const buildAWSResponse = (
  status = 200,
  payload: object = {}
): APIGatewayProxyResult => ({
  statusCode: status,
  headers: {
    "Access-Control-Allow-Origin": "*",
    [config.REQUEST_ID_HEADER_NAME]: ContextStore.correlationId,
  },
  body: JSON.stringify(payload),
});
