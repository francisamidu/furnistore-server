import SessionRequest from "../interfaces/Session";
import { exceptionHandler } from ".";
import logger from "./logger";

const wrapper =
  (fun: (context: any, req: SessionRequest) => any) =>
  (context: any, req: SessionRequest) => {
    console.log(logger);
    return Promise.resolve(fun(context, req)).catch(exceptionHandler);
  };

export default wrapper;
