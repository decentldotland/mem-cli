import { generateSourceCode } from "../utils/gen-format.js";
import { deployContract } from "../utils/post-tx.js";
import Box from "cli-box";

export async function deployFunction(argv) {
  try {
    const { src, initState } = argv;
    const data = await generateSourceCode(src, initState);

    if (!data.dataTx) {
      return;
    }
    const txid = (await deployContract(data))?.txid;

    if (txid) {
      const boxText = `
    ⚡️ MEM web3 serverless function deployed successfully! ⚡️

    > Contract ID: ${txid}

    > Arweave TXID: https://arweave.net/${txid}
    `;

      const box = Box("3x3", {
        text: boxText,
        stretch: true,
        autoEOL: true,
        vAlign: "top",
        hAlign: "left",
      });
      console.log(box);
      return;
    } else {
      console.error(`⚠️ Error broadcasting function source to Arweave ⚠️`);
    }
  } catch (error) {
    console.error(`⚠️ Error broadcasting function source to Arweave ⚠️\n`);
    console.log(error);
    return;
  }
}
