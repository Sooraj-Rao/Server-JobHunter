import { User } from "../src/model/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
