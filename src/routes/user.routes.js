import { Router } from "express";
import { getUser, signin, signup } from "../controllers/user.controlelrs.js";

const router = Router();

router.post("/user/login", signin);

router.post("/user/register", signup);

router.get("/user", getUser);

export default router;
