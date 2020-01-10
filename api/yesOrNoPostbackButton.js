const rp = require('request-promise').defaults({ json: true });
module.exports = function yesOrNoPostbackButton(recipientId, message) {
    const options = {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        "template_type": "button",
                        text: message,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes",
                                "payload": "YES_RESPOND"
                            },
                            {
                                "type": "postback",
                                "title": "No",
                                "payload": "NO_RESPOND"
                            }
                        ]
                    }
                }
            }
        }
    }

    return rp(options);
}