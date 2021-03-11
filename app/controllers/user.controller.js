const db = require('../config/db.config.js');
const User = db.user;
require("dotenv").config();

 
// Save FormData - User to MySQL
exports.save = (req, res) => {
	console.log('Post a Customer: ' + JSON.stringify(req.body));
	
	User.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	},{
		attributes: {include: ['firstname', 'lastname']}
	}).then(user => {
		//console.log(process.env.HELLO_V);
		res.send(user);
	})
};
 
// Fetch all Users
exports.findAll = (req, res) => {
	console.log("Get All Customers");
	User.findAll({
		attributes: ['id', 'firstname', 'lastname']
	}).then(users => {
	   res.send(users);
	});
};