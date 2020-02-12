const jwt = require("jwt-simple")

describe("Routes: Tasks", () => {
  const Users = app.db.models.Users
  const Tasks = app.db.models.Tasks
  const jwtSecret = app.libs.config.jwtSecret

  let token
  let fakeTask

  beforeEach(done => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        name: "Jhon",
        email: "teste@gmail.com",
        password: "12345"
      }))
      .then(user => {
        Tasks
          .destroy({where: {}})
          .then(() => Tasks.bulkCreate([
          {
            id: 1,
            title: "work",
            user_id: user.id
          },{
            id: 2,
            title: "Study",
            user_id: user.id
          }
          ]))
          .then(tasks => {
            fakeTask = tasks[0]
            token = jwt.encode({id: user.id}, jwtSecret)
            done()
          })
      })
  })
  describe("GET / Tasks", () => {
    describe("status 200", () => {
      it("returns a list of tasks", done => {
        request.get("/tasks")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2)
            expect(res.body[0].title).to.eql("work")
            expect(res.body[1].title).to.eql("Study")
            done(err)
          })
      })
    })
  })
  describe("POST / Taks", () => {
    describe("status 200", () => {
      it("create a new taks", done => {
        request.post("/tasks")
          .set("Authorization", `JWT ${token}`)
          .send({title: "Run"})
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("Run")
            expect(res.body.done).to.be.false
            done(err)
          })
      })
    })
  })
  describe("GET / Taks/:id", () => {
    describe("status 200", () => {
      it("returns one taks", done => {
        request.get(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("work")
            done(err)
          })
      })
    })
    describe("status 404", () => {
      it("throws error when task not exist", done => {
        request.get("/tasks/0")
          .set("Authorization", `JWT ${token}`)
          .expect(404)
          .end((err, res) => done(err))
      })
    })
  })
  describe("PUT / Taks / :id", () => {
    describe("status 204", () => {
      it("update a task", done => {
        request.put(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .send({title: "Travel", done: true})
          .end((err, res) => done(err))
      })
    })
  })
  describe("DELETE / Taks / :id", () => {
    describe("status 204", () => {
      it("remove a task", done => {
        request.delete(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err))
      })
    })
  })
})
