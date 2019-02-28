describe('Routes messages', () => {
  const { messages } = app.datasource.models
  const defaultMessage = {
    id: 1,
    conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
    timestamp: '2018-11-16T23:30:52.6917722Z',
    from: '36b9f842-ee97-11e8-9443-0242ac120002',
    to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
    text: 'Oi! Como posso te ajudar?',
  }

  beforeEach((done) => {
    messages
      .destroy({ where: {} })
      .then(() => messages.create(defaultMessage))
      .then(() => { done() })
  })

  describe('Route GET /messages?conversationId', () => {
    it('should return a list of messages', (done) => {
      const messagesList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        conversationId: Joi.string(),
        timestamp: Joi.date(),
        from: Joi.string(),
        to: Joi.string(),
        text: Joi.string(),
      }))

      request
        .get(`/messages?conversationId=${defaultMessage.conversationId}`)
        .end((err, res) => {
          joiAssert(res.body, messagesList)
          done(err)
        })
    })
  })

  describe('Route GET /messages/{id}', () => {
    it('should return a Message', (done) => {
      const Message = Joi.object().keys({
        id: Joi.number(),
        conversationId: Joi.string(),
        timestamp: Joi.date(),
        from: Joi.string(),
        to: Joi.string(),
        text: Joi.string(),
      })

      request
        .get('/messages/1')
        .end((err, res) => {
          joiAssert(res.body, Message)
          done(err)
        })
    })
  })

  describe('Route POST /messages', () => {
    it('should create a Message', (done) => {
      const newMessage = {
        id: 2,
        conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
        timestamp: '2018-11-16T23:30:57.5926721Z',
        from: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        to: '36b9f842-ee97-11e8-9443-0242ac120002',
        text: 'Gostaria de saber meu saldo?',
      }

      const Message = Joi.object().keys({
        id: Joi.number(),
        conversationId: Joi.string(),
        timestamp: Joi.date(),
        from: Joi.string(),
        to: Joi.string(),
        text: Joi.string(),
      })

      request
        .post('/messages')
        .send(newMessage)
        .end((err, res) => {
          joiAssert(res.body, Message)
          done(err)
        })
    })
  })
})
