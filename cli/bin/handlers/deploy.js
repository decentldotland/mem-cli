import { generateSourceCode } from "../utils/gen-format.js";
import { deployContract } from "../utils/post-tx.js";
import Box from "cli-box";
import axios from "axios";

export async function handleDeployFunction(argv) {
  try {
    const { src, initState, testnet } = argv;

    if (testnet) {
      await deployFunctionTestnet(argv);
      return;
    }

    await deployFunctionMainnet(argv);
  } catch (error) {
    console.error(`⚠️ Error broadcasting function source to MEM ⚠️\n`);
  }
}

async function deployFunctionTestnet(argv) {
  try {
    const { src, initState, testnet } = argv;

    const data = (await generateSourceCode(src, initState))?.dataTx;

    const contractSrc = String.fromCharCode(...data?.contractSrc);

    const options = {
      src: contractSrc,
      state: data?.initState,
    };
    const result = (await axios.post("https://mem-testnet.xyz/deploy", options))
      ?.data;
    const function_id = result?.function_id;
    if (function_id) {
      const boxText = `
    ⚡️ MEM web3 serverless function deployed successfully on MEM Carbon! ⚡️

    > Function ID: ${function_id}

    > Carbon TXID: https://mem-testnet.xyz/state/${function_id}
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
      console.error(`⚠️ Error broadcasting function source to MEM Carbon ⚠️`);
    }
  } catch (error) {
    console.error(`⚠️ Error broadcasting function source to MEM Carbon ⚠️`);
  }
}

export async function deployFunctionMainnet(argv) {
  try {
    const { src, initState, testnet } = argv;

    const data = await generateSourceCode(src, initState);

    if (!data.dataTx) {
      return;
    }
    const txid = (await deployContract(data))?.txid;

    if (txid) {
      const boxText = `
    ⚡️ MEM web3 serverless function deployed successfully! ⚡️

    > Function ID: ${txid}

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
