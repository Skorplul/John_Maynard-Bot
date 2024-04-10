import { readFile, writeFile, readFileSync, writeFileSync } from 'node:fs';
import fetch from "cross-fetch";
import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;
  const APPLICATION_ID = req.body.application_id;
  const INTERACTION_TOKEN = req.body.token;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    console.log(req.body)
    const { name } = data;

    if (name === "test") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "I try! " + getRandomEmoji(),
        },
      });
      Webhook()
    }

      if (name === "gamble") {
          readFileSync("stats.json", (error, userStat) => {
              if (error) {
                  
                  console.error(error);

                  throw err;
              }
              console.log("NOT PARSED     " + stats)

              const user = JSON.parse(suserStat);

              console.log("PARSED     " + user)
          });

          //let number = stats;
          const userStat = {
             // UId: number,
              id: req.body.member.user.id,
              name: req.body.member.user.username,
          }

          const data = JSON.stringify(userStat);

          // writing the JSON string content to a file
          writeFile("stats.json", data, (error) => {
              // throwing the error
              // in case of a writing problem
              if (error) {
                  // logging the error
                  return console.error(error);

                  throw error;
              }

              return console.log("data written correctly");
          });

          res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                  content: `I saved ${userStat.name}`
              }
          })
      }

    if (name === "ping") {
      let pingTarget = req.body.data.options[1].value;
      let pingTargetT = pingTarget;
      let amount = req.body.data.options[0].value;
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `HEY! <@${pingTargetT}>`,
        },
      });
      sendFollowUpMessages();

      // Function to send follow-up message with a delay
      async function sendFollowUpMessages(pingTarget) {
        let repeat = amount - 1;
        while (repeat > 0) {
          // Construct the URL for the follow-up message endpoint
          const webhookUrl = `https://discord.com/api/webhooks/${APPLICATION_ID}/${INTERACTION_TOKEN}`;

          // Data for the follow-up message
          const followUpMessageData = {
            content: `HEY! <@${pingTargetT}>`, // Use dynamic content
          };

          try {
            // Make an HTTP POST request to send the follow-up message
            const response = await fetch(webhookUrl, {
              method: "POST",
              headers: {
                Authorization: `${process.env.DISCORD_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(followUpMessageData),
            });

            if (!response.ok) {
              console.log(webhookUrl);
              throw new Error(
                "Error sending follow-up message: " + response.statusText
              );
            }

            //console.log('Follow-up message sent successfully!');
          } catch (error) {
            return console.error(error);
          }

          repeat--;
          sleep(1000);
        }
      }
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function Webhook() {
    let repeat = 1;
    while (repeat > 0) {
      // Construct the URL for the follow-up message endpoint
      const webhookUrl = `https://discord.com/api/webhooks/${process.env.BotTest_Stat_Id}/${process.env.BotTest_Stat_Token}`;

      // Data for the follow-up message
      const followUpMessageData = {
        content: `https://tenor.com/view/test-light-different-colors-animated-text-neon-gif-17511612`, // Use dynamic content
      };

      try {
        // Make an HTTP POST request to send the follow-up message
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(followUpMessageData),
        });

        if (!response.ok) {
          console.log(webhookUrl);
          throw new Error(
            "Error sending Webhook message: " + response.statusText
          );
        }

        //console.log('Follow-up message sent successfully!');
      } catch (error) {
        return console.error(error);
      }
      repeat--;
    }
  }
});
app.listen(PORT, () => {
  //  console.log('Listening on port', PORT);
});
