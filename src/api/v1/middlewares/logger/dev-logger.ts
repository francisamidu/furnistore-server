import { format, createLogger, transports } from "winston";
const { timestamp, combine, colorize, errors, printf, prettyPrint, json } =
  format;

const buildDevLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack} ${message}`;
  });
  return createLogger({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat,
      json({
        space: 2,
      })
      // prettyPrint()
    ),
    transports: [new transports.Console()],
  });
};

export default buildDevLogger;
