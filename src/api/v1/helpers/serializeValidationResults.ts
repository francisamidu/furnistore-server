import { ValidationError } from "express-validator";

const serializeValidationResult = (validationError: ValidationError) => {
  const { msg, param, value } = validationError;
  if (value === "" && param === "email") {
    return {
      message: "Email is required",
      success: false,
    };
  } else if (msg === "Invalid value" && param === "email") {
    return {
      message: "Please provide a valid email",
      success: false,
    };
  }

  if (value === "" && param === "fullName") {
    return {
      message: "Full name is required",
      success: false,
    };
  } else if (msg === "Invalid value" && param === "fullName") {
    return {
      message: "Please provide a valid full name",
      success: false,
    };
  }

  if (value === "" && param === "page") {
    return {
      message: "Page is required",
      success: false,
    };
  } else if (msg === "Invalid value" && param === "page") {
    return {
      message: "Please provide a valid page",
      success: false,
    };
  }
  if (value === "" && param === "password") {
    return {
      message: "Password is required",
      success: false,
    };
  } else if (msg === "Invalid value" && param === "password") {
    return {
      message: "Please provide a valid Password",
      success: false,
    };
  }

  if (value === "" && param === "username") {
    return {
      message: "Username is required",
      success: false,
    };
  } else if (msg === "Invalid value" && param === "username") {
    return {
      message: "Please provide a valid username",
    };
  }
  return validationError;
};
export default serializeValidationResult;
