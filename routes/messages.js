import HttpStatus from 'http-status'
import MessagesController from '../controllers/messages'

export default (app) => {
  const messagesController = new MessagesController(app.datasource.models.messages)

  app.route('/messages')
    .post((req, res) => {
      messagesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  app.route('/messages/:id')
    .get((req, res) => {
      messagesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })

  app.route('/messages')
    .get((req, res) => {
      if (!req.query.conversationId) {
        res.sendStatus(HttpStatus.BAD_REQUEST)
      }

      messagesController.getByConversationId(req.query.conversationId)
        .then((response) => {
          res.status(response.statusCode)
          res.json(response.data)
        })
    })
}
