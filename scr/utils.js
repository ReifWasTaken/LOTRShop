import multer from "multer";
import { connect } from "mongoose";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export async function connectMongo() {
  try {
    await connect(
      
      "mongodb+srv://gregodelgado182:3ue44LfjRTorjQuQ@lotrshop.xmat6zi.mongodb.net/LOTRShop"
      );
  console.log("conected to mongo");
  }
  catch(e){
    console.log(e);
    throw "Can not conect to DB";
  }
} 

export const uploader = multer({ storage });


import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);