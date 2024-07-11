import { Request, Response } from "express";
import {
  handleError,
  handleSuccess,
  handleSuccessData,
} from "../auth/auth.handler";
import { User } from "../../model/user/user.model";
import { Company } from "../../model/employee/emp.model";

export async function getUserDetails(req: Request, res: Response) {
  try {
    let Collection;
    const user=req.user;
    // const data = req.session.userData;
    if (user?.type === "user") {
      Collection = User;
    } else if (user?.type === "company") {
      Collection = Company;
    } else {
      return handleError(res, "Invalid user type specified", 400);
    }

    const findUser = await Collection.findById(user?.id).select("-password");
    if (!findUser) {
      return handleError(res, "User not found", 500);
    }
    const dataWithType = { user:findUser, type: user?.type };
    return handleSuccessData(res, "sucess", dataWithType);
  } catch (error) {
    return handleError(res, "Internal Server Error", 500);
  }
}

export async function Logout(req: Request, res: Response) {
  try {
    res.clearCookie("connect.sid");
    res.clearCookie("token");
    return handleSuccess(res, "Successfully logged out!");
  } catch (error) {
    return handleError(res, "Internal Server Error", 500);
  }
}
