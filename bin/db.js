var User = require('../models/user.model')

User.sync({force: true})
  .then((result) => {
    console.log(result)
  }, (err) => {
    console.error(err)
  })
