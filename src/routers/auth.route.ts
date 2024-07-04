import { Router } from "express";
import { getUser } from "../handlers/auth.handler";

export const router = Router();

router.post("/auth/login", getUser);
