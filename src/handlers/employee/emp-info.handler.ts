import { Request, Response } from "express";
import { Company } from "../../model/employee/emp.model";
import { handleError, handleSuccess } from "../auth/auth.handler";

export default async function updateEmp(req: Request, res: Response) {
  try {
    const data = req.body?.about;
    const authCompany = req.user;
    console.log(authCompany);
    const updatedCompany = await Company.findByIdAndUpdate(
      authCompany.id,
      data,
      { new: true }
    );
    console.log(updatedCompany);
    if (updatedCompany) {
      handleSuccess(res, "Company details updated successfully");
    } else {
      handleError(res, "Failed to update company details", 500);
    }
  } catch (error) {
    console.error("Error updating company details:", error);
    handleError(res, "Failed to update company details", 500);
  }
}
