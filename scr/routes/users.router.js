import express from "express";
import  { UserModel }  from "../DAO/models/users.model.js";
const usersRouter = express.Router();


usersRouter.get("/login", (req, res)=>{
  return res.render("login",{})
 })


usersRouter.post("/login", async(req, res)=>{
  try{
  const {email, password, firstName, lastName, role} = req.body;
  
  const userFound = await UserModel.findOne({email: email})

  if(!email || !password){
    return res.status(400 ).render("error", {err: "invalid email or password"})
  }

  if(userFound && userFound.password == password){

    req.session.email = email;
    req.session.firstName = firstName;
    req.session.lastName = lastName;
    req.session.role = role;

    return res.redirect("/api/products")
    }else{
    return res.status(401).render("error", {err: "invalid email or password"})

    }

}
catch(err){
  return res.status(400).json({
    status: "error",
    msg: "user do not exist",
    data: err
    })
}
})

usersRouter.get("/logout", (req,res)=>{
  console.log(req.session.user, req.session.admin)
  req.session.destroy((err)=> {
    if(err){
      return res.json({
        status: "LogOut ERROR", 
        body: err
      })
    }
    res.send("Logout OK")
  })
  console.log(req?.session?.user, req?.session?.admin)
})

usersRouter.get("/register", (req, res)=>{
  return res.render("register",{})
 })


usersRouter.post("/register", async(req,res)=> {
  try{
      const {email, password, firstName, lastName, role} = req.body;

      if(!email || !password || !firstName || !lastName){
        return res.status(400 ).render("error", {err: "invalid data"})
      }
     await UserModel.create({email, password, firstName, lastName, role})

     req.session.email = email;
     req.session.firstName = firstName;
     req.session.lastName = lastName;
     req.session.role = role;

     return res.redirect("/profile")
  }
  catch(err){
    console.log(err)
      return res.status(401).render("error", {err: "Error creating the account"}) 
  }
})

/* usersRouter.get("/session", async (req, res)=>{
    try{
        const conta = req.session.cont;
        console.log(conta)
        const sessionExist = await userService.getSession(conta);

        return res.status(201).json({
            status: "success",
            msg: "session info:",
            data: sessionExist,
          });
    }
    catch(err){
        return res.status(400).json({
        status: "error",
        msg: "session do not exist",
        data: err
        })
    }
  }) 
  
  
  
usersRouter.get("/show-session", async(req, res)=>{
  
    try{
        const data = req.session
        const sessionData = await userService.showSession(data)
        
        return res.status(201).json({
            status: "success",
            msg: "user info:",
            data: sessionData,
          });
      }
      catch(err){
          return res.status(400).json({
          status: "error",
          msg: "session do not exist",
          data: err
          })
      }
  })
  
  
 */

export { usersRouter };