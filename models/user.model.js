var Sequelize  = require('sequelize');

var sequelize = new Sequelize('cpa', '', '', {
  dialect: 'sqlite',
  storage: 'db/cpa.sqlite3'
});

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

				delete values.id;
				delete values.createdAt;
				delete values.updatedAt ;
				return values;
			}
	    },
	    freezeTableName: true // Model tableName will be the same as the model name
	});


module.exports = User
