import express from "express";
import {
  createOrganization,
  getOrganizations,
} from "../controllers/organizationController";

const router = express.Router();

router.get("/:adminCognitoId", getOrganizations);
router.post("/", createOrganization);
router.put("/:adminCognitoId", (req, res) => {});

export default router;
