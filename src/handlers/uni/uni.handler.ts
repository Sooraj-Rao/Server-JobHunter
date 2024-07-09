import { Request, Response } from "express";
import { handleError } from "../auth/auth.handler";
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

    const user = await Collection.findById(data?.id);
    res.send(user);
  } catch (error) {
    return handleError(res, "Internal Server Error", 500);
  }
}
