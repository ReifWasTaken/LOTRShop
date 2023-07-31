import express  from "express";
import passport from "passport";
export const sessionsRouter = express.Router();

sessionsRouter.get("/github", passport.authenticate("github", { scope: ["eser: email"]}));

sessionsRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/users/login"}), (req, res)=>{
    req.session.user = req.user;
    res.redirect("/api/products")
})

sessionsRouter.get("/show", (req, res)=> {
    return res.send(JSON.stringify(req.session))
})