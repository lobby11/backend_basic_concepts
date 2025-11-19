// database connectvitgiy
const mongoose = require('mongoose');
// defining mongodb connection url
const mongoURL= 'mongodb://localhost:27017/mydb'
// setup mongodb cpomn
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