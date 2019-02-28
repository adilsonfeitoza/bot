import HttpStatus from 'http-status'

describe('Routes bots', () => {
  const { bots } = app.datasource.models

  const defaultBot = {
    id: '1',
    name: 'Default Bot',
  }

  beforeEach((done) => {
    bots
      .destroy({ where: {} })
      .then(() => bots.create(defaultBot))
      .then(() => { done() })
  })

  describe('Route GET /bots', () => {
    it('should return a list of bots', (done) => {
      request
        .get('/bots')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBot.id)
          expect(res.body[0].name).to.be.eql(defaultBot.name)

          done(err)
        })
    })
  })

  describe('Route GET /bots/{id}', () => {
    it('should return a Bot', (done) => {
      request
        .get('/bots/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBot.id)
          expect(res.body.name).to.be.eql(defaultBot.name)

          done(err)
        })
    })
  })

  describe('Route POST /bots', () => {
    it('should create a bots', (done) => {
      const newBot = {
        id: 2,
        name: 'New Bot',
      }

      request
        .post('/bots')
        .send(newBot)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBot.id)
          expect(res.body.name).to.be.eql(newBot.name)

          done(err)
        })
    })
  })

  describe('Route PUT /bots/{id}', () => {
    it('should update a bots', (done) => {
      const updatedBot = {
        id: 1,
        name: 'Updated Bot',
      }

      request
        .put('/bots/1')
        .send(updatedBot)
        .end((err, res) => {
          expect(res.body).to.be.eql([1])

          done(err)
        })
    })
  })

  describe('Route DELETE /Bot/{id}', () => {
    it('should delete a Bot', (done) => {
      request
        .delete('/bots/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT)

          done(err)
        })
    })
  })
})
