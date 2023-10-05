import { readFileAsStringSync } from "./read-sc.js";
import { isJson } from "./verifiers.js";

export async function generateSourceCode(filePath, stringifiedState) {
  try {
    let state;
    if (stringifiedState.endsWith(".json")) {
      state = JSON.stringify(
        JSON.parse(readFileAsStringSync(stringifiedState).sc),
      );
    } else {
      if (!isJson(stringifiedState)) {
        console.error(
          `⚠️ Error: provide a valid stringified JSON object for state ⚠️`,
        );
        return { dataTx: null, tags: null };
      }

      state = stringifiedState;
    }

    const { sc, mimeType } = readFileAsStringSync(filePath);

    if (!sc || !mimeType) {
      return { dataTx: null, tags: null };
    }
    const sourceCode = sc.split("").map((char) => char.charCodeAt(0));

    const dataTx = {
      contractOwner: "",
      contentType: mimeType,
      contractSrc: sourceCode,
      initState: state,
    };

    const tags = [
      { name: "Content-Type", value: mimeType },
      { name: "Owner", value: "" },
      { name: "App-Name", value: "EM" },
      { name: "Type", value: "Serverless-Function" },
      { name: "EM-Bundled", value: "true" },
      { name: "Size", value: String(sourceCode.length) },
    ];

    return { dataTx, tags };
  } catch (error) {
    console.log(error);
    return { dataTx: null, tags: null };
  }
}
