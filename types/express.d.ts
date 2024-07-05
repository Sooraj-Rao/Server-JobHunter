import { User } from "../src/model/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

import session from "express-session";

declare module "express-session" {
  interface SessionData {
    visited?: boolean;
    user?: { name: string; password: string };
  }
}

declare module "express-serve-static-core" {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
    sessionID: string;
    sessionStore: session.Store;
  }
}

