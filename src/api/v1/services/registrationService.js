const { validationResult } = require("express-validator");

//Database models
const VerificationToken = require("../db/models/OTP");
const User = require("../db/models/User");

//Auth Utilities
const generateOTP = require("../helpers/generateOTP");
const hashValue = require("../helpers/hashValue");

//New user account registration
const registrationService = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate credentials and send back response message
    const validationResults = validationResult(req).errors.map((result) => ({
      message: result.msg,
      success: false,
    }));
    if (validationResults.length) {
      return res.status(401).json(validationResults);
    }

    //Query the database for user and send back response message
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    //has user password
    const hashedPassword = await hashValue(password);

    //create User and save to the database
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const verificationToken = new OTP({
      token: generateOTP(),
    });
    await verificationToken.save();

    return res.status(201).json({
      success: true,
      user: {
        email: newUser._doc.email,
        createdAt: newUser._doc.created_at,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Couldnt sign you up", success: false });
  }
};

module.exports = registrationService;
