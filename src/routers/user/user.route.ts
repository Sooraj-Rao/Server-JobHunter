import { Router } from "express";
import { AuthorizeRequest } from "../../middleware/Authorize";
import UpdateUser from "../../handlers/user/user-info.handler";

const router = Router();

router.post("/updateinfo", AuthorizeRequest, UpdateUser);

export { router as UserRouter };
