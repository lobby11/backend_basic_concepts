// database connectvitgiy
const mongoose = require('mongoose');
require('dotenv').config();

// defining mongodb connection url
const mongoURL= 'mongodb://localhost:27017/mydb'
// -- u can switch with local host as we have debvvelop multiplkew data tpo collect or by going to mongodb compass 

// const mongoURL = process.env.MONGO_ATLAS
// setup mongodb cpomn'
// require parametewr to esrtablsih connection

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;
// define event listeners for database connection
 db.on('connected',()=>{
    console.log("connected to mongodb server");
 })
 db.on('error',(err)=>{
    console.error("mongodb connection error: ",err);
 })
 db.on('disconnected',()=>{
    console.log("mongodb disconnected");
 })
// export databse connection
module.exports = db;
