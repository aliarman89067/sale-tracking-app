import express from "express";
import {
  createOrganization,
  getOrganizations,
  getOrganizationName,
} from "../controllers/organizationController";

const router = express.Router();

router.get("/:adminCognitoId", getOrganizations);
router.get("/:organizationId/:adminCognitoId", getOrganizationName);
router.post("/", createOrganization);
router.put("/:adminCognitoId", (req, res) => {});

export default router;
