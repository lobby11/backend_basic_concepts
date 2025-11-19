const express = require("express")
// Add at the top of personRoutes.js
   const MenuItem = require('../models/MenuItem');
const router = express.Router()
// comment 
router.post('/',async(req,res)=>{
    try{
const data = req.body
    // assuming request body contains the person data
    // create anew person document using mongoose model
    const newMenu = new MenuItem(data);
// sv new person to database
const response = await newMenu.save()
console.log("data saved")
 res.status(200).json(response);

}
    
catch(err)
{
console.log(err)
res.status(500).json({error:"internal server error"})
}
})
// get method to find the person

router.get('/',async(req,res) =>{
    try{
        const data = await MenuItem.find()
        console.log("data fetched")
        res.status(200).json(data);

    }
    catch(err){
        
console.log(err)
res.status(500).json({error:"internal server error"})
    }
})

router.get('/:tasteType',async(req,res)=>{
    try {
    const tasteType = req.params.tasteType;
    // extract work type from url parameter
    if(tasteType == "Spicy" || tasteType=="Sweet"||tasteType=="Sour"){
    const response = await MenuItem.find({taste:tasteType})
    console.log("TASTE response fetched succesfully")
    res.status(200).json(response);
    }
    else{
        res.status(404).json({error:"Invalid TASTE type"});
    }
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
  
})

router.put("/:id", async(req,res)=>{
    try {
        // extract id from url prameter
        const menuid=req.params.id 
        // updated data for person
        const updateMenuData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuid,updateMenuData,{
            new:true, //return updated doc
            runValidators:true //run mongoose validaition
        })
        if(!response){
            return res.status(404).json({error:" Not Found IN menu"})
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
        const menuid=req.params.id 
        // updated data for person
        const updateMenuData = req.body;
        const response = await MenuItem.findByIdAndDelete(menuid)
        if(!response){
            return res.status(404).json({error:"Menu  Not Found to delete"})
        }
       console.log("Menu data  deleted succesfully")
       res.status(200).json({message:"Menu delted succesfully "})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal SERVER error"})
    }
})

module.exports=router;