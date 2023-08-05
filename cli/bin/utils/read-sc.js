import { readFileSync } from "fs";
import path from "path";
import mime from "mime-types";
import { fileURLToPath } from "url";
import { dirname } from "path";
import assert from "node:assert";

export function readFileAsStringSync(filePath) {
  try {
    const mimeType = mime.lookup(filePath);
    const sc = readFileSync(filePath, "utf8");
    if (!sc.trim().length) {
      console.error(
        `⚠️ Error: blank source code, please check the file path and try again ⚠️`,
      );
      return { sc: null, mimeType: null };
    }
    return { sc, mimeType };
  } catch (err) {
    console.error("source code not found:", err);
    return null;
  }
}
