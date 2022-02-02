import { User } from './model'
import UserRepository from './userRepository'
import jwt = require('jsonwebtoken');

const dbUsers: UserRepository = new UserRepository();

const listUsers = () => {
   return dbUsers.getAllUsers()
}
  
const addUser = (name: string, password: string) => {
   dbUsers.createUser(name,password);
   return dbUsers.getAllUsers()
}

const login = (name: string, password: string) => {
   return dbUsers.login(name,password);
}
  
const findByName = (name: string) => {
   return dbUsers.getUserByName(name);
}

export { listUsers, addUser, login, findByName }
