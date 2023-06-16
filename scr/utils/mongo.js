import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      
      "mongodb+srv://gregodelgado182:3ue44LfjRTorjQuQ@lotrshop.xmat6zi.mongodb.net/ecommerce?retryWrites=true&w=majority"
      );
      console.log("conected to mongo");
    }
    catch(e){
      console.log(e);
      throw "Can not conect to DB";
    }
  } 