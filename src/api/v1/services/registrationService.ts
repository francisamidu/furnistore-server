import { Request, Response } from "express";
import { validationResult } from "express-validator";

//Database models
import { OTP, Role, User } from "../db/models";

//Auth Utilities
import { generateOTP, hashValue, serializeValidationResults } from "../helpers";

//New user account registration
const registrationService = async (req: Request, res: Response) => {
  const { email, password, page } = req.body;

  //Validate credentials and send back response message
  //Check for empty credentials and send back response message
  const validationResults = validationResult(req).formatWith(
    serializeValidationResults
  );
  const results = validationResults.array();
  if (results.length) {
    return res.status(406).json(results);
  }

  //Query the database for user and send back response message
  const user = await User.findOne({ email });

  //Find all users and check if there's already an admin
  const adminUser = await User.findOne({}).$where((res: any) =>
    res.roles.some((role: any) => role.name === "admin")
  );

  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }

  //has user password
  const hashedPassword = await hashValue(password);

  //Find the base role
  //Assign user based on page and existing admin
  const role = !adminUser
    ? await Role.findOne({
        name: "admin",
      })
    : page == "dashboard"
    ? await Role.findOne({
        name: "staff",
      })
    : await Role.findOne({
        name: "user",
      });

  if (!role) {
    return res.status(500).json({ message: "Signup failed", success: false });
  }

  //create User and save to the database
  const newUser = new User({
    email,
    password: hashedPassword,
    roles: [role],
  });
  await newUser.save();
  // const verificationToken = new OTP({
  //   token: generateOTP(),
  // });
  // await verificationToken.save();

  return res.status(201).json({
    success: true,
    user: {
      email: newUser._doc.email,
      createdAt: newUser._doc.created_at,
      roles: [role._doc.code],
    },
  });
};

export default registrationService;
