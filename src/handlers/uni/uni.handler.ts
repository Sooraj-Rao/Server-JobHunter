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
    const data = req.session.userData;
    if (data?.userData?.type === "user") {
      Collection = User;
    } else if (data?.userData?.type === "company") {
      Collection = Company;
    } else {
      return handleError(res, "Invalid user type specified", 400);
    }

    const user = await Collection.findById(data?.id).select("-password");
    if (!user) {
      return handleError(res, "User not found", 500);
    }
    const dataWithType = { user, type: data.userData.type };
    return handleSuccessData(res, "sucess", dataWithType);
  } catch (error) {
    return handleError(res, "Internal Server Error", 500);
  }
}

export async function Logout(req: Request, res: Response) {
  try {
    res.clearCookie("connect.sid");
    res.clearCookie("token");
    return handleSuccess(res, "successfully Logged out!");
  } catch (error) {
    return handleError(res, "Internal Server Error", 500);
  }
}
