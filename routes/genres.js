module.exports = app => {
  const Genres = app.db.models.Genres
  app.route("/genres")
    .all(app.auth.authenticate())
    .get((req, res) => {
      Genres.findAll({})
        .then(result =>
          res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .post((req, res) => {
      Genres.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })

  app.route("/genres/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      Genres.findOne({where: {id: req.params.id, user_id: req.user.id}})
        .then(result => {
          if (result) {
            res.json(result)
          } else {
            res.sendStatus(404)
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .put((req, res) => {
      Genres.update(req.body, {where: {id: req.params.id, user_id: req.user.id}})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .delete((req, res) => {
      Genres.destroy({where: {id: req.params.id, user_id: req.user.id}})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
}
