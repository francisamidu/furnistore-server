import { Role, User } from "./models";
import { hashValue } from "../helpers";

// Creates a test and admin account for testing purposes
const seed = async () => {
  try {
    const roles = await Role.find({});
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
        password: await hashValue("(Testaccount1)"),
      });
      await newUser.save();
      console.log(`---USER---`);
      console.log(`Seeded test user with id #${newUser._id}`);
      console.log(`---USER---`);
    } else {
      console.log("User account already exists");
    }
    if (!isAdminAccountAlreadyCreated) {
      const newUser = new User({
        username: "admin",
        email: "admin@test.com",
        password: await hashValue("(Adminaccount1)"),
        roles,
      });
      await newUser.save();
      console.log(`---ADMIN---`);
      console.log(`Seeded admin user with id #${newUser._id}`);
      console.log(`---ADMIN---`);
    } else {
      console.log("User account already exists");
    }
  } catch (error) {
    console.log(`Seed failed:${error}`);
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

export default runSeed;
