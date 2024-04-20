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
import { ballAnswers } from './daBall.js';

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
    console.log(req.body)
      const { name } = data;
      const APPLICATION_ID = req.body.application_id;
      const INTERACTION_TOKEN = req.body.token;
      const guildId = req.body.guild_id;
      const userId = req.body.member.user.id;

    if (name === "test") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "I try! " + getRandomEmoji(),
        },
      });
      //Webhook()
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


        console.log(name)
      if (name === "gedicht") {
          
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `John Maynard!
„Wer ist John Maynard?“
„John Maynard war unser Steuermann,
aushielt er, bis er das Ufer gewann,
er hat uns gerettet, er trägt die Kron',
er starb für uns, unsre Liebe sein Lohn.
John Maynard.“

Die „Schwalbe“ fliegt über den Erie-See,
Gischt schäumt um den Bug wie Flocken von Schnee;
von Detroit fliegt sie nach Buffalo -
die Herzen aber sind frei und froh,
und die Passagiere mit Kindern und Fraun
im Dämmerlicht schon das Ufer schaun,
und plaudernd an John Maynard heran
tritt alles: „Wie weit noch, Steuermann?“
Der schaut nach vorn und schaut in die Rund:
„Noch dreißig Minuten ... Halbe Stund.“

Alle Herzen sind froh, alle Herzen sind frei -
da klingt's aus dem Schiffsraum her wie Schrei,
„Feuer!“ war es, was da klang,
ein Qualm aus Kajüt und Luke drang,
ein Qualm, dann Flammen lichterloh,
und noch zwanzig Minuten bis Buffalo.

Und die Passagiere, bunt gemengt,
am Bugspriet stehn sie zusammengedrängt,
am Bugspriet vorn ist noch Luft und Licht,
am Steuer aber lagert sich´s dicht,
und ein Jammern wird laut: „Wo sind wir? wo?“
Und noch fünfzehn Minuten bis Buffalo. -

Der Zugwind wächst, doch die Qualmwolke steht,
der Kapitän nach dem Steuer späht,
er sieht nicht mehr seinen Steuermann,
aber durchs Sprachrohr fragt er an:
„Noch da, John Maynard?“
„Ja, Herr. Ich bin.“
`
,
               },
            });
          
          // Construct the URL for the follow-up message endpoint
          const webhookUrl = `https://discord.com/api/webhooks/${APPLICATION_ID}/${INTERACTION_TOKEN}`;

          // Data for the follow-up message
          const followUpMessageData = {
              content: `„Auf den Strand! In die Brandung!“
„Ich halte drauf hin.“
Und das Schiffsvolk jubelt: „Halt aus! Hallo!“
Und noch zehn Minuten bis Buffalo. - -

„Noch da, John Maynard?“ Und Antwort schallt's
mit ersterbender Stimme: „Ja, Herr, ich halt's!“
Und in die Brandung, was Klippe, was Stein,
jagt er die „Schwalbe“ mitten hinein.
Soll Rettung kommen, so kommt sie nur so.
Rettung: der Strand von Buffalo!

Das Schiff geborsten. Das Feuer verschwelt.
Gerettet alle. Nur einer fehlt!
Alle Glocken gehn; ihre Töne schwell'n
himmelan aus Kirchen und Kapell'n,

ein Klingen und Läuten, sonst schweigt die Stadt,
ein Dienst nur, den sie heute hat:
Zehntausend folgen oder mehr,
und kein Aug' im Zuge, das tränenleer.

Sie lassen den Sarg in Blumen hinab,
mit Blumen schließen sie das Grab,
und mit goldner Schrift in den Marmorstein
schreibt die Stadt ihren Dankspruch ein:

„Hier ruht John Maynard! In Qualm und Brand
hielt er das Steuer fest in der Hand,
er hat uns gerettet, er trägt die Kron,
er starb für uns, unsre Liebe sein Lohn.
John Maynard.“`, // Use dynamic content
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
            muteer()

        } else { 
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Lucky you!`
                }
            })
        }
    }

    async function muteer() {
        // Construct the URL for the follow-up message endpoint
        const muteUrl = `https://discord.com/api/guilds/${guildId}/members/${userId}`;


        const currentTime = Date.now();
        const timeoutExpiryTime = currentTime + (5 * 60 * 1000);
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
