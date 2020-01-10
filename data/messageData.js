'use strict'
module.exports = class {
    constructor() {
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
        const message = this.messages[mid];
        delete this.messages[mid];
        return message;
    }
}