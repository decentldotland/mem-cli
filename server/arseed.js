import Bundlr from "@bundlr-network/client";
import dotenv from "dotenv";
dotenv.config();

const bundlr = new Bundlr.default(
  "https://node1.bundlr.network",
  "ethereum",
  process.env.PRIVATE_KEY,
);

export async function archive(input) {
  try {
    const data = Buffer.from(JSON.stringify(input.dataTx));

    const tags = [
      { name: "Content-Type", value: input.dataTx.contentType },
      { name: "Owner", value: "" },
      { name: "App-Name", value: "EM" },
      { name: "Type", value: "Serverless-Function" },
      { name: "EM-Bundled", value: "true" },
      { name: "Size", value: String(input.dataTx.contractSrc.length) },
    ];

    const transaction = await bundlr.createTransaction(data, { tags: tags });
    await transaction.sign();
    await transaction.upload();

    return transaction.id;
  } catch (error) {
    console.log(error);
    return false;
  }
}
