const {dbpool} = require('../config/config.js')
const {DataTypes} = require('sequelize') 
	
const userModel = dbpool.define("user", {
	  email: DataTypes.STRING,
	  password: DataTypes.STRING
	});


module.exports = userModel