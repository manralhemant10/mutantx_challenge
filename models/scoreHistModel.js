
const {dbpool} = require('../config/config.js')
const {DataTypes} = require('sequelize') 
	
const scoreHistModel = dbpool.define("track_scores", {
	 score_id:{
		type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
	  email: DataTypes.STRING,
	  score: DataTypes.INTEGER,
	  _rank: DataTypes.INTEGER
	 
}, {
    	timestamps: false
	  });


module.exports = {
	scoreHistModel
}
