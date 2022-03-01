import sendGridMail from "@sendgrid/mail";
import GenerateEmail from "./GenerateEmail";
const { getPasswordOTPEmail, getVerificationEmail, getConfirmationEmail } =
  GenerateEmail;

require("dotenv").config();

const apiKey: any = process.env.SENDGRID_API_KEY;
sendGridMail.setApiKey(apiKey);

class Email {
  static async sendEmailVerification(
    username: string,
    email: string,
    otp: string
  ) {
    const response = await sendGridMail.send({
      from: "noreply@furnistore.herokuapp.com",
      to: email,
      subject: "Email Verification",
      text: getVerificationEmail(username, otp),
      html: getVerificationEmail(username, otp),
    });
    console.log(response);
  }
  static async sendPasswordResetOTP(
    username: string,
    email: string,
    otp: string
  ) {
    const response = await sendGridMail.send({
      from: "noreply@furnistore.herokuapp.com",
      to: email,
      subject: "Password Reset",
      text: getPasswordOTPEmail(username, otp),
      html: getPasswordOTPEmail(username, otp),
    });
    console.log(response);
  }
  static async sendEmailConfirmation(email: string) {
    const response = await sendGridMail.send({
      from: "noreply@furnistore.herokuapp.com",
      to: email,
      subject: "Email Verification",
      text: getConfirmationEmail(),
      html: getConfirmationEmail(),
    });
    console.log(response);
  }
}

export default Email;
