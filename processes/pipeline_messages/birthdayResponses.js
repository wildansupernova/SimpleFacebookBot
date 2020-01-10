const getName = require('../../api/getName');
const senderAction = require('../../api/senderAction')
const sendMessage = require('../../api/sendMessage')
module.exports = async (event, usersStateData) => {
    const senderID = event.sender.id;
    if (event.message) {
        let text = event.message.text
        if (text) {
            text = text.toLowerCase();
            const hiText = ["hallo"];
            if (hiText.includes(text)) {
                try {
                    const result = await getName(senderID);
                    return senderAction(senderID)
                        .then(() => {
                            return sendMessage(senderID, `asede ${result.first_name}!!!!`);
                        });
                } catch (error) {
                    return undefined;
                }
            }
        }
    } else if (event.postback) {

    }
}