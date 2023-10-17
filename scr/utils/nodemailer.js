import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    } 
});

export default transport;