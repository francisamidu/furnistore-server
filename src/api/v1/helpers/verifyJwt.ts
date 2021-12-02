import JWT from "jsonwebtoken";

export default async function (token: any) {
  try {
    const isValidToken = await JWT.verify(
      token,
      process.env.AUTH_SECRET || "thisisnotideal"
    );
    return { payload: isValidToken, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
