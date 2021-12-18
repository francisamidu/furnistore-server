import type { Request } from "express";
import type { Session, SessionData } from "express-session";
import { JwtPayload } from "jsonwebtoken";
import User from "./User";
interface SessionCustom {
  user?: User;
}
export default interface SessionRequest extends Request {
  session: Session & Partial<SessionData> & SessionCustom;
  user?: User | JwtPayload | string | null;
}
