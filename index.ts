import express, { Request, Response } from "express";
import { Connect } from "./src/utils/Db/Connect";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./src/routers/auth/auth.route";
import { UserRouter } from "./src/routers/user/user.route";
import { EmpRouter } from "./src/routers/employee/emp.route";
import { REDIRECT_URL } from "./src/data/someData";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Sooraj Rao",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

Connect();

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/emp", EmpRouter);

// app.use("/api/job", EmpRouter);

app.use("/*", (req, res) => {
  res.redirect(REDIRECT_URL);
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
