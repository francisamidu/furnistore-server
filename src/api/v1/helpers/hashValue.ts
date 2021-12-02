import { AES } from "crypto-js";
export default async function (password: string) {
  try {
    const hashedValue = await AES.encrypt(
      password,
      process.env.SECRET || "thisisnotideal"
    ).toString();
    return hashedValue;
  } catch (error) {
    throw error;
  }
}
