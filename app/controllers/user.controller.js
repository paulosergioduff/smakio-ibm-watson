const db = require('../config/db.config.js');
const gravandoAudio = require('../watson/watson-app.js');

const User = db.user;
 
 
// Save FormData - User to MySQL
exports.save = (req, res) => {
	console.log('Post a Customer: ' + JSON.stringify(req.body));
	let autorData = new Date().getTime();;
	User.create({
		firstname: autorData,//req.body.firstname,
		lastname: req.body.lastname,
	},{
		attributes: {include: ['firstname', 'lastname']}
	}).then(user => {
		//console.log("Saida1: "+req.body.firstname);
		//initVoz(req.body.lastname, req.body.firstname);
		let comentario = req.body.lastname
		let autor = autorData
		gravandoAudio(comentario, autor);
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