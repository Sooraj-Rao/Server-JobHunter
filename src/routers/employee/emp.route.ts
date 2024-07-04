import { Router } from "express";
import { AuthorizeRequest } from "../../middleware/Authorize";
import updateEmp from "../../handlers/employee/emp-info.handler";

const router = Router();

router.post("/updateinfo", AuthorizeRequest, updateEmp);

export { router as EmpRouter };
