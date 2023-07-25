import express from "express";
import passport from "passport";
const usersRouter = express.Router();


usersRouter.get("/login", (req, res)=>{
  return res.render("login",{})
 })

 
 usersRouter.post("/login",passport.authenticate('login', { failureRedirect: '/users/faillogin' }), async(req, res)=>{
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
           

     req.session.user = {  

      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role

    }      
    return res.redirect("/api/products")
      
    }
  )
  
  usersRouter.get('/faillogin', async (req, res) => {
    return res.json({ error: 'fail to login' });
  });

usersRouter.get("/logout", (req,res)=>{
  req.session.destroy((err)=> {
    if(err){
      return res.json({
        status: "LogOut ERROR", 
        body: err
      })
    }
    res.send("Logout OK")
  })
})

usersRouter.get("/register", (req, res)=>{
  return res.render("register",{})
 })


usersRouter.post("/register", passport.authenticate('register', { failureRedirect: '/users/failregister' }), async(req,res)=> {
  try{
    if (!req.user) {
      return res.json({ error: 'something went wrong' });
    }

      req.session.user = {
        
        _id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role

      }

     return res.redirect("/profile")
  }
  catch(err){
    console.log(err)
      return res.status(401).render("error", {err: "Error creating the account"}) 
  }
})

usersRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'fail to register' });
});



export { usersRouter };