module.exports = function (app, messageData) {
    app.get('/messages', function (req, res) {
        return res.json({
            messages: messageData.getMessages()
        })
    });

    app.get('/message', function (req, res) {
        return res.json({
            message: messageData.getMessages(req.query.mid)
        })
    });

    app.delete('/message', function (req, res) {
        return res.json({
            deletedMessage: messageData.deleteMessage(req.body.mid)
        })
    });
}