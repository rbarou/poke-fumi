"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.login = exports.removeUser = exports.addUser = exports.getUserById = exports.getUserByName = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const dbUsers = new userRepository_1.default();
const getUserByName = (name) => {
    return dbUsers.getUserByName(name);
};
exports.getUserByName = getUserByName;
const getUserById = (id) => {
    return dbUsers.getUserById(id);
};
exports.getUserById = getUserById;
const addUser = (name, password) => {
    dbUsers.createUser(name, password);
    return dbUsers.getUserByName(name);
};
exports.addUser = addUser;
const removeUser = (id) => {
    dbUsers.removeUser(id);
    return dbUsers.getUserById(id);
};
exports.removeUser = removeUser;
const login = (name, password) => {
    return dbUsers.login(name, password);
};
exports.login = login;
const listUsers = () => {
    return dbUsers.getAllUsers();
};
exports.listUsers = listUsers;
//# sourceMappingURL=userController.js.map