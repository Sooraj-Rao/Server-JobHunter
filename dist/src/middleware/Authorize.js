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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../model/user/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const emp_model_1 = require("../model/employee/emp.model");
const auth_handler_1 = require("../handlers/auth/auth.handler");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const AuthorizeRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        let Collection;
        if (!token) {
            return (0, auth_handler_1.handleError)(res, "Unauthorized", 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded.type === "user") {
            Collection = user_model_1.User;
        }
        else if (decoded.type === "company") {
            Collection = emp_model_1.Company;
        }
        else {
            return (0, auth_handler_1.handleError)(res, "Invalid user type specified", 400);
        }
        const user = yield Collection.findById(decoded.userId);
        if (!user) {
            return (0, auth_handler_1.handleError)(res, "Unauthorized", 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        return (0, auth_handler_1.handleError)(res, "Unauthorized", 401);
    }
});
exports.AuthorizeRequest = AuthorizeRequest;
