import UserRepository from './userRepository';

const dbUsers: UserRepository = new UserRepository();

const getUserByName = (name : string) => {
    return dbUsers.getUserByName(name);
}

const getUserById = (id : string) => {
    return dbUsers.getUserById(id);
}

const addUser = (name : string, password: string) => {
    dbUsers.createUser(name,password);
    return dbUsers.getUserByName(name);
}

const removeUser = (id: string) => {
    dbUsers.removeUser(id);
    return dbUsers.getUserById(id);
}

const login = (name : string, password : string) => {
    return dbUsers.login(name,password);
}

const listUsers = () => {
    return dbUsers.getAllUsers();
}

export {getUserByName, getUserById, addUser, removeUser, login, listUsers};