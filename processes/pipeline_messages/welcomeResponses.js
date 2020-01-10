
const getName = require('../../api/getName');
const senderAction = require('../../api/senderAction')
const sendMessage = require('../../api/sendMessage')

module.exports = async (event, usersStateData) => {
    const senderID = event.sender.id;
    if (event.message && event.message.text) {
        let text = event.message.text
        text = text.toLowerCase();
        const hiText = ['hallo', 'hi', 'halo', 'hai', 'hey', 'hay'];
        if (hiText.includes(text)) {
            try {
                await senderAction(senderID);
                await sendMessage(senderID, `Hi!!!!`);
                return await sendMessage(senderID, `What is your first name?`);
            } catch (error) {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    return undefined
}
