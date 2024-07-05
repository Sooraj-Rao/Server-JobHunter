import { Document, Schema, model, Types } from "mongoose";

interface IEducation {
  course: string;
  year: number;
  collegeName: string;
}

interface IExperience {
  position: string;
  years: number;
  company: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userInfo: {
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    skills: string[];
    education: IEducation[];
    experience: IExperience[];
    resumeUrl: string;
    portfolioUrl?: string;
    linkedInProfile: string;
    githubProfile: string;
    website?: string;
  };
  appliedJobs: Types.ObjectId[]; 
}

const educationSchema = new Schema({
  course: { type: String, required: true },
  year: { type: Number, required: true },
  collegeName: { type: String, required: true },
});

const experienceSchema = new Schema({
  position: { type: String, required: true },
  years: { type: Number, required: true },
  company: { type: String, required: true },
});

const userInfoSchema = new Schema({
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  skills: { type: [String], required: true },
  education: { type: [educationSchema], required: true },
  experience: { type: [experienceSchema] },
  resumeUrl: { type: String, required: true },
  portfolioUrl: { type: String },
  linkedInProfile: { type: String, required: true },
  githubProfile: { type: String, required: true },
  website: { type: String },
});

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userInfo: { type: userInfoSchema},
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
