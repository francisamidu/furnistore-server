import User from "./models/User";
import mongoose from "mongoose";

// Creates a test and admin account for testing purposes
const seed = async () => {
  try {
    const isTestAccountAlreadyCreated = await User.findOne({
      email: "test@test.com",
    });
    const isAdminAccountAlreadyCreated = await User.findOne({
      username: "admin@test.com",
    });
    if (!isTestAccountAlreadyCreated) {
      const newUser = new User({
        username: "test",
        email: "test@test.com",
        password: "(Testaccount1)",
      });
      await newUser.save();
      console.log(`seeded test user account`);
      mongoose.disconnect();
    } else {
      console.log("User account already exists");
      mongoose.disconnect();
    }

    if (!isAdminAccountAlreadyCreated) {
      const newUser = new User({
        username: "admin",
        email: "admin@test.com",
        password: "(Adminaccount1)",
      });
      await newUser.save();
      console.log(`seeded test user account`);
      mongoose.disconnect();
    } else {
      console.log("User account already exists");
      mongoose.disconnect();
    }
  } catch (error) {
    console.log(`Seed failed:${error}`);
    mongoose.disconnect();
  }
};

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

//Database connection
mongoose
  .connect("mongodb://localhost:27017/furnistore", {
    autoIndex: true,
  })
  .then(() => {
    runSeed();
  })
  .catch((error: any) => console.log(error));
