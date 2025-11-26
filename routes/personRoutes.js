const express = require("express")
// Add at the top of personRoutes.js
   const Person = require('../models/Person');
const { error } = require("winston");
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
const router = express.Router()
// app nhi router ab
router.post('/signup',async(req,res)=>{
    try{
const data = req.body
    // assuming request body contains the person data
    // create anew person document using mongoose model
    const newPerson = new Person(data);
// sv new person to database
const response = await newPerson.save()
console.log("data saved")
const payload = {
    id:response.id,
    username:response.username
}
console.log("payload is :",payload)
const token = generateToken(response.username)
console.log("token is :",token)

 res.status(200).json({response:response,token:token});

}
    
catch(err)
{
console.log(err)
res.status(500).json({error:"internal server error"})
}
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// profile route
router.get('/profile',jwtAuthMiddleware,async(req,res) => {
    try {
        const userData = req.user
        console.log("user data :" ,userData)
        const userId = userData.id
        const user = await Person.findById(userId)
        res.status(200).json({user})
    } catch (err) {
        console.log(err)
res.status(500).json({error:"internal server error"})
    }
})
// get access to all persons

router.get('/',jwtAuthMiddleware,async(req,res) =>{
    try{
        const data = await Person.find()
        console.log("data fetched")
        res.status(200).json(data);

    }
    catch(err){
        
console.log(err)
res.status(500).json({error:"internal server error"})
    }
})

router.get('/:workType',async(req,res)=>{
    try {
    const workType = req.params.workType;
    // extract work type from url parameter
    if(workType == "chef" || workType=="manager"||workType=="waiter"){
    const response = await Person.find({work:workType})
    console.log("response fetched succesfully")
    res.status(200).json(response);
    }
    else{
        res.status(404).json({error:"I  nvalid work type"});
    }
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
  
})
router.put("/:id", async(req,res)=>{
    try {
        // extract id from url prameter
        const personid=req.params.id 
        // updated data for person
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personid,updatePersonData,{
            new:true, //return updated doc
            runValidators:true //run mongoose validaition
        })
        if(!response){
            return res.status(404).json({error:"Person Not Found"})
        }
       console.log("data updated")
       res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal SERVER error"})
    }
})

router.delete("/:id", async(req,res)=>{
    try {
        // extract id from url prameter
        const personid=req.params.id 
        // updated data for person
        const updatePersonData = req.body;
        const response = await Person.findByIdAndDelete(personid)
        if(!response){
            return res.status(404).json({error:"Person Not Found"})
        }
       console.log("data deleted succesfully")
       res.status(200).json({message:"Person delted succesfully "})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal SERVER error"})
    }
})
module.exports=router;