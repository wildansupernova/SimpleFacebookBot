
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
                const result = await getName(senderID);
                await senderAction(senderID);
                return await sendMessage(senderID, `Halo ${result.first_name}!!!!`);
            } catch (error) {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    return undefined
}
