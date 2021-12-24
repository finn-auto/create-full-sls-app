import * as Sentry from "@sentry/node";
import get from "lodash/get";
import { APIGatewayEvent } from "aws-lambda";
import { config } from "../settings";
import ContextStore from "../services/contextStore";

const isProdEnv = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: isProdEnv,
});

/**
 * Configure the Sentry scope by extracting useful tags and context from the given event
 */
export function configureReq(event: APIGatewayEvent): void {
  Sentry.configureScope((scope) => {
    scope.setTag("url", get(event, "path"));
    scope.setTag("method", get(event, "httpMethod"));
    scope.setContext("query", get(event, "queryStringParameters"));
    scope.setContext("headers", get(event, "headers"));
    if (event.body) {
      scope.setTag("body", get(event, "body") as string);
    }
    scope.setTag(config.REQUEST_ID_HEADER_NAME, ContextStore.correlationId);
    scope.setTag(
      config.REQUEST_COUNTRY_HEADER_NAME,
      ContextStore.requestCountry
    );
  });
}

export default Sentry;
