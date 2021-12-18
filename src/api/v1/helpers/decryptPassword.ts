import { AES, enc } from "crypto-js";

export default (password: string) => {
  const hashedPassword = AES.decrypt(
    password,
    process.env.SECRET || "thisisnotideal"
  );
  const decryptedPassword = hashedPassword.toString(enc.Utf8);
  return decryptedPassword;
};
