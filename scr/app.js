import path from "path";
import express from "express"
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import { connectMongo } from "./utils/mongo.js";
import { __dirname,  } from "./utils/dirname.js";
import { connectSocket } from "./utils/socket.js";
import { usersRouter } from "./routes/users.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { homesRouter } from "./routes/homes.router.js";
import { profileRouter } from "./routes/profiles.routher.js";
import { productsRouter }  from "./routes/products.router.js";
import { validUser } from "./middleware/userAuntentification.js";
import { realTimeProductsRouter } from "./routes/realTimeProducts.router.js";

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

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use("/api/products",validUser , productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/users", usersRouter)
app.use("/profile", profileRouter)
app.use("/", homesRouter)

const httpServer = app.listen(port, () => {
  console.log(`app listening from http://localhost:${port}/`)
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