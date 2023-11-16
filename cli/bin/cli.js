#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initer } from "./initer.js";
import { handleDeployFunction } from "./handlers/deploy.js";
import { handleWriteFunction } from "./handlers/write.js";

const argvs = yargs(hideBin(process.argv))
  .command({
    command: "deploy [src] [init-state] [testnet]",
    builder: (yargs) => {
      yargs.options({
        src: {
          describe: "path to the function source code",
          demandOption: true,
        },
        "init-state": {
          describe: "A stringified initial state for the function",
          demandOption: true,
        },
        "testnet": {
          describe: "optional to deploy the function on MEM Carbon testnet",
          demandOption: false,
        },
      });
    },
    handler: async (argv) => {
      await handleDeployFunction(argv);
    },
  })
  .command({
    command: "write [function-id] [inputs] [testnet]",
    builder: (yargs) => {
      yargs.options({
        "function-id": {
          describe: "your MEM function ID",
          demandOption: true,
        },
        "inputs": {
          describe: "the function interaction stringified inputs object",
          demandOption: true,
        },
        "testnet": {
          describe: "optional to write the interaction on MEM Carbon testnet",
          demandOption: false,
        },
      });
    },
    handler: async (argv) => {
      await handleWriteFunction(argv);
    },
  })
  .command({
    command: "*",
    handler: async (argv) => {
      await initer();
    },
  })
  .help().argv;
