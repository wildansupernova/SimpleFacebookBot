'use strict'
module.exports = class {
    constructor() {
        console.log("Init user state cache");
        this.sessions
        // this.sessions = {
        //     senderId: {
        //         state: "",
        //         time: new Date()
        //     }
        // }
    }

    cleanExpiredCache() {
    }

    getStateObj(senderId){
        return this.sessions[senderId];
    }
}


