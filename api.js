const express = require('express');
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());

const conStr = "https://192.0.0.1:27017";

// CREATTING A VARIABLE TO STORE DATABASE
let db = getDb();
function getDb(){
	
}
