"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
    skills: { type: [String], required: true },
    location: {
        type: String,
        required: true,
    },
    salaryRange: {
        min: {
            type: String,
            required: true,
        },
        max: {
            type: String,
            required: true,
        },
    },
    employmentType: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Job = (0, mongoose_1.model)("Job", jobSchema);
