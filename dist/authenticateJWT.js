"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.send("no access");
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
exports.checkJWT = checkJWT;
//# sourceMappingURL=authenticateJWT.js.map