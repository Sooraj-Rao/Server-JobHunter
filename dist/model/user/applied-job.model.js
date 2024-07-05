"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedJob = void 0;
const mongoose_1 = require("mongoose");
const appliedJobSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
    companyId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true },
    status: {
        type: String,
        enum: ["Applied", "In Review", "Interview", "Offered", "Rejected"],
        default: "Applied",
        required: true,
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    notes: { type: String },
}, {
    timestamps: true,
});
exports.AppliedJob = (0, mongoose_1.model)("AppliedJob", appliedJobSchema);
