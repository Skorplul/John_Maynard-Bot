export async function untimeout(muteUrl, muteReqData) {
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
};