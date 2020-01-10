# Welcome to SimpleFacebookChatbot

Hi! I'm Wildan 

# Route

**GET /webhook** : webhook verification for facebook messenger bot
**POST /webhook** : webhook for facebook messenger bot message update
**GET /messages**: get all messages that received
**GET /message?mid=[MessageId]**: get message with messageId
**DELETE /message**: delete message with mid in body as messageId

## Setting .env variable

1. Make duplicate of .env.example and change filename of duplicated file to **.env**.
2. Fill your **VERIFY_TOKEN** and your bot **PAGE_ACCESS_TOKEN** application.

## Command

- **npm run start** to run application
- **npm i** to install all dependencies
- **npm run test** to run all test