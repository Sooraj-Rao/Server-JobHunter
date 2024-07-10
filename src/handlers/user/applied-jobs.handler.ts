import { Request, Response } from "express";
import { AppliedJob } from "../../model/user/applied-job.model";
import { handleError, handleSuccessData } from "../auth/auth.handler";

export async function getAppliedJobs(req: Request, res: Response) {
  const uid = req.user.id;
  try {
    const AppliedJobs = await AppliedJob.find({ userId: uid })
      .populate("jobId")
      .populate("companyId");
    if (AppliedJobs.length==0)
      return handleError(res, "Yet to apply for jobs", 200);
    return handleSuccessData(res, "succes", AppliedJobs);
  } catch (error) {}
}
