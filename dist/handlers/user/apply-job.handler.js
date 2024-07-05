"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJob = ApplyJob;
const applied_job_model_1 = require("../../model/user/applied-job.model");
const auth_handler_1 = require("../auth/auth.handler");
const job_model_1 = require("../../model/employee/job.model");
const mongoose_1 = require("mongoose");
async function ApplyJob(req, res) {
    try {
        const user = req?.user;
        const jobId = req?.params.jobId;
        if (!user?.id || !jobId) {
            return (0, auth_handler_1.handleError)(res, "Invalid request to the server", 500);
        }
        const isValidJob = await job_model_1.Job.findById(new mongoose_1.Types.ObjectId(jobId));
        if (!isValidJob) {
            return (0, auth_handler_1.handleError)(res, "Job not found", 400);
        }
        const application = new applied_job_model_1.AppliedJob({
            userId: user?.id,
            jobId,
            companyId: isValidJob.companyId,
            status: "Applied",
        });
        await application.save();
        return (0, auth_handler_1.handleSuccess)(res, "Job application submitted successfully");
    }
    catch (error) {
        console.log(error);
        return (0, auth_handler_1.handleError)(res, "Internal Server Error", 500);
    }
}
