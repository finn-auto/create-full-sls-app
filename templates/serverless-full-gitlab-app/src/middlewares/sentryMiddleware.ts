import middy from "@middy/core";
import * as Yup from "yup";
import { ContextStore } from "../services";
import { config } from "../settings";
import { buildAWSResponse } from "../utils/aws";
import logger from "../utils/logger";
import Sentry, { configureReq } from "../utils/sentry";

const sentryMiddleware = () => {
  const sentryMiddlewareBefore = async () => {
    Sentry.setTag(config.REQUEST_ID_HEADER_NAME, ContextStore.correlationId);
  };

  const sentryMiddlewareOnError = async (request: middy.Request) => {
    const err = request.error;
    configureReq(request.event);
    logger.error("Error:", err);

    // Don't capture Validation errors
    if (Yup.ValidationError.isError(err)) {
      request.response = buildAWSResponse(403, {
        message: err.message,
        error: "Validation Error",
      });
    } else {
      Sentry.captureException(err);
      await Sentry.flush(2000);
      request.response = buildAWSResponse(500, {
        message: "Something went wrong",
        error: "",
      });
    }
  };

  return {
    before: sentryMiddlewareBefore,
    onError: sentryMiddlewareOnError,
  };
};

export default sentryMiddleware;
