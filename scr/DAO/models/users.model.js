import { Schema, model } from "mongoose";


const usersSchema = new Schema({

    firstName: {type: String, requiered: true, max: 25},
    lastName: {type: String, requiered: true, max: 25},
    email: {type: String, requiered: true, unique: true, max: 100},
    password: {type: String, requiered: true, max: 20},
    role: {type: String, required: true, default: "user",
    }

});

export const UserModel = model("users", usersSchema)