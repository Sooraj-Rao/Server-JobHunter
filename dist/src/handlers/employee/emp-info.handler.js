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
exports.default = updateEmp;
const emp_model_1 = require("../../model/employee/emp.model");
const auth_handler_1 = require("../auth/auth.handler");
function updateEmp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { industry, website, phone } = req.body;
            if (!industry || !website || !phone) {
                return (0, auth_handler_1.handleError)(res, "All fields are required", 400);
            }
            const authCompany = req.user;
            const updatedCompany = yield emp_model_1.Company.findByIdAndUpdate(authCompany._id, {
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
    });
}
