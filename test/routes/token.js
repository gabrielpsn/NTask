describe("Routes: Token", () => {
  const Users = app.db.models.Users
  describe("Post / Token", () => {
    beforeEach(done => {
      Users
        .destroy({where: {}})
        .then(() => {
          Users.create({
            name: "Jhon",
            email: "teste@gmail.com",
            password: "12345"
          })
            .then(done())
        })
    })
    describe("Status 200", () => {
      it("return authenticate user token", done => {
        request.post("/token")
          .send({
            email: "teste@gmail.com",
            password: "12345"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys("token")
            done(err)
          })
      })
    })
    describe("Status 401", () => {
      it("throws error when password is incorrect", done => {
        request.post("/token")
          .send({
            email: "jhon@mail.net",
            password: "12345222"
          })
          .expect(401)
          .end((err, res) => {
            done(err)
          })
      })
      it("throws error when email not exist", done => {
        request.post("/token")
          .send({
            email: "jhon2@mail.net",
            password: "123452"
          })
          .expect(401)
          .end((err, res) => {
            done(err)
          })
      })
      it("throws error when email and password are blank", done => {
        request.post("/token")
          .expect(401)
          .end((err, res) => {
            done(err)
          })
      })
    })
  })
})
