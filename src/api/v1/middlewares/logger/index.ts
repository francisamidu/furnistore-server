import buildDevLogger from "./dev-logger";
import buildProdLogger from "./prod-logger";

let logger = buildDevLogger();

if (process.env.NODE_ENV !== "development") {
  logger = buildProdLogger();
}

export default logger;
