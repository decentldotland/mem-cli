import axios from "axios";
import Box from "cli-box";

export async function handleWriteFunction(argv) {
  const { inputs, functionId, testnet } = argv;

  if (testnet) {
    await writeFunctionTestnet(argv);
    return;
  }

  await writeFunctionMainnet(argv);
}

export async function writeFunctionTestnet(argv) {
  try {
    const { inputs, functionId, testnet } = argv;
    JSON.parse(inputs);

    const body = {
      input: inputs,
      function_id: functionId,
    };

    const result = (await axios.post("https://mem-testnet.xyz/write", body))
      ?.data;

    console.log(`⚡️ MEM Carbon transaction sent successfully ⚡️\n`);
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    console.log(`⚠️ Error posting function interaction ⚠️`);
    return false;
  }
}

export async function writeFunctionMainnet(argv) {
  try {
    // later TODO when mem-core is open-sourced:
    // add a check WL'd functions validity. Read
    // dynamically from the GH repo.
    const { inputs, functionId } = argv;
    JSON.parse(inputs);
    const functionInputs = [
      {
        input: inputs,
      },
    ];

    const req = await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: functionId,
        inputs: functionInputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (req?.data?.data?.pseudoId) {
      const boxText = `
    ⚡️ MEM transaction sent successfully ⚡️

    > TXID: ${req?.data?.data?.pseudoId}
    `;

      const box = Box("3x3", {
        text: boxText,
        stretch: true,
        autoEOL: true,
        vAlign: "top",
        hAlign: "left",
      });
      console.log(box);
      return req?.data;
    } else {
      console.error(`⚠️ Error posting function interaction ⚠️`);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
