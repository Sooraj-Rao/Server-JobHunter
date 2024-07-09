import express from "express";
import { getUserDetails } from "../../handlers/uni/uni.handler";
import { AuthorizeRequest } from "../../middleware/Authorize";

const router = express.Router();

router.get('/',AuthorizeRequest,getUserDetails);

export { router as UniRouter };
