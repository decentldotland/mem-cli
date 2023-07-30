import { readFileAsStringSync } from "./read-sc.js";

export async function generateSourceCode(filePath, stringifiedState) {
  try {
    JSON.parse(stringifiedState);

    const { sc, mimeType } = readFileAsStringSync(filePath);
    const sourceCode = sc.split("").map((char) => char.charCodeAt(0));

    const dataTx = {
      contractOwner: "",
      contentType: mimeType,
      contractSrc: sourceCode,
      initState: stringifiedState,
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
  }
}
