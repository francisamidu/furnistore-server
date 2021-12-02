import JWT from "jsonwebtoken";

export default async function (
  payload: any,
  expiration: number | string = Math.floor(Date.now() / 1000) + 60 * 60
) {
  try {
    const token = JWT.sign(
      payload,
      process.env.AUTH_SECRET || "thisisnotideal",
      {
        expiresIn: expiration,
      }
    );
    return token;
  } catch (error) {
    throw error;
  }
}
