import { uuid4 } from "@sentry/utils";

export const getRequestId = (initialRequestId?: string) => {
  return initialRequestId || uuid4();
};
