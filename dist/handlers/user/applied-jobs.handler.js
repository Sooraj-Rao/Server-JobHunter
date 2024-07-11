"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppliedJobs = getAppliedJobs;
const applied_job_model_1 = require("../../model/user/applied-job.model");
const auth_handler_1 = require("../auth/auth.handler");
async function getAppliedJobs(req, res) {
    const uid = req.user.id;
    try {
        const AppliedJobs = await applied_job_model_1.AppliedJob.find({ userId: uid })
            .populate("jobId")
            .populate("companyId");
        if (AppliedJobs.length == 0)
            return (0, auth_handler_1.handleError)(res, "Yet to apply for jobs", 200);
        return (0, auth_handler_1.handleSuccessData)(res, "succes", AppliedJobs);
    }
    catch (error) { }
}
