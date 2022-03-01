import type { Request } from "express";
import type { Session, SessionData } from "express-session";
import { JwtPayload } from "jsonwebtoken";
import File from "./File";
import User from "./User";
interface SessionCustom {
  user?: User;
}
export default interface SessionRequest extends Request {
  session: Session & Partial<SessionData> & SessionCustom;
  roles?: any[];
  user?: User | JwtPayload | string | null;
  file?: File | any | Partial<undefined>;
}
