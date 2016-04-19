var expect = require('chai').expect
var supertest = require('supertest')
var app = require('../app')


describe('User API', () => {
  const api = supertest(app)
  const name = 'Robert';
  const bob = { name, email:'robert@api.gouv.fr'}
  describe('when Bob is in the Db', () => {

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

    describe('when inserting bob again', () => {
      it('returns 400', (done) => {
        const errorMessage = {"message":"User badly created!","errors":["Robert already exists!"]}
        api
          .post('/api/user/')
          .send(bob)
          .expect(400, errorMessage)
          .end(done)
      })
    })
  })
  afterEach((done) =>  {
      const errorMessage = {"error": "user not found"};
      api
        .delete('/api/user/'+ name)
        .expect(404, errorMessage)
        .end(done);
  })

})
