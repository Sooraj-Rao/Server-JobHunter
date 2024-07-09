import { Router } from "express";
import { AuthorizeRequest } from "../../middleware/Authorize";
import UpdateUser from "../../handlers/user/user-info.handler";
import { ApplyJob } from "../../handlers/user/apply-job.handler";
import { getAllJobs, getJobById } from "../../handlers/employee/job.handler";

const router = Router();

router.get("/getall",AuthorizeRequest, getAllJobs);
router.post("/updateinfo", AuthorizeRequest, UpdateUser);
router.post("/apply/:jobId", AuthorizeRequest, ApplyJob);
router.get("/getone/:id", getJobById);

export { router as UserRouter };
