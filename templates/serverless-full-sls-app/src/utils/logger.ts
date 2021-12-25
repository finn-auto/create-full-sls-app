// eslint-disable-next-line @typescript-eslint/no-var-requires
const winston = require("winston");

export const createLogger = (defaultMeta: Record<string, string> = {}) => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    defaultMeta: defaultMeta,
    level:
      !process.env.STAGE || process.env.STAGE === "development"
        ? "debug"
        : "info",
  });
  return logger;
};

const defaultLogger = createLogger();

export default defaultLogger;
