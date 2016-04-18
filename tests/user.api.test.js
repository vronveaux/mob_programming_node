var expect = require('chai').expect
var supertest = require('supertest')
var app = require('../app')


describe('User API', () => {
  const api = supertest(app)
  describe('when Bob is in the Db', () => {
    const name = 'Robert';
    const bob = { name, email:'robert@api.gouv.fr'}

    beforeEach((done) => {
      api
        .post('/api/user')
        .send(bob)
        .expect(201, done)
    })

    afterEach((done) => {
      api
        .delete('/api/user/'+ name)
        .expect(204, done)
    })


    describe('when getting bob', () => {
      it('returns bob', (done) => {
        api
          .get('/api/user/' + name)
          .expect(200, done)
      })
    })

    describe('when getting Jean', () => {
      it('returns 404', (done) => {
        api
          .get('/api/user/Jean')
          .expect(404, done)
      })
    })
  })
})
