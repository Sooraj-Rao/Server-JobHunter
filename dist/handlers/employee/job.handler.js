"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobs = getAllJobs;
exports.CreateJob = CreateJob;
exports.getJobById = getJobById;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
exports.getPostedJobs = getPostedJobs;
exports.getAllApplications = getAllApplications;
exports.updateApplicationStatus = updateApplicationStatus;
const job_model_1 = require("../../model/employee/job.model");
const auth_handler_1 = require("../auth/auth.handler");
const applied_job_model_1 = require("../../model/user/applied-job.model");
// Fetch all jobs
async function getAllJobs(req, res) {
    try {
        if (req?.session?.userData?.jobData) {
            return (0, auth_handler_1.handleSuccessData)(res, "Fetched cache all jobs", req.session.userData.jobData.jobs);
        }
        const jobs = await job_model_1.Job.find().exec();
        if (req.session.userData)
            req.session.userData.jobData = {
                jobs,
            };
        return (0, auth_handler_1.handleSuccessData)(res, "Fetched all jobs", jobs);
    }
    catch (error) {
        console.log(error);
        return (0, auth_handler_1.handleError)(res, "Failed to fetch jobs", 500);
    }
}
async function CreateJob(req, res) {
    try {
        const { title, description, responsibilities, qualifications, skills, location, salaryRange, employmentType, experienceLevel, companyName, } = req.body.jobData;
        const companyId = req.user.id;
        if (req.user.type == "user") {
            return (0, auth_handler_1.handleError)(res, "You cant post jobs", 500);
        }
        const newJob = await job_model_1.Job.create({
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
        return (0, auth_handler_1.handleSuccessData)(res, "Job created successfully", newJob);
    }
    catch (error) {
        // console.error("Error creating job:", error);
        return (0, auth_handler_1.handleError)(res, "Failed to create job", 500);
    }
}
// Get a single job by ID
async function getJobById(req, res) {
    try {
        const jobId = req.params.id;
        const job = await job_model_1.Job.findById(jobId).exec();
        if (!job) {
            return (0, auth_handler_1.handleError)(res, "Job not found", 404);
        }
        return (0, auth_handler_1.handleSuccessData)(res, "Job found", job);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to fetch job", 500);
    }
}
// Update a job by ID
async function updateJob(req, res) {
    try {
        const jobId = req.params.id;
        const updatedJobData = req.body?.selectedJob;
        const updatedJob = await job_model_1.Job.findByIdAndUpdate(jobId, updatedJobData, {
            new: true,
        }).exec();
        if (!updatedJob) {
            return (0, auth_handler_1.handleError)(res, "Job not found", 404);
        }
        return (0, auth_handler_1.handleSuccessData)(res, "Job updated successfully", updatedJob);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to update job", 500);
    }
}
// Delete a job by ID
async function deleteJob(req, res) {
    try {
        const jobId = req.params.id;
        console.log(jobId);
        const deletedJob = await job_model_1.Job.findByIdAndDelete(jobId).exec();
        if (!deletedJob) {
            return (0, auth_handler_1.handleError)(res, "Job not found", 200);
        }
        return (0, auth_handler_1.handleSuccess)(res, "Job deleted successfully");
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to delete job", 500);
    }
}
// Get all jobs of a company..
async function getPostedJobs(req, res) {
    try {
        const job = await job_model_1.Job.find({ companyId: req.user.id }).exec();
        if (!job) {
            return (0, auth_handler_1.handleError)(res, "Job not found", 200);
        }
        return (0, auth_handler_1.handleSuccessData)(res, "Job found", job);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to fetch job", 500);
    }
}
async function getAllApplications(req, res) {
    try {
        console.log(req.user.id);
        const job = await applied_job_model_1.AppliedJob.find({ companyId: req.user.id })
            .populate("jobId")
            .populate("userId")
            .populate("companyId");
        if (!job) {
            return (0, auth_handler_1.handleError)(res, "No applications found", 200);
        }
        return (0, auth_handler_1.handleSuccessData)(res, "Applications found", job);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to fetch Applications", 500);
    }
}
async function updateApplicationStatus(req, res) {
    try {
        const id = req.params?.id;
        const msg = req.body?.status;
        console.log(msg);
        console.log(id);
        const job = await applied_job_model_1.AppliedJob.findByIdAndUpdate(id, { status: msg });
        if (!job) {
            return (0, auth_handler_1.handleError)(res, "Failed to update", 200);
        }
        return (0, auth_handler_1.handleSuccessData)(res, "Succesfully updated", job);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Internal Server Error", 500);
    }
}
