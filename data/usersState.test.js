describe('Test user state data', () => {
    it('should not give any error to create userState instance', async () => {
        const UsersState = require('./usersState');
        const usersState = new UsersState();
    })

    it('should add 1 user state', async () => {
        const UsersState = require('./usersState');
        const usersState = new UsersState();
        usersState.setStateObj(1,{a:1});
        expect(usersState.getStateObj(1)).toEqual({a:1});
    })
})