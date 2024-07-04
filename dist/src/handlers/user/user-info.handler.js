"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateUser;
const user_model_1 = require("../../model/user/user.model");
function UpdateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone, address, city, state, country, postalCode, skills, experience, education, resumeUrl, portfolioUrl, linkedInProfile, githubProfile, website, } = req.body;
            const authUser = req.user;
            const updateUser = yield user_model_1.User.findByIdAndUpdate(authUser.id, {
                userInfo: {
                    phone,
                    address,
                    city,
                    state,
                    country,
                    postalCode,
                    skills,
                    experience,
                    education,
                    resumeUrl,
                    portfolioUrl,
                    linkedInProfile,
                    githubProfile,
                    website,
                },
            }, { new: true });
            if (updateUser) {
                return res.status(201).json({
                    message: "User info updated successfully",
                    error: false,
                });
            }
            else {
                return res.status(500).json({
                    error: true,
                    message: "Failed to update user info",
                });
            }
        }
        catch (error) {
            console.error("Error updating user info:", error);
            return res.status(500).json({
                error: true,
                message: "Failed to update user info",
            });
        }
    });
}
