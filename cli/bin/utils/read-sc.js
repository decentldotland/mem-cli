import { readFileSync } from "fs";
import path from "path";
import mime from "mime-types";
import { fileURLToPath } from "url";
import { dirname } from "path";

export function readFileAsStringSync(filePath) {
  try {
    const mimeType = mime.lookup(filePath);
    const sc = readFileSync(filePath, "utf8");
    return { sc, mimeType };
  } catch (err) {
    console.error("source code not found:", err);
    return null;
  }
}
