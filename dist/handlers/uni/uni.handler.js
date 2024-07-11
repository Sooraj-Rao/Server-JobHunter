"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = getUserDetails;
exports.Logout = Logout;
const auth_handler_1 = require("../auth/auth.handler");
const user_model_1 = require("../../model/user/user.model");
const emp_model_1 = require("../../model/employee/emp.model");
async function getUserDetails(req, res) {
    try {
        let Collection;
        const user = req.user;
        // const data = req.session.userData;
        if (user?.type === "user") {
            Collection = user_model_1.User;
        }
        else if (user?.type === "company") {
            Collection = emp_model_1.Company;
        }
        else {
            return (0, auth_handler_1.handleError)(res, "Invalid user type specified", 400);
        }
        const findUser = await Collection.findById(user?.id).select("-password");
        if (!findUser) {
            return (0, auth_handler_1.handleError)(res, "User not found", 500);
        }
        const dataWithType = { user: findUser, type: user?.type };
        return (0, auth_handler_1.handleSuccessData)(res, "sucess", dataWithType);
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Internal Server Error", 500);
    }
}
async function Logout(req, res) {
    try {
        res.clearCookie("connect.sid");
        res.clearCookie("token");
        return (0, auth_handler_1.handleSuccess)(res, "Successfully logged out!");
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Internal Server Error", 500);
    }
}
