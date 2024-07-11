"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const aboutSchema = new mongoose_1.Schema({
    desc: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String, required: true },
    phone: { type: String, required: true },
});
const companySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: aboutSchema },
    jobs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Job" }],
});
exports.Company = (0, mongoose_1.model)("Company", companySchema);
