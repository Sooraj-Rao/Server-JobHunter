"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const Authorize_1 = require("../../middleware/Authorize");
const user_info_handler_1 = __importDefault(require("../../handlers/user/user-info.handler"));
const router = (0, express_1.Router)();
exports.UserRouter = router;
router.post("/updateinfo", Authorize_1.AuthorizeRequest, user_info_handler_1.default);
