const birthdayResponse = require('./birthdayResponses');
const welcomeResponses = require('./welcomeResponses');

const pipelineMessagesResponse = [
    welcomeResponses,
    birthdayResponse
]

module.exports = (event, usersStateData) => {
    const n = pipelineMessagesResponse.length;
    let index = 0;
    while (index < n) {
        const result = pipelineMessagesResponse[index](event, usersStateData);
        if (result != undefined) {
            break;
        } 
        index++;
    }
}