import * as user from '../user'


describe("user handler", () => {
  it("create new user", async () => {
    const req = { body: { username: 'hello', password: 'hi' } }
    const res = {
      json({ token }) {
        expect(token).toBeTruthy()
      }
    }
    await user.createNewUser(req, res, () => { })
  })

})