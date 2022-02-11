"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.login = exports.addUser = exports.findByName = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const dbUsers = new userRepository_1.default();
const findByName = (name) => {
    return dbUsers.getUserByName(name);
};
exports.findByName = findByName;
const addUser = (name, password) => {
    dbUsers.createUser(name, password);
    return dbUsers.getAllUsers();
};
exports.addUser = addUser;
const login = (name, password) => {
    return dbUsers.login(name, password);
};
exports.login = login;
const listUsers = () => {
    return dbUsers.getAllUsers();
};
exports.listUsers = listUsers;
//# sourceMappingURL=userController.js.map