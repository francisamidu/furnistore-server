//Required libraries
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const path = require("path");

//Middlewares
import authenticate from "./api/v1/middlewares/authenticate";
import graphql from "./api/v1/middlewares/graphql";
import use from "./api/v1/middlewares/use";
import errorHandler from "./api/v1/middlewares/errorHandler";

//Routes
import auth from "./api/v1/routes/auth";
// import api from "./api/v1/routes/api";

//Port config
const PORT = process.env.PORT || 5000;

//Env config
require("dotenv").config();

//Init server app
const app = express();

//cors middleware config
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
  })
);

//JSON,Form parsing and public path middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API routes
app.use("/auth", auth);
// app.use("/api", [authenticate, api]);
app.use("/graphql", [authenticate, use(graphql)]);

app.use(errorHandler);

connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server app runnning on port: %d`, PORT)
    );
  })
  .catch((error: Error) =>
    console.log(`Failed to establish a database connection: ${error.message}`)
  );
