const express = require("express")
// Add at the top of personRoutes.js
   const Person = require('../models/Person');
const { error } = require("winston");
const router = express.Router()
// app nhi router ab
router.post('/',async(req,res)=>{
    try{
const data = req.body
    // assuming request body contains the person data
    // create anew person document using mongoose model
    const newPerson = new Person(data);
// sv new person to database
const response = await newPerson.save()
console.log("data saved")
 res.status(200).json(response);

}
    
catch(err)
{
console.log(err)
res.status(500).json({error:"internal server error"})
}
})
router.get('/',async(req,res) =>{
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