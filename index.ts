import express from "express";
import { Connect } from "./src/utils/Db/Connect";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./src/routers/auth/auth.route";
import { UserRouter } from "./src/routers/user/user.route";
import { EmpRouter } from "./src/routers/employee/emp.route";

const app = express();
app.use(express.json());
app.use(cookieParser());

Connect();

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/emp", EmpRouter);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
