const rp = require('request-promise').defaults({ json: true });
module.exports = function sendMessage(recipientId, message) {
    const options = {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            message: {
                text: message
            }
        }
    }

    return rp(options);
}