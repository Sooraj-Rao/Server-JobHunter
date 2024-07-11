"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const Authorize_1 = require("../../middleware/Authorize");
const user_info_handler_1 = __importDefault(require("../../handlers/user/user-info.handler"));
const apply_job_handler_1 = require("../../handlers/user/apply-job.handler");
const job_handler_1 = require("../../handlers/employee/job.handler");
const applied_jobs_handler_1 = require("../../handlers/user/applied-jobs.handler");
const router = (0, express_1.Router)();
exports.UserRouter = router;
router.get("/getall", job_handler_1.getAllJobs);
router.get("/getone/:id", job_handler_1.getJobById);
router.put("/updateinfo", Authorize_1.AuthorizeRequest, user_info_handler_1.default);
router.post("/apply/:jobId", Authorize_1.AuthorizeRequest, apply_job_handler_1.ApplyJob);
router.post("/applied/", Authorize_1.AuthorizeRequest, applied_jobs_handler_1.getAppliedJobs);
