//Required libraries
import express, { json, static as expressStatic, urlencoded } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { join } from "path";
import session from "express-session";
import seedRoles from "./api/v1/db/seed-roles";
import seedUsers from "./api/v1/db/seed-users";

//Middlewares
import { authenticate, graphql, errorHandler, use } from "./api/v1/middlewares";

//Routes
import { auth, api } from "./api/v1/routes";

//Port config
const PORT = process.env.PORT || 5000;

//Env config
require("dotenv").config();

//Init server app
const app = express();

//cors middleware config
app.use(cors());

//Session
const sess = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET || "thisissonotrecommended",
  cookie: { secure: false, maxAge: 60000 },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

//JSON,cookie,Form parsing and public path middlewares

app.use("/public", expressStatic(join(__dirname, "..", "public")));
app.use(json());
app.use(urlencoded({ extended: false }));

//API routes
app.use("/auth", auth);
app.use("/api", [api]);
app.use("/graphql", [use(graphql)]);

app.use(errorHandler);

connect(`mongodb://localhost:27017/${process.env.DB_NAME || "furnistore"}`)
  .then(async () => {
    app.listen(PORT);
    seedRoles().then(async () => await seedUsers());
    console.log("Server app runnning on port: %d", PORT);
  })
  .catch((error: Error) =>
    console.log(`Failed to establish a database connection: ${error.message}`)
  );
