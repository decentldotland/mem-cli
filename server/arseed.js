import { genNodeAPI } from "arseeding-js";
import dotenv from "dotenv";
dotenv.config();

export async function archive(input) {
  try {
    const instance = await genNodeAPI(process.env.PRIVATE_KEY);
    const arseedUrl = "https://arseed.web3infra.dev";
    const data = Buffer.from(JSON.stringify(input.dataTx));
    const payCurrency = "eth";
    const tags = [
      { name: "Content-Type", value: input.dataTx.contentType },
      { name: "Owner", value: "" },
      { name: "App-Name", value: "EM" },
      { name: "Type", value: "Serverless-Function" },
      { name: "EM-Bundled", value: "true" },
      { name: "Size", value: String(input.dataTx.contractSrc.length) },
    ];

    const ops = {
      tags: input.tags,
    };
    const tx = await instance.sendAndPay(arseedUrl, data, payCurrency, ops);
    return tx?.order?.itemId;
  } catch (error) {
    console.log(error);
    return false;
  }
}
