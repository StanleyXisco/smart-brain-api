const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

// Initialization of th bodypraser to handles all middleware request  between express and interface
app.use(bodyParser.json());

const database = {
	user: [
	{
		id: '123',
		name: 'stanley',
		email: 'gistextra@gmail.com',
		entries: '0',
		password: 'stockbond',
		"date joined" : new Date()
	},
	{
		id: '124',
		name: 'xisco',
		email: 'xiscotech@gmail.com',
		entries: '0',
		password: 'stockover',
		"date joined" : new Date()
	}],
	login: [
		{
			id: '976',
			email: 'gistextra@gmail.com',
			hash: ''
		}
	]
}

// This get request, handles request of the users in the database 
app.get('/', (req,res)=>{
	res.send(database.user);
})

// This is the signin express details for the signin page
app.post('/signin', (req, res)=> {
	if (req.body.email === database.user[0].email 
		&& req.body.password === database.user[0].password){
		res.json("success");
	} else {
		res.status(400).json("Please check the login details");
	}
})

// This is just data to be requested from user from the register section of the page
app.post('/register', (req, res)=> {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
	console.log(hash);
		});
	database.user.push({
		id: '126',
		name: name,
		email: email,
		entries: '0',
		password: password,
		joined: new Date()
	})
	res.json(database.user[database.user.length-1]);
})

app.get('/profile/:id', (req, res) =>{
	const { id } = req.params;
	let found = false;
	database.user.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
		if (!found) {
			res.status(404).send("User does not exist");
		}
	})
})


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

// This is the terminal upon which the express server is running
app.listen(3000, ()=>{
	console.log('This app is running on port 3000');
})

