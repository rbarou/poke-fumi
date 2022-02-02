"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInvitation = exports.listInvitations = void 0;
const invitationRepository_1 = __importDefault(require("./invitationRepository"));
const db = new invitationRepository_1.default();
const addInvitation = (sender, match) => {
    db.createInvitation(sender, match);
    return db.getAllInvitations();
};
exports.addInvitation = addInvitation;
const listInvitations = () => {
    return db.getAllInvitations();
};
exports.listInvitations = listInvitations;
//# sourceMappingURL=invitationController.js.map