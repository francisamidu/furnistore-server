import { format, createLogger, transports } from "winston";
const { timestamp, combine, colorize, errors, json } = format;

const buildProdLogger = () => {
  return createLogger({
    format: combine(colorize(), timestamp(), errors({ stack: true }), json()),
    defaultMeta: {
      service: "user-service",
    },
    transports: [new transports.Console()],
  });
};

export default buildProdLogger;
