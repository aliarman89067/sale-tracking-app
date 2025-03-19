"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizationController_1 = require("../controllers/organizationController");
const router = express_1.default.Router();
router.get("/:adminCognitoId", organizationController_1.getOrganizations);
router.post("/", organizationController_1.createOrganization);
router.put("/:adminCognitoId", (req, res) => { });
exports.default = router;
