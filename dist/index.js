"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const memorystore_1 = __importDefault(require("memorystore"));
const cors_1 = __importDefault(require("cors"));
const Connect_1 = require("./utils/Db/Connect");
const auth_route_1 = require("./routers/auth/auth.route");
const user_route_1 = require("./routers/user/user.route");
const emp_route_1 = require("./routers/employee/emp.route");
const uni_route_1 = require("./routers/uni-route/uni.route");
const MemoryStore = (0, memorystore_1.default)(express_session_1.default);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    },
    store: new MemoryStore({
        checkPeriod: 86400000,
    }),
    resave: false,
    saveUninitialized: true,
    secret: "6687ab555c60ca95d2b3492c",
}));
(0, Connect_1.Connect)();
app.use("/api/auth", auth_route_1.AuthRouter);
app.use("/api/user", user_route_1.UserRouter);
app.use("/api/emp", emp_route_1.EmpRouter);
app.use("/api/", uni_route_1.UniRouter);
app.all("/*", (req, res) => {
    res
        .status(404)
        .send("<h1>404 Not Found</h1><h2>You requested a wrong URL</h2>");
});
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
