"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Connect = async () => {
    let DB_URL = process.env.MONGO_URI;
    await mongoose_1.default
        .connect(DB_URL)
        .then(() => console.log("Database Connected"))
        .catch((err) => console.log("Database Connection Failed", err));
};
exports.Connect = Connect;
