import AdminRepository from "./adminRepository";

const db: AdminRepository = new AdminRepository();

const removeUser = (id: string) => {
    return db.removeUser(id);
}

const updateUser = (id : string, name : string, password : string) => {
    return db.updateUser(id,name,password);
}

export{removeUser, updateUser};