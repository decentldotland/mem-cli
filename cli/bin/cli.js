#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initer } from "./initer.js";
import { deployFunction } from "./handlers/deploy.js";

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
    command: "*",
    handler: async (argv) => {
      await initer();
    },
  })
  .help().argv;
