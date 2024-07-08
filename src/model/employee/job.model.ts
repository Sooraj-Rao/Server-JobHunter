import { Document, Schema, model, Types } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  location: string;
  salaryRange: {
    min: number;
    max: number;
  };
  employmentType: string;
  experienceLevel: string;
  companyId: Types.ObjectId;
  companyName: string;
  postedAt: Date;
}

const jobSchema = new Schema<IJob>({
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
      type: Number,
      required: true,
    },
    max: {
      type: Number,
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
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Job = model<IJob>("Job", jobSchema);
