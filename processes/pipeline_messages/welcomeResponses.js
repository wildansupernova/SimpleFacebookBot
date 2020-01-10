
const getName = require('../../api/getName');
const senderAction = require('../../api/senderAction')
const sendMessage = require('../../api/sendMessage')
module.exports = async (event, usersStateData) => {
    const senderID = event.sender.id;
    if (event.message) {
        let text = event.message.text
        if (text) {
            text = text.toLowerCase()
            if (text == "halo") {
                try {
                    const result = await getName(senderID);
                    senderAction(senderID)
                        .then(() => {
                            sendMessage(senderID, `Halo ${result.first_name}!!!!`);
                        })

                } catch (error) {
                    return undefined;
                }
            }
        }
    }
}
