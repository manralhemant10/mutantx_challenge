const {dbpool} = require('../config/config.js')
const {DataTypes} = require('sequelize') 
	
const scoreModel = dbpool.define("current_scores", {
	  score_id: {
	  	type: DataTypes.INTEGER,
	  	autoIncrement: true,
	  	primaryKey: true
	  },
	  email: DataTypes.STRING,
	  score: DataTypes.INTEGER
	},
	{
    	timestamps: false
	}
);


module.exports = {
	scoreModel
}
