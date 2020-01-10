'use strict'
module.exports = class {
    constructor() {
        console.log("Init user state cache");
        this.messages = {};
    }

    addMessage(messageId, msgObj) {
        this.messages[messageId] = msgObj;
    }

    getMessages() {
        return Object.values(this.messages);
    }

    getMessage(mid) {
        return this.messages[mid];
    }

    deleteMessage(mid) {

    }
}