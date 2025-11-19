
const express = require('express')
const app = express() ;
const db = require('./db')
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT=process.env.PORT || 3000
app.use(bodyParser.json()); //store in req.body

// ADD THIS TO DEBUG
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_ATLAS:', process.env.MONGO_ATLAS ? 'EXISTS' : 'NOT FOUND');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem')
const { error } = require('winston');

app.get('/', function (req, res) {
res.send('Welcome to my hotel ... How i can help you ?, we have list of menus')
})

// import route rfiles
const menuRoutes = require('./routes/menuRoutes')
const personRoutes = require('./routes/personRoutes')
app.use('/menu',menuRoutes)
app.use('/person',personRoutes)
app.listen(PORT,() => 
{
    console.log("listening on port 3000");
}
)