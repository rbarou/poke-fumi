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
const InvitationController = __importStar(require("./invitationController"));
const MatchController = __importStar(require("./matchController"));
require("dotenv").config();
const register = (app) => {
    let connectedUsers = [];
    const checkLogin = (req, res, next) => {
        const user = req.headers["authorization"];
        if (!connectedUsers.includes(user)) {
            return res.send("Need authentificaiton.");
        }
        else {
            next();
        }
    };
    app.get('/', (_, res) => res.send('Hello World!'));
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
    app.post('/user/login', (req, res) => {
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
    app.get('/user', checkLogin, (_, res) => {
        res.status(200).json(UserController.listUsers());
    });
    // Match
    app.put('/match/add', (req, res) => {
        const newMatch = req.body;
        res.status(200).json(MatchController.addMatch(newMatch.name, newMatch.user1.user_id, newMatch.user2.user_id));
    });
    app.get('/matches', (req, res) => {
        res.status(200).json(MatchController.listMatches());
    });
    //Invitation HTTP Request
    app.get('/invitation', (req, res) => {
        res.status(200).json(InvitationController.listInvitations());
    });
    app.put('/invitation/add', (req, res) => {
        const newInvitation = req.body;
        res.status(200).json(InvitationController.addInvitation(newInvitation.sender.user_id, newInvitation.match.match_id));
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map