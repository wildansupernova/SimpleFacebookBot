describe('Test message data', () => {
    it('should not give any error to create MessageData class', async () => {
        const Messages = require('./messageData');
        const messageData = new Messages();
    })
    it('should add 1 message obj', async () => {
        const Messages = require('./messageData');
        const messageData = new Messages();
        messageData.addMessage(1, { a: 1 });
        expect(messageData.messages).toEqual({
            1: {
                a: 1
            }
        })
    })
    it('should delete 1 message obj', async () => {
        const Messages = require('./messageData');
        const messageData = new Messages();
        messageData.addMessage(1, { a: 1 });
        messageData.deleteMessage(1);
        expect(messageData.messages).toEqual({});
    })

    it('get message with id', async () => {
        const Messages = require('./messageData');
        const messageData = new Messages();
        messageData.addMessage(1, { a: 1 });
        expect(messageData.getMessage(1)).toEqual({
            a: 1
        });
    })

    it('get messages', async () => {
        const Messages = require('./messageData');
        const messageData = new Messages();
        messageData.addMessage(1, { a: 1 });
        messageData.addMessage(2, { a: 2 });
        expect(messageData.getMessages()).toEqual([{a: 1}, {a: 2}]);
    })
})