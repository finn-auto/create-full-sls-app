import * as Yup from "yup";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpHeaderNormalizerMiddleware from "@middy/http-header-normalizer";
import {
  correlationIdMiddleware,
  sentryMiddleware,
  requestCountryMiddleware,
} from "../../middlewares";
import { buildAWSResponse } from "../../utils/aws";
import logger from "../../utils/logger";

const requestSchema = Yup.object({
  param1: Yup.string().required("param1 is required"),
}).required("Payload is required");

const StatusHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== "GET") {
    return buildAWSResponse(405, { message: "Method not Allowed" });
  }

  const params = event.queryStringParameters;
  if (params) {
    const { param1 } = await requestSchema.validate(params);

    logger.info(
      "Called StatusHandler dummy endpoint with a querystring parameter named 'param1'",
      { param1 }
    );
  }

  return buildAWSResponse(200, {
    data: "This is a dummy endpoint success response",
  });
};

export default middy(StatusHandler)
  .use(httpHeaderNormalizerMiddleware())
  .use(correlationIdMiddleware())
  .use(sentryMiddleware())
  .use(requestCountryMiddleware());
