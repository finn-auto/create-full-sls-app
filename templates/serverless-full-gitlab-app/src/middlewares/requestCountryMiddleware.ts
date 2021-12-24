import { APIGatewayEvent } from "aws-lambda";
import { ContextStore } from "../services";
import { config } from "../settings";
import { getCountry } from "../utils/localization";
import logger from "../utils/logger";

const requestCountryMiddleware = () => {
  const requestCountryMiddlewareBefore = async ({
    event,
  }: {
    event: APIGatewayEvent;
  }) => {
    const languageHeader =
      event.headers?.[config.REQUEST_COUNTRY_HEADER_NAME] ||
      event.headers?.[config.REQUEST_COUNTRY_HEADER_NAME.toLocaleLowerCase()];
    ContextStore.requestCountry = getCountry(languageHeader);
    logger.defaultMeta = {
      [config.REQUEST_COUNTRY_HEADER_NAME]: ContextStore.requestCountry,
    };
  };

  return {
    before: requestCountryMiddlewareBefore,
  };
};

export default requestCountryMiddleware;
