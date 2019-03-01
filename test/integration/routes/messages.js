describe('Routes: messages', () => {
  const {
    messages,
  } = app.datasource.models

  const defaultMessage = {
    conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
    timestamp: '2018-11-16T23:30:52.6917722Z',
    from: '36b9f842-ee97-11e8-9443-0242ac120002',
    to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
    text: 'Oi! Como posso te ajudar?',
  }

  beforeEach((done) => {
    messages
      .destroy({
        where: {},
      })
      .then(() => messages.create(defaultMessage))
      .then(() => { done() })
  })

  describe('GET /messages?conversationId', () => {
    it('should return a list of messages', (done) => {
      request
        .get(`/messages?conversationId=${defaultMessage.conversationId}`)
        .end((err, res) => {
          expect(res.body[0].id).to.eql(defaultMessage.to)
          expect(res.body[0].conversationId).to.eql(defaultMessage.conversationId)
          expect(res.body[0].from).to.eql(defaultMessage.from)
          expect(res.body[0].to).to.eql(defaultMessage.to)
          expect(res.body[0].text).to.eql(defaultMessage.text)
          done(err)
        })
    })
  })

  describe('GET /messages/{id}', () => {
    it('should return a Message by id', (done) => {
      request
        .get(`/messages/${defaultMessage.to}`)
        .end((err, res) => {
          expect(res.body.id).to.eql(defaultMessage.to)
          expect(res.body.conversationId).to.eql(defaultMessage.conversationId)
          expect(res.body.from).to.eql(defaultMessage.from)
          expect(res.body.to).to.eql(defaultMessage.to)
          expect(res.body.text).to.eql(defaultMessage.text)
          done(err)
        })
    })
  })

  describe('POST /messages', () => {
    it('should post a Message', (done) => {
      const message = {
        id: 2,
        conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
        timestamp: '2018-11-16T23:30:57.5926721Z',
        from: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        to: '36b9f842-ee97-11e8-9443-0242ac120002',
        text: 'Gostaria de saber meu saldo?',
      }

      request
        .post('/messages')
        .send(message)
        .end((err, res) => {
          expect(res.body.id).to.eql(message.id)
          expect(res.body.conversationId).to.eql(message.conversationId)
          expect(res.body.from).to.eql(message.from)
          expect(res.body.to).to.eql(message.to)
          expect(res.body.text).to.eql(message.text)
          done(err)
        })
    })
  })
})
