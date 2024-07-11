import { Request, Response } from "express";
import { IJob, Job } from "../../model/employee/job.model";
import {
  handleError,
  handleSuccess,
  handleSuccessData,
} from "../auth/auth.handler";
import { AppliedJob } from "../../model/user/applied-job.model";

// Fetch all jobs
export async function getAllJobs(req: Request, res: Response) {
  try {
    if (req?.session?.userData?.jobData) {
      return handleSuccessData(
        res,
        "Fetched cache all jobs",
        req.session.userData.jobData.jobs
      );
    }
    const jobs = await Job.find().exec();
    if (req.session.userData)
      req.session.userData.jobData = {
        jobs,
      };
    return handleSuccessData(res, "Fetched all jobs", jobs);
  } catch (error) {
    console.log(error);
    return handleError(res, "Failed to fetch jobs", 500);
  }
}

export async function CreateJob(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      responsibilities,
      qualifications,
      skills,
      location,
      salaryRange,
      employmentType,
      experienceLevel,
      companyName,
    } = req.body;

    const companyId = req.user.id;
    console.log();
    if (req.user.type == "user") {
      return handleError(res, "You cant post jobs", 500);
    }

    const newJob: IJob = await Job.create({
      title: title,
      description: description,
      responsibilities: responsibilities,
      qualifications: qualifications,
      skills: skills,
      location: location,
      salaryRange: salaryRange,
      employmentType: employmentType,
      experienceLevel: experienceLevel,
      companyName: companyName,
      companyId: companyId,
    });

    return handleSuccessData(res, "Job created successfully", newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    return handleError(res, "Failed to create job", 500);
  }
}

// Get a single job by ID
export async function getJobById(req: Request, res: Response) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).exec();
    if (!job) {
      return handleError(res, "Job not found", 404);
    }
    return handleSuccessData(res, "Job found", job);
  } catch (error) {
    return handleError(res, "Failed to fetch job", 500);
  }
}

// Update a job by ID
export async function updateJob(req: Request, res: Response) {
  try {
    const jobId = req.params.id;
    const updatedJobData: Partial<IJob> = req.body;
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, {
      new: true,
    }).exec();
    if (!updatedJob) {
      return handleError(res, "Job not found", 404);
    }
    return handleSuccessData(res, "Job updated successfully", updatedJob);
  } catch (error) {
    return handleError(res, "Failed to update job", 500);
  }
}

// Delete a job by ID
export async function deleteJob(req: Request, res: Response) {
  try {
    const jobId = req.params.id;
    console.log(jobId);
    const deletedJob = await Job.findByIdAndDelete(jobId).exec();
    if (!deletedJob) {
      return handleError(res, "Job not found", 200);
    }
    return handleSuccess(res, "Job deleted successfully");
  } catch (error) {
    return handleError(res, "Failed to delete job", 500);
  }
}

// Get all jobs of a company..

export async function getPostedJobs(req: Request, res: Response) {
  try {
    const job = await Job.find({ companyId: req.user.id }).exec();
    if (!job) {
      return handleError(res, "Job not found", 200);
    }
    return handleSuccessData(res, "Job found", job);
  } catch (error) {
    return handleError(res, "Failed to fetch job", 500);
  }
}

export async function getAllApplications(req: Request, res: Response) {
  try {
    console.log(req.user.id);
    const job = await AppliedJob.find({ companyId: req.user.id })
      .populate("jobId")
      .populate("userId")
      .populate("companyId");
    if (!job) {
      return handleError(res, "No applications found", 200);
    }
    return handleSuccessData(res, "Applications found", job);
  } catch (error) {
    return handleError(res, "Failed to fetch Applications", 500);
  }
}

export async function updateApplicationStatus(req: Request, res: Response) {
  try {
    const id = req.params?.id;
    const msg = req.body?.status;
    console.log(msg);
    console.log(id);

    const job = await AppliedJob.findByIdAndUpdate(id, { status: msg });
    if (!job) {
      return handleError(res, "Failed to update", 200);
    }
    return handleSuccessData(res, "Succesfully updated", job);
  } catch (error) {
    return handleError(res, "Internal Server Error", 500);
  }
}
