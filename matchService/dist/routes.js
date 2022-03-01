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
const MatchController = __importStar(require("./matchController"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const path = require('path');
const userServiceURL = 'http://localhost:5000';
const register = (app) => {
    app.get('/', (_, res) => res.send('Hello world from match service'));
    app.get('/match/getAllMatchs', (req, res) => {
        res.status(200).json(MatchController.listMatchs());
    });
    app.get('/match/getMatch', (req, res) => {
        const match_id = +req.body.match_id;
        if (match_id) {
            res.status(200).json(MatchController.getMatchDetails(match_id));
        }
        else {
            res.status(400).json("Please specify a match id");
        }
    });
    app.put('/match/invite', (req, response) => __awaiter(void 0, void 0, void 0, function* () {
        const userRequest = 'http://localhost:5000/user/getUserById?id=1';
        const user1_id = +req.body.host;
        const user2_id = +req.body.guest;
        (0, cross_fetch_1.default)(userRequest)
            .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json;
        })
            .then(user => {
            if (user) {
                response.json(MatchController.createMatch(user1_id, user2_id));
            }
            else {
                response.status(400).json("Guest doesn't exist");
            }
        });
    }));
    app.get('/match/getInvites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userID = +req.body.userID;
        res.status(200).json(MatchController.seeInvitations(userID));
    }));
    app.put('/match/accept', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const guestID = +req.body.guestID;
        const matchID = +req.body.matchID;
        const hostID = +req.body.hostID;
        if (matchID && hostID) {
            res.status(200).json(MatchController.acceptInvitation(guestID, hostID, matchID));
        }
        else {
            res.status(400).json("Please specify a match ID and an inviter ID");
        }
    }));
    app.post('/match/deck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userID = +req.headers.userID;
        const matchID = +req.body.matchID;
        if (matchID) {
            res.status(200).json(MatchController.createDeck(userID, matchID));
        }
        else {
            res.status(400).json("Please specify a match ID");
        }
    }));
    app.post('/match/deck/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userID = +req.headers.userID;
        const matchID = +req.body.matchID;
        const pokemonID = +req.body.pokemonID;
        if (matchID && pokemonID) {
            res.status(200).json(MatchController.addPokemonToDeck(userID, matchID, pokemonID));
        }
        else {
            res.status(400).json("Please specify a match ID and a pokemon ID");
        }
    }));
    //app.put('/match/deck/')
};
exports.register = register;
//# sourceMappingURL=routes.js.map