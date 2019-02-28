import BotsController from '../controllers/bots'

export default (app) => {
  const botsController = new BotsController(app.datasource.models.bots)

  app.route('/bots')
    .get((req, res) => {
      botsController.getAll()
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .post((req, res) => {
      botsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  app.route('/bots/:id')
    .get((req, res) => {
      botsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
    .put((req, res) => {
      botsController.update(req.body, req.params).then((response) => {
        res.status(response.statusCode)
        res.json(response.data)
      })
    })
    .delete((req, res) => {
      botsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode)
        })
    })
}
