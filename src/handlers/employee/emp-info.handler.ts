import { Request, Response } from "express";
import { Company } from "../../model/employee/emp.model";
import { handleError, handleSuccess } from "../auth/auth.handler";

export default async function updateEmp(req: Request, res: Response) {
  try {
    const { industry, website, phone,desc } = req.body;
   
    const authCompany = req.user;
    const updatedCompany = await Company.findByIdAndUpdate(
      authCompany.id,
      {
        $set: {
          'about.industry': industry,
          'about.website': website,
          'about.phone': phone,
          'about.desc': desc
        }
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
