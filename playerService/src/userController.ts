import UserRepository from './userRepository';

const dbUsers: UserRepository = new UserRepository();

const findByName = (name : string) => {
    return dbUsers.getUserByName(name);
}

const addUser = (name : string, password: string) => {
    dbUsers.createUser(name,password);
    return dbUsers.getAllUsers();
}

const login = (name : string, password : string) => {
    return dbUsers.login(name,password);
}

const listUsers = () => {
    return dbUsers.getAllUsers();
}

export {findByName, addUser, login, listUsers};