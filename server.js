
const express = require('express')
const app = express() ;
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //store in req.body

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
app.listen(3000,() => 
{
    console.log("listening on port 3000");
}
)