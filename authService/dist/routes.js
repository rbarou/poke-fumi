"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path = require('path');
const dotenv = require('dotenv').config();
const userServiceURL = 'http://localhost:5000';
const jwt_secret = process.env.JWT_SECRET;
const register = (app) => {
    app.get('/', (_, res) => { res.status(200).json("Hello from auth service !"); });
    app.post('/auth/player/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const connectRequest = path.join(userServiceURL, 'user/connect');
        const user_request = yield (0, cross_fetch_1.default)(connectRequest, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req.body)
        });
        let user_result = yield user_request.json();
        if (user_result) {
            const accessToken = jsonwebtoken_1.default.sign({ name: user_result.name, role: 'player' }, jwt_secret);
            res.status(200).json(accessToken);
        }
        else {
            res.status(400).json("Username or password incorrect");
        }
    }));
};
exports.register = register;
//# sourceMappingURL=routes.js.map