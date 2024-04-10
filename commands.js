import "dotenv/config";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Ping command
const PING_COMMAND = {
  name: "ping",
  type: 1,
  description: "Ping someone very much.",
  options: [
    {
      name: "amount",
      description: "How often do you want to ping them?",
      type: 3,
      required: true,
      choices: [
        {
          name: "ok",
          value: "5",
          description: "5x",
        },
        {
          name: "Why",
          value: "10",
          description: "10x",
        },
        {
          name: "STOP",
          value: "15",
          description: "15x",
        },
        {
          name: "KYS",
          value: "20",
          description: "20x",
        },
      ],
    },
    {
      name: "user",
      description: "Who do you want to ping?",
      type: 6,
      required: true,
    },
  ],
};

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
};

const GAMBLE_COMMAND = {
    name: "gamble",
    description: "You gamble for your rights to talk.",
    type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND, PING_COMMAND, GAMBLE_COMMAND,];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
