import express, { Request, Response } from "express";
import { Connect } from "./src/utils/Db/Connect";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./src/routers/auth/auth.route";
import { UserRouter } from "./src/routers/user/user.route";
import { EmpRouter } from "./src/routers/employee/emp.route";
import session from "express-session";
import memorystore from "memorystore";
import cors from "cors";
import { UniRouter } from "./src/routers/uni-route/uni.route";
const MemoryStore = memorystore(session);

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
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
    saveUninitialized: false,
    secret: "6687ab555c60ca95d2b3492c",
  })
);

Connect();

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/emp", EmpRouter);
app.use("/api/", UniRouter);

app.all("/*", (req, res) => {
  res
    .status(404)
    .send("<h1>404 Not Found</h1><h2>You requested a wrong URL</h2>");
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
