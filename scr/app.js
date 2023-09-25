import path from "path";
import express from "express"
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./config/config.js";
import handlebars from "express-handlebars";
import { connectMongo } from "./utils/mongo.js";
import { __dirname,  } from "./utils/dirname.js";
import { connectSocket } from "./utils/socket.js";
import { mailRouter } from "./routes/mail.router.js";
import { usersRouter } from "./routes/users.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { homesRouter } from "./routes/homes.router.js";
import { iniPassport } from "./config/passport.config.js";
import { sessionsRouter } from "./routes/session.router.js";
import { profileRouter } from "./routes/profiles.routher.js";
import { productsRouter }  from "./routes/products.router.js";
import { realTimeProductsRouter } from "./routes/realTimeProducts.router.js";

console.log(config);

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(session({
  store: MongoStore.create({mongoUrl: "mongodb+srv://gregodelgado182:3ue44LfjRTorjQuQ@lotrshop.xmat6zi.mongodb.net/ecommerce?retryWrites=true&w=majority", ttl: 14400}),
  secret: "secreto",
  resave: true,
  saveUninitialized: true}))

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/users", usersRouter)
app.use("/profile", profileRouter)
app.use("/api/session", sessionsRouter)
app.use("/", homesRouter)
app.use("/mail", mailRouter)

const httpServer = app.listen(port, () => {
  console.log(`app listening from http://localhost:${port}/users/login`)
});

connectMongo();

connectSocket(httpServer);


app.get("*", (req, res)=>{

    res.status(404).json({
      status: "error",
      msg: "route does not exist",
      data: {},
    });
})