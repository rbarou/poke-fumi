import { Invitation } from './model'
import InvitationRepository from './invitationRepository'
import jwt = require('jsonwebtoken');

const db: InvitationRepository = new InvitationRepository();


const addInvitation = (sender: number, match: number) => {
    db.createInvitation(sender, match);
    return db.getAllInvitations()
 }
   

const listInvitations = () => {
    return db.getAllInvitations()
}

export {listInvitations, addInvitation}
