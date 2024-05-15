const express = require('express');
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());

const conStr = "mongodb+srv://adithyamanikumar:bugs1234@cluster0.wem7prh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
		console.log('Getting Users');
		res.send(data);
		res.end();
	});
})

// ADDS A NEW USER
app.post('/add-user/', (req, res) => {
	const user = {
		fullname: req.body.fullname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	}
	db.collection('users').insertOne(user);
	res.end();
})

// CHECKS TO SEE IF USERNAME IS ALREADY TAKEN
app.get('/check-user/:username', (req, res) => {
	db.collection('users').find({username: req.params.username}).toArray().then(data => {
		res.send(data[0]);
		res.end();
	})
})
 
// GETS ADMIN DETAILS
app.get('/get-admin', (req, res) => {
	console.log('Getting Admin Details');
	db.collection('admin').find({}).toArray().then(data => {
		res.send(data[0]);
		res.end();
	});
})

// GETS ALL VIDEOS
app.get('/get-videos', (req, res) => {
	console.log('Getting All Videos');
	db.collection('videos').find({}).toArray().then(data => {
		res.send(data);
		res.end();
	});
})

// GETS A PARTICULAR VIDEO ACCORDING TO ID
app.get('/get-video/:id', (req, res) => {
	const id = parseInt(req.params.id);
	db.collection('videos').find({id}).toArray().then(data => {
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

app.post('/add-category', (req, res) => {
    let count = 1;
    let categoryId;
    db.collection('categories').find({}).toArray().then(data => {
       function checkIfExists(count){
            if(data.find(item => item.id === count)){
                return checkIfExists(count+1);            
            } else {
                return count;
            }
        }
        categoryId = checkIfExists(count)
    })
    
    const category = req.body.new_category.toLowerCase().replaceAll(' ', '');
    const newCategory = {
        id: categoryId,
        category,
        name: req.body.new_category
    }
    db.collection('categories').insertOne(newCategory).then(() => {
        console.log('New Category Added')
    })
})

app.post('/add-video', (req, res) => {
	const URL = req.body.url.slice(url.indexOf("v=")+2)
	let vidDetails = {
	    title: req.body.title,
	    description: req.body.description,
	    category: req.body.category,
		videoCode: URL
	}
	db.collection('videos').insertOne(vidDetails)
})


