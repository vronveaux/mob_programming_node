var expect = require('chai').expect


function helloWorld(name) {
  return 'Hello world ' + name
}

describe("using the function helloworld", function() {
  var name
  describe('sachant que je m\'appelle Thibaut', () => {
    beforeEach(function() {
      name= 'Thibaut';
    })
    it('return hello world with the name', function() {
      expect(helloWorld(name)).to.equal("Hello world Thibaut")
    })
  })

})
