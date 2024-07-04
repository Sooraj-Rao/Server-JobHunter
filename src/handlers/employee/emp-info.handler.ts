import { Request, Response } from "express";
import { Company } from "../../model/employee/emp.model";
import { handleError, handleSuccess } from "../auth/auth.handler";

export default async function updateEmp(req: Request, res: Response) {
  try {
    const { industry, website, phone } = req.body;
    if (!industry || !website || !phone) {
      return handleError(res, "All fields are required", 400);
    }
    const authCompany = req.user;

    const updatedCompany = await Company.findByIdAndUpdate(
      authCompany._id,
      {
        about: {
          industry,
          website,
          phone,
        },
      },
      { new: true }
    );

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
