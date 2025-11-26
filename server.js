
const express = require('express')
const app = express() ;
const db = require('./db')
const passport = require('./auth')
// // username and passport strategy
// const LocalStrategy = require('passport-local').Strategy
// const Person = require('./models/Person')
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT=process.env.PORT || 3000

app.use(bodyParser.json()); //store in req.body
// middleware function
const logrequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} Request made to : ${req.originalUrl}`)
     next() 
    //move on next phase - agre tum next htao middleware lgane ke bad bhi request jatyegi timing aYEGA BUT RESPONSE NHI AYEGA LOAFDING 

}

// ADD THIS TO DEBUG
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_ATLAS:', process.env.MONGO_ATLAS ? 'EXISTS' : 'NOT FOUND');
// const Person = require('./models/Person');
// const MenuItem = require('./models/MenuItem')
// const { error } = require('winston');

// m-1  ki tumn sb me sath  me lgao
app.use(logrequest)
// USE THIS  MIDDLEWARE EVERYWHERE IN EXPRESS
// m-2 jb koiu / ko hit krega localhost ke a sath to ye print krao
// app.get('/', logrequest,function (req, res) {

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/', function (req, res) {
res.send('Welcome to my hotel ... How i can help you ?, we have list of menus')
})

// import route rfiles
const menuRoutes = require('./routes/menuRoutes')
const personRoutes = require('./routes/personRoutes')
app.use('/menu',menuRoutes)

// m-3 
// app.use('/person',logrequest,personRoutes)
app.use('/person',personRoutes)

app.listen(PORT,() => 
{
    console.log("listening on port 3000");
}
) 