import express from "express";
import { Logout, getUserDetails } from "../../handlers/uni/uni.handler";
import { AuthorizeRequest } from "../../middleware/Authorize";

const router = express.Router();

router.get('/profile',AuthorizeRequest,getUserDetails);
router.get('/logout',Logout);

export { router as UniRouter };
