"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const educationSchema = new mongoose_1.Schema({
    course: { type: String, required: true },
    year: { type: Number, required: true },
    collegeName: { type: String, required: true },
});
const experienceSchema = new mongoose_1.Schema({
    position: { type: String, required: true },
    years: { type: Number, required: true },
    company: { type: String, required: true },
});
const userInfoSchema = new mongoose_1.Schema({
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    skills: { type: [String], required: true },
    education: { type: [educationSchema], required: true },
    experience: { type: [experienceSchema], required: true },
    resumeUrl: { type: String, required: true },
    portfolioUrl: { type: String },
    linkedInProfile: { type: String, required: true },
    githubProfile: { type: String, required: true },
    website: { type: String },
});
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userInfo: { type: userInfoSchema },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
