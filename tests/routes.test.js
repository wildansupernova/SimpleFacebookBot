const request = require('supertest')
const app = require('../server')
describe('Webhook Endpoints', () => {
    it('should return 200 and equal hub.challenge', async () => {
        const res = await request(app)
            .get('/webhook?hub.mode=subscribe&hub.challenge=1901243103&hub.verify_token=TEST_ENV')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual('1901243103')
    })
})