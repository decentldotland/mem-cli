#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initer } from "./initer.js";
import { handleDeployFunction } from "./handlers/deploy.js";
import { handleWriteFunction } from "./handlers/write.js";

const commands = [
  {
    command: "deploy [src] [init-state] [testnet]",
    description: "Deploys a function",
    options: {
      src: {
        describe: "path to the function source code",
        demandOption: true,
      },
      "init-state": {
        describe: "A stringified initial state for the function",
        demandOption: true,
      },
      testnet: {
        describe: "optional to deploy the function on MEM Carbon testnet",
        demandOption: false,
      },
    },
    handler: handleDeployFunction,
  },
  {
    command: "write [function-id] [inputs] [testnet]",
    description: "Writes an interaction",
    options: {
      "function-id": {
        describe: "your MEM function ID",
        demandOption: true,
      },
      inputs: {
        describe: "the function interaction stringified inputs object",
        demandOption: true,
      },
      testnet: {
        describe: "optional to write the interaction on MEM Carbon testnet",
        demandOption: false,
      },
    },
    handler: handleWriteFunction,
  },
  {
    command: "*",
    description: "Initialize",
    handler: initer,
  },
];

const argvs = yargs(hideBin(process.argv))
  .scriptName("mem")
  .usage("Usage: $0 <command> [options]");

commands.forEach(({ command, description, options, handler }) => {
  argvs.command(
    command,
    description,
    (yargs) => {
      if (options) {
        yargs.options(options);
      }
    },
    handler,
  );
});

argvs
  .demandCommand(1, "Please provide a valid command")
  .epilogue("For more information, visit: https://docs.mem.tech")
  .example("$0 deploy --src path/to/source --init-state initialState", "")
  .alias("h", "help")
  .help().argv;
