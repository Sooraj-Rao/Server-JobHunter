"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.router = void 0;
const express_1 = require("express");
const auth_handler_1 = require("../../handlers/auth/auth.handler");
exports.router = (0, express_1.Router)();
exports.AuthRouter = exports.router;
exports.router.post("/register", auth_handler_1.Register);
exports.router.post("/login", auth_handler_1.Login);
