import { generateSourceCode } from "../utils/gen-format.js";
import { deployContract } from "../utils/post-tx.js";
import Box from "cli-box";

export async function deployFunction(argv) {
  try {
    const { src, initState } = argv;
    const data = await generateSourceCode(src, initState);
    const txid = (await deployContract(data))?.txid;

    const boxText = `
    ⚡️ MEM web3 serverless function deployed successfully! ⚡️

    > Contract ID: ${txid}

    > Arweave TXID: https://arseed.web3infra.dev/${txid}
    `;

    const box = Box("3x3", {
      text: boxText,
      stretch: true,
      autoEOL: true,
      vAlign: "top",
      hAlign: "left",
    });
    console.log(box);
  } catch (error) {
    console.log(error);
  }
}
