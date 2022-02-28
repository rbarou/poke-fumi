"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.removeUser = void 0;
const adminRepository_1 = __importDefault(require("./adminRepository"));
const db = new adminRepository_1.default();
const removeUser = (id) => {
    return db.removeUser(id);
};
exports.removeUser = removeUser;
const updateUser = (id, name, password) => {
    return db.updateUser(id, name, password);
};
exports.updateUser = updateUser;
//# sourceMappingURL=adminController.js.map