class GenerateEmail {
  static getVerificationEmail(username: string, otp: string) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Email</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap");
          body {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Inter", Arial, Helvetica, sans-serif;
            min-height: 90vh;
          }
          a {
            color: rgb(0, 153, 255);
            text-decoration: none;
          }
          .email-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: calc(100vw - 850px);
            padding: 2em;
            border: 1px solid #ddd;
            border-radius: 5px;
            color: rgb(49, 47, 47);
          }
          p {
            width: 80%;
            line-height: 1.5;
          }
          .info {
            margin-top: 1em;
            color: #555;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Furnistore</h1>
          <h2>Verify your email address for Furnistore</h2>
          <p>
            Hi ${username}, We're happy you signed up for Furnistore. Your
            verification code is: <strong>${otp}</strong> .
          </p>
          <p>Enter this code in our website to activate your customer account</p>
          <p>
            Click
            <a href="furnistore.herokuapp.com/verify-otp?q=${otp}">here</a> open in
            app.
          </p>
          <span class="info"
            >If you didnt register for an account please ignore this email. This verification link will be valid for 1 hour<</span
          >
          <h4>Thanks! – The Furnistore team</h4>
        </div>
      </body>
    </html>
    `;
  }
  static getPasswordOTPEmail(username: string, otp: string) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap");
          body {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Inter", Arial, Helvetica, sans-serif;
            min-height: 90vh;
          }
          a {
            background-color: #0267aa;
            text-decoration: none;
            padding: 5px 32px;
            height: 32px;
            min-width: 100px;
            max-width: calc(100% - 250px);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            color: #fff;
            text-align: center;
            margin-top: 2em;
            cursor: pointer;
            transition: background-color 3s ease-out;
          }
          a:hover {
            background-color: #0099ff;
          }
          .password-reset {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: calc(100vw - 850px);
            padding: 2em;
            border: 1px solid #ddd;
            border-radius: 5px;
            color: rgb(49, 47, 47);
          }
          p {
            width: 80%;
            line-height: 1.5;
            text-align: center;
          }
          .info {
            margin-top: 1em;
            color: #555;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="password-reset">
          <h1>Password Reset</h1>
          <p>
            Hi ${username}, You opted to reset your account password. We need a
            little more information to complete your reset, including a confirmation
            of your email address. Click below to confirm your email address:
          </p>
          <a href="furnistore.herokuapp.com/verify-otp-password?q=${otp}">Reset</a>
          <h4>Kind Regards! – The Furnistore team</h4>
          <span class="info"
            >If you didnt opt for a password please ignore this email. This verification link will be valid for 1 hour</span
          >
        </div>
      </body>
    </html>
    `;
  }
  static getConfirmationEmail() {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Account Activation Success</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap");
          body {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Inter", Arial, Helvetica, sans-serif;
            min-height: 90vh;
          }
          a {
            background-color: #0267aa;
            text-decoration: none;
            padding: 5px 32px;
            height: 32px;
            min-width: 100px;
            max-width: calc(100% - 250px);
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            color: #fff;
            text-align: center;
            margin-top: 2em;
            cursor: pointer;
            transition: background-color 3s ease-out;
          }
          a:hover {
            background-color: #0099ff;
          }
          .confirmation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: calc(100vw - 850px);
            padding: 2em;
            border: 1px solid #ddd;
            border-radius: 5px;
            color: rgb(49, 47, 47);
          }
          p {
            width: 80%;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="confirmation">
          <h1>Welcome to Furnistore</h1>
          <p>
            Thank you for choosing Furnistore to deal with your furniture issues.
            You can now login into your account and start enjoying all the benefits
            of ordering furniture online.
          </p>
          <h4>Kind Regards! – The Furnistore team</h4>
          <a href="furnistore.herokuapp.com/login">Login into your account</a>
        </div>
      </body>
    </html>
    `;
  }
}

export default GenerateEmail;
