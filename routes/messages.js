module.exports = function (app, messageData) {
    app.get('/messages', function (req, res) {
        return res.json({
            messages: messageData.getMessages()
        })
    });

    app.get('/message', function (req, res) {
        return res.json({
            messages: messageData.getMessages()
        })
    });

    app.delete('/message', function (req, res) {
        return res.json({
            messages: messageData.getMessages()
        })
    });
}