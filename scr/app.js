import path from "path";
import express from "express"
import session from "express-session";
import handlebars from "express-handlebars";
import { connectMongo } from "./utils/mongo.js";
import { __dirname,  } from "./utils/dirname.js";
import { connectSocket } from "./utils/socket.js";
import { cartsRouter } from "./routes/carts.router.js";
import { homesRouter } from "./routes/homes.router.js";
import { adminCheck } from "./middleware/userAuntentification.js"
import { productsRouter }  from "./routes/products.router.js"
import { realTimeProductsRouter } from "./routes/realTimeProducts.router.js"

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(session({secret: 'secreto', resave: true, saveUninitialized: true}))

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use("/api/products",adminCheck, productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/", homesRouter)

const httpServer = app.listen(port, () => {
  console.log(`app listening from http://localhost:${port}/`)
});

connectMongo();

connectSocket(httpServer);

app.get("/session", (req, res)=>{
  if(req.session.cont){
    req.session.cont++
    res.send("visita n°: " +req.session.cont)
  }else{
    req.session.cont = 1
    res.send("visita n°:" +1)
  }
})

app.get("/login", (req, res)=>{

  const {username, password} = req.query;

  if(username !== "admin" || password !== "admin"){
    return res.send("Login Failed")
  }

  req.session.user = username
  req.session.admin = true;
  res.send ("Login success")
})

app.get("/logout", (req,res)=>{
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

app.get("*", (req, res)=>{

    res.status(404).json({
      status: "error",
      msg: "route does not exist",
      data: {},
    });
})