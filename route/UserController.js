var Sequelize  = require('sequelize'); 

var sequelize = new Sequelize('mysql://root:@localhost:3306/cpa');

	var User = sequelize.define('users', 
	{
	    name: {
			type: Sequelize.STRING,
			validate: {
				len: [5,42]
			}
	    },
	    email: {
			type: Sequelize.STRING,
			unique: true,
			validate: {
				isEmail: true
			}
	    }
	}, 
	{
	    instanceMethods: {
			toJSON: function () {
				var values = this.get();
				
				values.id = undefined;
				values.createdAt = undefined;
				values.updatedAt = undefined;
				return values;
			}
	    },
	    freezeTableName: true // Model tableName will be the same as the model name
	});

var UserController = {
    create: function(req, res) {

		//var u = User.new(req.body);
		//var errors = User.validate();
		User.create(req.body).then(
			function(user){
				
				res.status(201).json({ message: 'User created!',name: req.body.name, email: req.body.email });
			},
			function(err){
				
				res.status(400).json({ message: 'User badly created!', errors: err.errors.map(function(el, index) {return index + ': ' + el.message}) });
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
		User.findOne({ where: {name: req.body.name} }).then(function(user) {
			if (user)
			{
			res.json({name: user.name});
			user.destroy();
			}
			else
			res.json({name: 'null'});
		});
    }
    
    
	
}
    

module.exports = UserController;
