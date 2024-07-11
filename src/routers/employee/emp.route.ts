import { Router } from "express";
import { AuthorizeRequest } from "../../middleware/Authorize";
import updateEmp from "../../handlers/employee/emp-info.handler";
import {
  CreateJob,
  deleteJob,
  getAllApplications,
  getPostedJobs,
  updateApplicationStatus,
  updateJob,
} from "../../handlers/employee/job.handler";

const router = Router();

router.post("/create", AuthorizeRequest, CreateJob);
router.put("/update/:id", AuthorizeRequest, updateJob);
router.delete("/delete/:id", AuthorizeRequest, deleteJob);
router.put("/updateinfo", AuthorizeRequest, updateEmp);
router.post("/posted", AuthorizeRequest, getPostedJobs);
router.post("/applications/status/:id", AuthorizeRequest, updateApplicationStatus);
router.post("/applications", AuthorizeRequest, getAllApplications);

export { router as EmpRouter };
