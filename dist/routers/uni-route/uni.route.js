"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniRouter = void 0;
const express_1 = __importDefault(require("express"));
const uni_handler_1 = require("../../handlers/uni/uni.handler");
const Authorize_1 = require("../../middleware/Authorize");
const router = express_1.default.Router();
exports.UniRouter = router;
router.post('/profile', Authorize_1.AuthorizeRequest, uni_handler_1.getUserDetails);
router.post('/logout', uni_handler_1.Logout);
