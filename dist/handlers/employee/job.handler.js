"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobs = getAllJobs;
exports.CreateJob = CreateJob;
exports.getJobById = getJobById;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
const job_model_1 = require("../../model/employee/job.model");
const auth_handler_1 = require("../auth/auth.handler");
// Fetch all jobs
async function getAllJobs(req, res) {
    try {
        const jobs = await job_model_1.Job.find().exec();
        return (0, auth_handler_1.handleSuccessData)(res, "Fetched all jobs", jobs);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to fetch jobs", 500);
    }
}
async function CreateJob(req, res) {
    try {
        const { title, description, responsibilities, qualifications, skills, location, salaryRange, employmentType, experienceLevel, companyName, } = req.body;
        const companyId = req.user.id;
        if (req.user.user.type == "user") {
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
        console.error("Error creating job:", error);
        return (0, auth_handler_1.handleError)(res, "Failed to create job", 500);
    }
}
// Get a single job by ID
async function getJobById(req, res) {
    try {
        const jobId = req.params.jobId;
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
        const updatedJobData = req.body;
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
        const jobId = req.params.jobId;
        const deletedJob = await job_model_1.Job.findByIdAndDelete(jobId).exec();
        if (!deletedJob) {
            return (0, auth_handler_1.handleError)(res, "Job not found", 404);
        }
        return (0, auth_handler_1.handleSuccess)(res, "Job deleted successfully");
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Failed to delete job", 500);
    }
}
