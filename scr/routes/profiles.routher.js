import express  from "express";
import  { UserModel }  from "../DAO/models/users.model.js";
import { validUser } from "../middleware/userAuntentification.js";
const profileRouter = express.Router()

profileRouter.get("/", validUser, async(req,res)=> {
try{

    const profileFound = req.session.user;

    const userFound = await UserModel.findOne({email: profileFound.email})

    return res.status(200).render("profile", userFound)
}
catch(err){
    return res.status(401).render("error", {err: "User do not exist"})
}
})



export { profileRouter }