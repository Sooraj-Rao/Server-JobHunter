import { Schema, model, Document, Types } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  employmentType: string;
  experienceLevel: string;
  location: string;
  remote: boolean;
  publishedAt: Date;
}

export interface IAbout extends Document {
  industry: string;
  website: string;
  phone: number;
}

const jobSchema = new Schema<IJob>({
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

const aboutSchema = new Schema({
  industry: { type: String, required: true },
  website: { type: String, required: true },
  phone: { type: String, required: true },
});

export interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  about: IAbout;
  jobs: Types.DocumentArray<IJob>;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: aboutSchema },
  jobs: { type: [jobSchema], default: [] },
});

export const Company = model<ICompany>("Company", companySchema);
