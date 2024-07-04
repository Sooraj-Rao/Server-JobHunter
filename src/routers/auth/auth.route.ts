import { Router } from "express";
import { Login, Register } from "../../handlers/auth/auth.handler";

export const router = Router();

router.post("/register", Register);
router.post("/login", Login);

export { router as AuthRouter };
