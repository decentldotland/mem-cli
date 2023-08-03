#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initer } from "./initer.js";
import { deployFunction } from "./handlers/deploy.js";
import { writeFunction } from "./handlers/write.js";

const argvs = yargs(hideBin(process.argv))
  .command({
    command: "deploy [src] [init-state]",
    builder: (yargs) => {
      yargs.options({
        src: {
          describe: "path to the contract source code",
          demandOption: true,
        },
        "init-state": {
          describe: "A stringified initial state for the contract",
          demandOption: true,
        },
      });
    },
    handler: async (argv) => {
      await deployFunction(argv);
    },
  })
  .command({
    command: "write [function-id] [inputs]",
    builder: (yargs) => {
      yargs.options({
        "function-id": {
          describe: "your MEM function/contract ID",
          demandOption: true,
        },
        "inputs": {
          describe: "the contract interaction stringified inputs object",
          demandOption: true,
        },
      });
    },
    handler: async (argv) => {
      await writeFunction(argv);
    },
  })
  .command({
    command: "*",
    handler: async (argv) => {
      await initer();
    },
  })
  .help().argv;
