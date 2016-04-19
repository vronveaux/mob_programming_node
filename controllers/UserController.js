var tmp = require('../models/user.model')
var User = tmp.User;

var UserController = {
    create: function(req, res, next) {

		//var u = User.new(req.body);
		//var errors = User.validate();
		User.create(req.body).then(
			function(user){

				res.status(201).json({ message: 'User created!',name: req.body.name, email: req.body.email });
			},
			function(err) {
				//next(new Error("User badly created!"))
				const errors = err.errors.map(function(el) {
					if (el.message === "email must be unique") {
						return req.body.name + " already exists!";
					}
					return el.message;
				});
				res.status(400).json({ message: 'User badly created!', errors });
			}

		)



    },
    get: function(req, res) {
		User.findOne({ where: {name: req.params.name} })
			.then(function(user) {
				if(user)
					res.json(user);
				else
					res.status(404).json({'error':'user not found'})
			},
			function(error){
				res.status(404).json(error);
			});
	},
    delete: function(req, res) {
			User.findOne({ where: {name: req.params.name} })
				.then(function(user) {
					if (user) {
						return user.destroy();
					}
				})
				.then((destroyed) => {
					res.status(204).json()
				})
    },
    getList: function(req, res) {
      User.findAll().then(
        function(users)
        {
          if (users)
          {

              res.status(200).json(users)

          }
          else {
            res.status(404).json({'error':'users not found'});
          }
        })
    }



}


module.exports = UserController;
