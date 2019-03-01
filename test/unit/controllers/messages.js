import HttpStatus from 'http-status'
import MessagesController from '../../../controllers/messages'

describe('Controllers: Messages', () => {
  describe('Get all messages: getAll()', () => {
    it('should return a list of messages', () => {
      const messages = {
        findAll: td.function(),
      }

      const expectedResponse = [{
        id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
        timestamp: '2018-11-16T23:30:52.6917722Z',
        from: '36b9f842-ee97-11e8-9443-0242ac120002',
        to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        text: 'Oi! Como posso te ajudar?',
      }]

      td.when(messages.findAll({})).thenResolve(expectedResponse)

      const messagesController = new MessagesController(messages)
      return messagesController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('Get a message: getById()', () => {
    it('should return a message', () => {
      const messages = {
        findOne: td.function(),
      }

      const expectedResponse = {
        id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
        timestamp: '2018-11-16T23:30:52.6917722Z',
        from: '36b9f842-ee97-11e8-9443-0242ac120002',
        to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        text: 'Oi! Como posso te ajudar?',
      }

      td.when(messages.findOne({ where: { id: 1 } })).thenResolve(expectedResponse)

      const messagesController = new MessagesController(messages)
      return messagesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('Get a message: getByConversationId()', () => {
    it('should return a message', () => {
      const messages = {
        findAll: td.function(),
      }

      const expectedResponse = [{
        id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
        timestamp: '2018-11-16T23:30:52.6917722Z',
        from: '36b9f842-ee97-11e8-9443-0242ac120002',
        to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        text: 'Oi! Como posso te ajudar?',
      }]

      td.when(messages.findAll({ where: { conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1' } })).thenResolve(expectedResponse)

      const messagesController = new MessagesController(messages)
      return messagesController.getByConversationId(expectedResponse[0].conversationId)
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('Create a message: create()', () => {
    it('should create a message', () => {
      const messages = {
        create: td.function(),
      }

      const resquestBody = {
        id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
        timestamp: '2018-11-16T23:30:52.6917722Z',
        from: '36b9f842-ee97-11e8-9443-0242ac120002',
        to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
        text: 'Oi! Como posso te ajudar?',
      }

      td.when(messages.create(resquestBody)).thenResolve(resquestBody)

      const messagesController = new MessagesController(messages)
      return messagesController.create(resquestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED)
          expect(response.data).to.be.eql(resquestBody)
        })
    })
  })
})
