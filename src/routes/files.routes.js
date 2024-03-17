import { Router } from "express";
import { uploadFile } from "../controllers/files.controllers.js";

const router = Router();

router.post("/files", uploadFile);

export default router;
