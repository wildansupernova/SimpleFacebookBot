const birthdayResponse = require('./birthdayResponses');
const welcomeResponses = require('./welcomeResponses');

const pipelineMessagesResponse = [
    welcomeResponses,
    birthdayResponse
]

module.exports = async (event, usersStateData) => {
    const n = pipelineMessagesResponse.length;
    let index = 0;
    let keepContinue = true;
    while (index < n && keepContinue) {
        const result = await pipelineMessagesResponse[index](event, usersStateData);
        if (result != undefined) {
            keepContinue = false;
        } 
        index++;
    }
}