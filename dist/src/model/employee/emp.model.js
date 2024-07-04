"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    qualifications: { type: [String], required: true },
    skills: { type: [String], required: true },
    employmentType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Freelance"],
        required: true,
    },
    experienceLevel: {
        type: String,
        enum: ["Entry", "Mid", "Senior"],
        required: true,
    },
    location: { type: String, required: true },
    remote: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
});
const aboutSchema = new mongoose_1.Schema({
    industry: { type: String, required: true },
    website: { type: String, required: true },
    phone: { type: String, required: true },
});
const companySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: aboutSchema },
    jobs: { type: [jobSchema], default: [] },
});
exports.Company = (0, mongoose_1.model)("Company", companySchema);
