export default async function (
  providedPassword: string,
  originalPassword: string
) {
  try {
    const isMatch = providedPassword === originalPassword;
    return isMatch;
  } catch (error) {
    throw error;
  }
}
