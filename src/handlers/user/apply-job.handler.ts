import { Request, Response } from "express";
import { AppliedJob } from "../../model/user/applied-job.model";
import { handleError, handleSuccess } from "../auth/auth.handler";
import { Job } from "../../model/employee/job.model";
import { Types } from "mongoose";

export async function ApplyJob(req: Request, res: Response) {
  try {
    const user = req?.user;
    const jobId = req?.params.jobId;
    if (!user?.id || !jobId) {
      return handleError(res, "Invalid request to the server", 500);
    }
    const isValidJob = await Job.findById(new Types.ObjectId(jobId));
    if (!isValidJob) {
      return handleError(res, "Job not found", 400);
    }

    const application = new AppliedJob({
      userId: user?.id,
      jobId,
      companyId: isValidJob.companyId,
      status: "Applied",
    });

    await application.save();
    return handleSuccess(res, "Job application submitted successfully");
  } catch (error) {
    console.log(error);
    return handleError(res, "Internal Server Error", 500);
  }
}
