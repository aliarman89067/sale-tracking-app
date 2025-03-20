import express from "express";
import { createMembers, getMember } from "../controllers/memberController";
import { authMiddleware } from "../middleware.ts/authMiddleware";

const router = express.Router();

router.post("/", createMembers);
router.get("/:memberId", authMiddleware(["admin", "agent"]), getMember);

export default router;
