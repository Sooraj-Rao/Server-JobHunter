"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateEmp;
const emp_model_1 = require("../../model/employee/emp.model");
const auth_handler_1 = require("../auth/auth.handler");
async function updateEmp(req, res) {
    try {
        const { industry, website, phone } = req.body;
        if (!industry || !website || !phone) {
            return (0, auth_handler_1.handleError)(res, "All fields are required", 400);
        }
        const authCompany = req.user;
        const updatedCompany = await emp_model_1.Company.findByIdAndUpdate(authCompany._id, {
            about: {
                industry,
                website,
                phone,
            },
        }, { new: true });
        if (updatedCompany) {
            (0, auth_handler_1.handleSuccess)(res, "Company details updated successfully");
        }
        else {
            (0, auth_handler_1.handleError)(res, "Failed to update company details", 500);
        }
    }
    catch (error) {
        console.error("Error updating company details:", error);
        (0, auth_handler_1.handleError)(res, "Failed to update company details", 500);
    }
}
