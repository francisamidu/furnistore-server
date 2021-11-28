//Required libraries
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const path = require("path");

//Middlewares
const authenticate = require("./api/v1/middlewares/authenticate");
const graphql = require("./api/v1/middlewares/graphql");

//Routes
const auth = require("./api/v1/routes/auth");
const api = require("./api/v1/routes/api");

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
app.use("/api", [authenticate, api]);
app.use("/graphql", [authenticate, graphql]);

connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server app runnning on port: %d`, PORT)
    );
  })
  .catch((error) =>
    console.log(`Failed to establish a database connection: ${error}`)
  );
