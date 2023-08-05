export function isJson(stringified) {
  try {
    JSON.parse(stringified);
    return true;
  } catch (error) {
    return false;
  }
}
