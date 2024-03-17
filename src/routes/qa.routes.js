import { Router } from "express";
import { verifyToken } from "../helpers/jsonwebtoken.js";
import {
  addQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
} from "../controllers/qa.controllers.js";

const router = Router();

router.post("/question", verifyToken, addQuestion);

router.put("/question/:id", verifyToken, updateQuestion);

router.get("/question", getQuestion);

router.get("/question/all", getAllQuestions);

router.post("/answer", verifyToken);

router.put("/answer/:id", verifyToken);

export default router;
