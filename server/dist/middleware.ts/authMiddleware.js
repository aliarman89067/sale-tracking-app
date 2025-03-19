"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (userRoles) => {
    return (req, res, next) => {
        var _a, _b;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Token not found!" });
                return;
            }
            const decoded = jsonwebtoken_1.default.decode(token);
            const userRole = decoded["custom:role"] || "";
            const userId = decoded.sub;
            const hasAccess = userRoles.includes(userRole);
            if (!hasAccess) {
                res.status(403).json({ message: "Access Denied!" });
                return;
            }
            req.user = {
                id: userId,
                role: userRole,
            };
        }
        catch (error) {
            console.log("Failed to fetch token", (_b = error.message) !== null && _b !== void 0 ? _b : error);
            res.status(400).json({ message: "Invalid Token" });
            return;
        }
        next();
    };
};
exports.authMiddleware = authMiddleware;
