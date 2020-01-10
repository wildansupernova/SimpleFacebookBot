const getName = require('../../api/getName');
const senderAction = require('../../api/senderAction')
const sendMessage = require('../../api/sendMessage')
const yesOrNoPostbackButton = require('../../api/yesOrNoPostbackButton');
const STATE_QUESTION_BIRTHDAY = {
    BEGIN_STATE: 0,
    ASKING_FIRST_NAME: 1,
    ASKING_BIRTHDAY: 2,
    ASKING_BIRTHDAY_DAY_LEFTOVER: 3
}

async function beginStateResponse(senderID, text, usersStateData) {
    text = text.toLowerCase();
    const hiText = ['hallo', 'hi', 'halo', 'hai', 'hey', 'hay'];
    if (hiText.includes(text)) {
        usersStateData.setStateObj(senderID, {
            state: STATE_QUESTION_BIRTHDAY.ASKING_FIRST_NAME,
            last_updated: new Date(),
            content: {}
        });
        await senderAction(senderID);
        await sendMessage(senderID, `Hi!!!!`);
        return await sendMessage(senderID, `What is your first name?`);
    } else {
        return undefined;
    }
}

async function askingFirstnameResponse(senderID, text, usersStateData) {
    usersStateData.setStateObj(senderID, {
        state: STATE_QUESTION_BIRTHDAY.ASKING_BIRTHDAY,
        last_updated: new Date(),
        content: {
            first_name: text
        }
    });
    await senderAction(senderID);
    return await sendMessage(senderID, `What is your birth date?`);
}

async function askingBirthdayResponse(senderID, text, usersStateData) {
    const objNow = usersStateData.getStateObj(senderID);
    usersStateData.setStateObj(senderID, {
        state: STATE_QUESTION_BIRTHDAY.ASKING_BIRTHDAY_DAY_LEFTOVER,
        last_updated: new Date(),
        content: {
            ...objNow.content,
            birthday: new Date(text)
        }
    });
    await senderAction(senderID);
    return await yesOrNoPostbackButton(senderID, `Do you want to know about how many days till your next birtday?`);
}

function calculateDayRange(birthday, now) {
    let yearNow = now.getFullYear();
    birthday.setFullYear(yearNow);
    if (birthday < now) {
        birthday.setFullYear(yearNow + 1);
    }
    return Math.round((birthday.getTime() - now.getTime()) / 86400000);
}

async function askingBirthdayLeftOverResponse(senderID, text, usersStateData) {
    text = text.toLowerCase();
    const objNow = usersStateData.getStateObj(senderID);
    const setStateLeftOver = () => {
        usersStateData.setStateObj(senderID, {
            state: STATE_QUESTION_BIRTHDAY.BEGIN_STATE,
            last_updated: new Date(),
            content: {
                ...objNow.content,
            }
        });
    }
    const yesText = ['yes', 'yeah', 'yup', 'y', 'yeay'];
    const noText = ['no', 'nah', 'n'];
    if (yesText.includes(text)) {
        setStateLeftOver();
        const dayResult = calculateDayRange(new Date(objNow.content.birthday), new Date());
        await senderAction(senderID);
        return await sendMessage(senderID, `There are ${dayResult} days left until your next birthday`);
    } else if (noText.includes(text)) {
        setStateLeftOver();
        await senderAction(senderID);
        return await sendMessage(senderID, `Goodbye👋`);
    } else {
        return undefined;
    }
}

async function replyMessage(event, usersStateData) {
    const senderID = event.sender.id;
    const stateObj = usersStateData.getStateObj(senderID);
    let usersState;
    if (stateObj == undefined) {
        usersState = STATE_QUESTION_BIRTHDAY.BEGIN_STATE;
    } else {
        usersState = stateObj.state;
    }

    const message = event.message && event.message.text || event.postback && event.postback.title;
    
    switch (usersState) {
        case STATE_QUESTION_BIRTHDAY.BEGIN_STATE:
            return await beginStateResponse(senderID, message, usersStateData);
            break;
        case STATE_QUESTION_BIRTHDAY.ASKING_FIRST_NAME:
            return await askingFirstnameResponse(senderID, message, usersStateData);
            break;
        case STATE_QUESTION_BIRTHDAY.ASKING_BIRTHDAY:
            return await askingBirthdayResponse(senderID, message, usersStateData);
            break;
        case STATE_QUESTION_BIRTHDAY.ASKING_BIRTHDAY_DAY_LEFTOVER:
            return await askingBirthdayLeftOverResponse(senderID, message, usersStateData);
            break;
    }
}

module.exports = async (event, usersStateData) => {
    const senderID = event.sender.id;
    try {
        return await replyMessage(event, usersStateData);
    } catch (error) {
        return undefined;
    }
}