const dotenv = require('dotenv')
dotenv.config();

const { Sequelize } = require('sequelize');
// const dbpool = mysql.createPool({
// 	connectionLimit:4,
// 	host: process.env.dbhost,
// 	user: process.env.dbuser,
// 	password: process.env.dbpassword,
// 	database: process.env.dbname
// })
const dbpool = new Sequelize(process.env.dbname,  process.env.dbuser,  process.env.dbpassword, {
  host:  process.env.dbhost,
  dialect: 'mysql',
  pool:{
  	max:4
  },
  logging: false
});
module.exports={
	PORT: process.env.PORT,
	dbpool,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}