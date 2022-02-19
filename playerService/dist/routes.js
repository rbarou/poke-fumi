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
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (_, res) => res.send('Hello world from player service'));
    app.get('/user/getAllUsers', (_, res) => {
        res.status(200).json(UserController.listUsers());
    });
    app.get('/user/getUserByName', (req, res) => {
        const name = req.query.name;
        if (name) {
            res.status(200).json(UserController.getUserByName(name));
        }
        else {
            res.status(400).json("Please specify a username");
        }
    });
    app.get('/user/getUserById', (req, res) => {
        const id = req.query.id;
        if (id) {
            res.status(200).json(UserController.getUserById(id));
        }
        else {
            res.status(400).json("Please specify an id");
        }
    });
    app.post('/user/register', (req, res) => {
        const newUser = req.body;
        const userName = UserController.getUserByName(newUser.name);
        if (userName) {
            res.status(400).json("This username is already taken");
        }
        else {
            res.status(200).json(UserController.addUser(newUser.name, newUser.password));
        }
    });
    app.post('/user/connect', (req, res) => {
        const { name, password } = req.body;
        const user = UserController.login(name, password);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid username or password, please try again...");
        }
    });
    app.delete('/user/remove', (req, res) => {
        const { id } = req.body;
        const user_id = UserController.getUserById(id);
        if (user_id) {
            UserController.removeUser(id);
            res.status(200).json("The user: " + id + " has been removed");
        }
        else {
            res.status(400).send("Please check the user's id");
        }
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map