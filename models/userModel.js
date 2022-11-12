const {dbpool} = require('../config/config.js')
const {DataTypes} = require('Sequelize') 
	
const userModel = dbpool.define("user", {
	  email: DataTypes.STRING,
	  password: DataTypes.STRING
	});


module.exports = userModel