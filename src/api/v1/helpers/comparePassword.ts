export default function (providedPassword: string, originalPassword: string) {
  const isMatch = providedPassword === originalPassword;
  return isMatch;
}
