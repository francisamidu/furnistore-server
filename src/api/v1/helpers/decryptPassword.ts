import { AES, enc } from "crypto-js";

export default (user: any, password: string) => {
  const hashedPassword = AES.decrypt(
    user.password,
    process.env.SECRET || "thisisnotideal"
  );
  const decryptedPassword = hashedPassword.toString(enc.Utf8);
  return decryptedPassword;
};
