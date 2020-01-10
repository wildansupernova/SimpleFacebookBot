'use strict'
module.exports = class {
    constructor() {
        this.sessions = {};
        // this.sessions = {
        //     senderId: {
        //         state: "",
        //         last_updated: new Date(),
        //         content: {}
        //     }
        // }
    }

    getStateObj(senderId) {
        return this.sessions[senderId];
    }

    setStateObj(senderId, objState) {
        this.sessions[senderId] = objState;
    }
}


