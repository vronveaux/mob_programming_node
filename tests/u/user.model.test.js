var expect = require('chai').expect
var User = require('../../models/user.model')


describe('User model', () => {

  it('can save a user into the db', (done) => {
    const userAttributes = {name: "Robert",email: "test@test.com"}

    User.create(userAttributes).then((obj) => {
      expect(obj.name).to.equal('Roberkt')

      done();
    }, (err) => {
      done();
    })

  })

})