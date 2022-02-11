"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const UserController = __importStar(require("./userController"));
const register = (app) => {
    let connectedUsers = [];
    app.get('/', (_, res) => res.send('Hello world from player service'));
    app.put('/user/register', (req, res) => {
        const newUser = req.body;
        const userName = UserController.findByName(newUser.name);
        if (userName) {
            res.status(400).json("This username is already taken");
        }
        else {
            res.status(200).json(UserController.addUser(newUser.name, newUser.password));
        }
    });
    app.get('/user/login', (req, res) => {
        const { name, password } = req.body;
        const user = UserController.login(name, password);
        if (user) {
            connectedUsers.push(user.name);
            res.status(200).json(connectedUsers);
        }
        else {
            res.status(400).send("Invalid username or password, please try again...");
        }
    });
    app.get('/user', (_, res) => {
        res.status(200).json(UserController.listUsers());
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map