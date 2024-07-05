import { Document, Schema, model, Types } from "mongoose";

export interface IAppliedJob extends Document {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  companyId: Types.ObjectId;
  status: string;
  appliedAt: Date;
  updatedAt: Date;
  notes?: string;
}

const appliedJobSchema = new Schema<IAppliedJob>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    status: {
      type: String,
      enum: ["Applied", "In Review", "Interview", "Offered", "Rejected"],
      default: "Applied",
      required: true,
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const AppliedJob = model<IAppliedJob>("AppliedJob", appliedJobSchema);
