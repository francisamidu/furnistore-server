const { connect } = require("mongoose");

//Database connection
connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
})
  .then(async (res) => {
    try {
      await res.connections[0].dropDatabase();
      console.log("Deleted database successfully");
      process.exit();
    } catch (error) {
      console.log(`Process failed: ${error}`);
      process.exit();
    }
  })
  .catch((error) => console.log(error));
