import { readFile, writeFile, readFileSync, writeFileSync, read } from 'node:fs';
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
import './daBall.js';
import { johnGedErst, johnGedZwei, ballAnswers } from './txtData.js';
import { untimeout } from './commands/untimeout.js';

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
      // console.log(req.body)
      const { name } = data;
      const APPLICATION_ID = req.body.application_id;
      const INTERACTION_TOKEN = req.body.token;
      const guildId = req.body.guild_id;
      const userId = req.body.member.user.id;
      var Time = new Date(Date.now());
      console.log(`User ID: ${userId}
Server ID: ${guildId}
Command: ${name}
Time: ${Time.toString()}`);

    if (name === "untimeout") {
        let unmuteTarget = req.body.data.options[0].value;
        const muteUrl = `https://discord.com/api/guilds/${guildId}/members/${unmuteTarget}`;

        const mutedTill = null;

        const muteReqData = {
            communication_disabled_until: mutedTill,
        };

        try {
            // Make an HTTP POST request to send the follow-up message
            const response = await fetch(muteUrl, {
                method: "PATCH",
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(muteReqData),
            });

            if (!response.ok) {
                res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Error: No permission`
                    }
                });
                console.log(muteUrl);
                throw new Error(
                    "Error sending request: " + response.statusText
                );
            }

            //console.log('Follow-up message sent successfully!');
        } catch (error) {
            return console.error(error);
        };
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `untimeouted <@${unmuteTarget}>`
            }
        });
    }

     if (name === "gamble") {

         muteGamble();

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

    if (req.body.data.name === "status") {
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Command is WIP rn, please give me some time. :)`,
            },
        });


        console.log(name)
        console.log(userId)
        let botOwnerId = "504875989776596992";
        if (userId === botOwnerId) {
            let statusStat = req.body.data.options[0].value
            console.log(userId)
            console.log(statusStat)
            if (statusStat === "1") {
                //bot.user.setStatus('online'),
                workDoneMsg();
                console.log("do")
            };
            if (statusStat === "2") {
                //bot.user.setStatus('idle'),
                workDoneMsg();
            };
            if (statusStat === "3") {
               // bot.user.setStatus('Do Not Disturb'),
                workDoneMsg();
            };
            if (statusStat === "4") {
                //bot.user.setStatus('invisible'),
                workDoneMsg();
            };
             console.log("do not")
        }
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Done`,
            },
        });
    };


      if (name === "gedicht") {
          
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: johnGedErst
,
               },
            });
          
          // Construct the URL for the follow-up message endpoint
          const webhookUrl = `https://discord.com/api/webhooks/${APPLICATION_ID}/${INTERACTION_TOKEN}`;

          // Data for the follow-up message
          const followUpMessageData = {
              content: johnGedZwei, 
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
              
          
      }
          
      if (req.body.data.name === "8-ball") {
          let ballAnswerInt = getRandInt(0, 6);
          const answer = ballAnswers[ballAnswerInt];
          return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                  content: `${answer}`,
              },
          });
      }

    /*
    *
    *
    *  Above new command actions
    * 
    * 
    */

  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

    function workDoneMsg() {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Done`,
            },
        }); 
    };


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


    function muteGamble() {
        const mute = 1;
        const muteAkt = getRandInt(1, 6);
        
        console.log(mute, muteAkt)

        if (mute === muteAkt) {
            muteer(1)

        } else { 
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Lucky you!`
                }
            })
        }
    }

    async function muteer(unMute) {
        const guildId = req.body.guild_id;
        const userId = req.body.member.user.id;
        // Construct the URL for the follow-up message endpoint
        const muteUrl = `https://discord.com/api/guilds/${guildId}/members/${userId}`;


        const currentTime = Date.now();
        const timeoutExpiryTime = currentTime + (5 * 60 * 1000 * unMute);
        const mutedTill = new Date(timeoutExpiryTime).toISOString();

        const muteReqData = {
            communication_disabled_until: mutedTill,
        };

        try {
            // Make an HTTP POST request to send the follow-up message
            const response = await fetch(muteUrl, {
                method: "PATCH",
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(muteReqData),
            });

            if (!response.ok) {
                res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Error: No permission`
                    }
                });
                console.log(muteUrl);
                throw new Error(
                    "Error sending request: " + response.statusText
                );
            }

            //console.log('Follow-up message sent successfully!');
        } catch (error) {
            return console.error(error);
        };

        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `You dead :3`
            }
        });
    }



    function getRandInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

});
app.listen(PORT, () => {
  //  console.log('Listening on port', PORT);
});
