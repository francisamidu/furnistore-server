import Role from "./models/Role";
import { connect, disconnect } from "mongoose";

// Seeds the roles table
const seed = async () => {
  try {
    const matchUserRole = await Role.findOne({ name: "user" });
    const matchStaffRole = await Role.findOne({ name: "staff" });
    const matchAdminRole = await Role.findOne({ name: "admin" });
    if (!matchUserRole && !matchStaffRole && !matchAdminRole) {
      const userRole = new Role({
        name: "user",
        code: 1,
      });
      const staffRole = new Role({
        name: "staff",
        code: 2,
      });
      const adminRole = new Role({
        name: "admin",
        code: 3,
      });
      Promise.all([
        userRole.save(),
        staffRole.save(),
        adminRole.save(),
      ]).finally(() => {
        console.log("Role seeding completed!!!");
        disconnect();
      });
    } else {
      console.log("Data already seeded!!!");
      disconnect();
    }
  } catch (error) {
    console.log(`Seed failed:${error}`);
    disconnect();
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
