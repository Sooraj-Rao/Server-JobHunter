"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
exports.handleSuccess = handleSuccess;
exports.handleSuccessData = handleSuccessData;
exports.Register = Register;
exports.Login = Login;
const user_model_1 = require("../../model/user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const emp_model_1 = require("../../model/employee/emp.model");
dotenv_1.default.config();
function handleError(res, message, statusCode) {
    return res.status(statusCode).json({ error: true, message });
}
function handleSuccess(res, message) {
    return res.status(200).json({ error: false, message });
}
function handleSuccessData(res, message, data) {
    return res.status(200).json({ error: false, message, data });
}
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";
async function Register(req, res) {
    try {
        const { name, email, password, type } = req.body;
        let Collection;
        if (type === "user") {
            Collection = user_model_1.User;
        }
        else if (type === "company") {
            Collection = emp_model_1.Company;
        }
        else {
            return handleError(res, "Invalid user type specified", 400);
        }
        if (!name || !email || !password) {
            return handleError(res, "All fields are required", 400);
        }
        const isExistingUser = await Collection.findOne({ email });
        if (isExistingUser) {
            return handleError(res, "Email already exists, please login", 400);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        let newUserOrCompany;
        if (type === "user") {
            newUserOrCompany = await user_model_1.User.create({
                email,
                password: hashedPassword,
                name,
            });
        }
        else if (type === "company") {
            newUserOrCompany = await emp_model_1.Company.create({
                email,
                password: hashedPassword,
                name,
            });
        }
        if (newUserOrCompany) {
            return handleSuccess(res, "Registration successful");
        }
        else {
            return handleError(res, "Failed to register user or company", 500);
        }
    }
    catch (error) {
        console.error(error);
        return handleError(res, "Internal Server Error", 500);
    }
}
async function Login(req, res) {
    try {
        const { email, password, type } = req.body;
        let Collection;
        if (type === "user") {
            Collection = user_model_1.User;
        }
        else if (type === "company") {
            Collection = emp_model_1.Company;
        }
        else {
            return handleError(res, "Invalid user type specified", 400);
        }
        if (!email || !password) {
            return handleError(res, "All fields are required", 400);
        }
        const isExistingUser = await Collection.findOne({ email });
        if (!isExistingUser) {
            return handleError(res, "Email is invalid", 400);
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, isExistingUser.password);
        if (!isPasswordValid) {
            return handleError(res, "Password is invalid", 400);
        }
        const token = jsonwebtoken_1.default.sign({ userId: isExistingUser._id, type }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        req.session.visited = true;
        req.sessionStore.get(req.sessionID, (err) => {
            if (err) {
                return res.send("Failed to get session data");
            }
        });
        req.session.userData = {
            user: { type, name: isExistingUser?.name, email: isExistingUser?.email },
            id: isExistingUser?._id,
        };
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
            sameSite: "strict",
        });
        return handleSuccess(res, "Login successful");
    }
    catch (error) {
        console.error(error);
        return handleError(res, "Internal Server Error", 500);
    }
}
