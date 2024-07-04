import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user/user.model";
import dotenv from "dotenv";
import { Company } from "../model/employee/emp.model";
import { handleError } from "../handlers/auth/auth.handler";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export const AuthorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    let Collection: any;
    if (!token) {
      return handleError(res, "Unauthorized", 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      type: string;
    };
    if (decoded.type === "user") {
      Collection = User;
    } else if (decoded.type === "company") {
      Collection = Company;
    } else {
      return handleError(res, "Invalid user type specified", 400);
    }

    const user = await Collection.findById(decoded.userId);

    if (!user) {
      return handleError(res, "Unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return handleError(res, "Unauthorized", 401);
  }
};
