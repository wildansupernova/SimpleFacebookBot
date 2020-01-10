const processMessage = require('../processes/messages');
const UsersState = require('../data/usersState');
const usersStateData = new UsersState()


module.exports = function (app, messageData) {
   app.get('/webhook', function (req, res) {
      if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
         console.log('webhook verified');
         res.status(200).send(req.query['hub.challenge']);
      } else {
         console.error('verification failed. Token mismatch.');
         res.sendStatus(403);
      }
   });

   app.post('/webhook', function (req, res) {
      //checking for page subscription.
      if (req.body.object === 'page') {
         /* Iterate over each entry, there can be multiple entries 
         if callbacks are batched. */
         req.body.entry.forEach(function (entry) {
            // Iterate over each messaging event
            entry.messaging.forEach(function (event) {
               console.log(event);
               processMessage(event, usersStateData);
               if (event.message && event.message.text && !event.message.is_echo) {
                  messageData.addMessage(event.message.mid, event);
               }
            });
         });
         res.sendStatus(200);
      }
   });
}