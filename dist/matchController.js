"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMatch = exports.listMatches = void 0;
const matchRepository_1 = __importDefault(require("./matchRepository"));
const dbMatches = new matchRepository_1.default();
const listMatches = () => {
    return dbMatches.getAllMatches();
};
exports.listMatches = listMatches;
const addMatch = (name, user1, user2) => {
    dbMatches.createMatch(name, user1, user2);
    return dbMatches.getAllMatches();
};
exports.addMatch = addMatch;
//# sourceMappingURL=matchController.js.map