import path from "path";
import express from "express"
import passport from "passport";
import { Command } from "commander";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import { connectMongo } from "./utils/mongo.js";
import { __dirname,  } from "./utils/dirname.js";
import { connectSocket } from "./utils/socket.js";
import { usersRouter } from "./routes/users.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { homesRouter } from "./routes/homes.router.js";
import { iniPassport } from "./config/passport.config.js";
import { sessionsRouter } from "./routes/session.router.js";
import { profileRouter } from "./routes/profiles.routher.js";
import { productsRouter }  from "./routes/products.router.js";
import { validUser } from "./middleware/userAuntentification.js";
import { realTimeProductsRouter } from "./routes/realTimeProducts.router.js";

/* const program = new Command();

program
  .option("-d", "Debug variables", false)
  .option("-p <port>", "Server Port", 8080)
  .option("--mode <mode>", "Working mode", "production")
  .requiredOption(
    "-u <user>",
    "app been used by user",
    "User not declared"
  )
  .option("-l, --letters [letters...]", "specify letters");

  program.parse();

console.log("option", program.opts());
console.log("valor de mode: ", program.opts().mode);
console.log("datos no reconocibles: ", program.args) */

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