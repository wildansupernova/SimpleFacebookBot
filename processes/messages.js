const pipelineMessages = require('./pipeline_messages');
module.exports = function processMessage(event, usersStateData) {
    if (event.message) {
        if (!event.message.is_echo) {
            const message = event.message;
            const senderID = event.sender.id;
            console.log("Received message from senderId: " + senderID);
            console.log("Message is: " + JSON.stringify(message));
            pipelineMessages(event, usersStateData);
        }
    }
}