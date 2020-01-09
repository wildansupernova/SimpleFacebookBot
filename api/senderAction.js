const rp = require('request-promise').defaults({ json: true });
module.exports = function senderAction(recipientId) {
    const options = {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            "sender_action": "typing_on"
        }
    }
    return rp(options);
}