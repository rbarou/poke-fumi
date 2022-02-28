"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require('dotenv').config();
const authenticateJWT = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send("Acces Denied!");
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token...');
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map