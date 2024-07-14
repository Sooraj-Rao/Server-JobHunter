import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { handleError } from "../handlers/auth/auth.handler";

dotenv.config();

export const AuthorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req?.session?.user) {
      req.user = req.session.user;
    } else {
      return handleError(res, "UnAuthorized - Please login again", 401);
    }
    next();
  } catch (error) {
    return handleError(res, "Internal Server Error", 401);
  }
};
