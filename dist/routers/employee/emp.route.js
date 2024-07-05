"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpRouter = void 0;
const express_1 = require("express");
const Authorize_1 = require("../../middleware/Authorize");
const emp_info_handler_1 = __importDefault(require("../../handlers/employee/emp-info.handler"));
const job_handler_1 = require("../../handlers/employee/job.handler");
const router = (0, express_1.Router)();
exports.EmpRouter = router;
router.post("/create", Authorize_1.AuthorizeRequest, job_handler_1.CreateJob);
router.put("/update/:id", Authorize_1.AuthorizeRequest, job_handler_1.updateJob);
router.delete("/delete/:id", Authorize_1.AuthorizeRequest, job_handler_1.deleteJob);
router.post("/updateinfo", Authorize_1.AuthorizeRequest, emp_info_handler_1.default);
