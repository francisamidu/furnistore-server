import { AES } from "crypto-js";
export default async function (value: string) {
  try {
    const hashedValue = await AES.encrypt(
      value,
      process.env.SECRET || "thisisnotideal"
    ).toString();
    return hashedValue;
  } catch (error) {
    throw error;
  }
}
