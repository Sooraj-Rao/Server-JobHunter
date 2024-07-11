"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdateUser;
const user_model_1 = require("../../model/user/user.model");
const auth_handler_1 = require("../auth/auth.handler");
async function UpdateUser(req, res) {
    try {
        const { name, email, phone, address, city, state, country, postalCode, skills, experience, education, resumeUrl, portfolioUrl, linkedInProfile, githubProfile, website, } = req.body?.updateModal;
        const authUser = req.user;
        console.log(req?.body?.updateModal);
        const updateUser = await user_model_1.User.findByIdAndUpdate(authUser.id, {
            $set: {
                name,
                email,
                "userInfo.phone": phone,
                "userInfo.address": address,
                "userInfo.city": city,
                "userInfo.state": state,
                "userInfo.country": country,
                "userInfo.postalCode": postalCode,
                "userInfo.skills": skills,
                "userInfo.experience": experience,
                "userInfo.education": education,
                "userInfo.resumeUrl": resumeUrl,
                "userInfo.portfolioUrl": portfolioUrl,
                "userInfo.linkedInProfile": linkedInProfile,
                "userInfo.githubProfile": githubProfile,
                "userInfo.website": website,
            },
        }, { new: true });
        if (updateUser) {
            return (0, auth_handler_1.handleSuccess)(res, "User info updated successfully");
        }
        else {
            return (0, auth_handler_1.handleError)(res, "Failed to update user info", 500);
        }
    }
    catch (error) {
        console.error("Error updating user info:", error);
        return (0, auth_handler_1.handleError)(res, "Failed to update user info", 500);
    }
}
