const express = require('express');
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());

const conStr = "mongodb://127.0.0.1:27017/";

// CREATTING A VARIABLE TO STORE DATABASE
let db = getDb();
function getDb(){
	mongoClient.connect(conStr).then(clientObj => {
		db = clientObj.db('vidLib');
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`SERVER STARTED ON PORT NO. ${PORT}`)

// HOME PAGE
app.get('/', (req, res) => {
	res.end('<h1>HELLO WORLD!</h1>');
})

// GETS ALL USERS
app.get('/get-users', (req, res) => {
	db.collection('users').find({}).toArray().then(data => {
		res.send(data);
		res.end();
	});
})

// GETS ADMIN DETAILS
app.get('/get-admin', (req, res) => {
	db.collection('admin').find({}).toArray().then(data => {
		res.send(data[0]);
		res.end();
	});
})

// GETS ALL VIDEOS
app.get('/get-videos', (req, res) => {
	db.collection('videos').find({}).toArray().then(data => {
		res.send(data);
		res.end();
	});
})

// GETS A PARTICULAR VIDEO ACCORDING TO ID
app.get('/get-video/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db.collection('videos').find({id: id}).toArray().then(data => {
		res.send(data[0]);
		res.end();
	});
})

// GETS ALL THE CATEGORIES
app.get('/categories', (req, res) => {
	db.collection('categories').find({}).toArray().then(data => {
		res.send(data);
		res.end();
	});
})

app.post('/add-video', (req, res) => {
	const URL = req.body.url
// https://www.youtube.com/watch?v=LKkzh1pXnHk
// https://www.youtube.com/embed/LKkzh1pXnHk?si=m_zrbtgQx_H2eI3l
})

