import { Router } from "express";
import { AuthorizeRequest } from "../../middleware/Authorize";
import updateEmp from "../../handlers/employee/emp-info.handler";
import {
  CreateJob,
  deleteJob,
  updateJob,
} from "../../handlers/employee/job.handler";

const router = Router();

router.post("/create", AuthorizeRequest, CreateJob);
router.put("/update/:id", AuthorizeRequest, updateJob);
router.delete("/delete/:id", AuthorizeRequest, deleteJob);
router.post("/updateinfo", AuthorizeRequest, updateEmp);

export { router as EmpRouter };
