//Required libraries
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const path = require("path");

//Middlewares
const authenticate = require("./middlewares/authenticate");
const graphql = require("./middlewares/graphql");

//Routes
const auth = require("./routes/auth/index");
const api = require("./routes/api/index");

const PORT = process.env.PORT || 5000;

//Env configuration
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
