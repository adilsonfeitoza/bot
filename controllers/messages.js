import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
})

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode)

class MessagesController {
  constructor(Messages) {
    this.Messages = Messages
  }

  getAll() {
    return this.Messages.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }

  getById(params) {
    return this.Messages.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }
  getByConversationId(conversationId) {
    return this.Messages.findAll({ where: { conversationId } })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }

  create(data) {
    return this.Messages.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }
}

export default MessagesController
