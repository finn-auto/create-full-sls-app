import { APIGatewayEvent } from "aws-lambda";
import { ContextStore } from "../services";
import { config } from "../settings";
import logger from "../utils/logger";
import { getRequestId } from "../utils/tracing";

const correlationIdMiddleware = () => {
  const correlationIdMiddlewareBefore = async ({
    event,
  }: {
    event: APIGatewayEvent;
  }) => {
    ContextStore.correlationId = getRequestId(
      event.headers?.[config.REQUEST_ID_HEADER_NAME]
    );
    logger.defaultMeta = {
      [config.REQUEST_ID_HEADER_NAME]: ContextStore.correlationId,
    };
  };

  return {
    before: correlationIdMiddlewareBefore,
  };
};

export default correlationIdMiddleware;
