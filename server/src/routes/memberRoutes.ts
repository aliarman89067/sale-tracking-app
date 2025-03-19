import express from "express";
import { createMembers } from "../controllers/memberController";

const router = express.Router();

router.post("/", createMembers);

export default router;
