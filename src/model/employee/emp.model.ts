import { Schema, model, Document, Types } from "mongoose";

export interface IAbout extends Document {
  industry: string;
  website: string;
  phone: number;
}

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
  jobs: Types.ObjectId[]; 
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: aboutSchema },
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

export const Company = model<ICompany>("Company", companySchema);
