import Role from "./models/Role";
import { adminPermissions, userPermissions } from "../config/permissions";

// Seeds the roles table
const seed = async () => {
  try {
    const matchAdminRole = await Role.findOne({ name: "admin" });
    const matchStaffRole = await Role.findOne({ name: "staff" });
    const matchUserRole = await Role.findOne({ name: "user" });
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
        permissions: [...adminPermissions, ...userPermissions],
      });
      Promise.all([
        userRole.save(),
        staffRole.save(),
        adminRole.save(),
      ]).finally(() => {
        console.log("Role seeding completed!!!");
        return;
      });
    } else {
      console.log("Data already seeded!!!");
      return;
    }
  } catch (error) {
    console.log(`Seed failed:${error}`);
    return;
  }
};

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
    process.exitCode = 0;
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

export default runSeed;
