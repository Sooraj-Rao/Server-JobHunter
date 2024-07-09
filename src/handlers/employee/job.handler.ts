import { Request, Response } from "express";
import { IJob, Job } from "../../model/employee/job.model";
import {
  handleError,
  handleSuccess,
  handleSuccessData,
} from "../auth/auth.handler";

// Fetch all jobs
export async function getAllJobs(req: Request, res: Response) {
  try {
    if (req?.session?.userData?.jobs){
      return handleSuccessData(res, "Fetched all jobs", req.session.userData.jobs);
    }
    const jobs = await Job.find().exec();
    req.session.userData = {
      jobs,
    };
    return handleSuccessData(res, "Fetched all jobs", jobs);
  } catch (error) {
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
    if (req.user.user.type == "user") {
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
    const jobId = req.params.jobId;
    const deletedJob = await Job.findByIdAndDelete(jobId).exec();
    if (!deletedJob) {
      return handleError(res, "Job not found", 404);
    }
    return handleSuccess(res, "Job deleted successfully");
  } catch (error) {
    return handleError(res, "Failed to delete job", 500);
  }
}
