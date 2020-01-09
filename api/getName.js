const rp = require('request-promise').defaults({ json: true });

module.exports = (senderID) => {
    const options = {
        url: "https://graph.facebook.com/v2.6/" + senderID,
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN,
            fields: "first_name"
        },
        method: "GET"
    }
    return rp(options);
}