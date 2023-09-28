import nodemailer from "nodemailer";
import {__dirname}  from "./dirname.js";
import { configDotenv } from "dotenv";
configDotenv();

const transport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    } 
});

export default transport;