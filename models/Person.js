const mongoose = require('mongoose');
// defining person schema
const bcrypt =require('bcrypt')
const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});
// createw person model
personSchema.pre('save',async function (next) {
const person = this
// this reperesents jb bhi hm save krna chah rhenge honger to premiddkleware perform hoga

// hash the password only if it is modified (or is new)

if(!person.isModified('password')) return next()
    try {
        // hash password generation
const salt = await bcrypt.genSalt(10)
// hash password
const hashedpassword = await bcrypt.hash(person.password,salt)
// overide plain password with hashed one 
person.password = hashedpassword
      next()
} catch (err) {
   return next(err) 
}
})
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch  
    } catch (err) {
        throw err
    }
}
// prince -- > bdbebuebjebe7y38eh3jbeu3heb3
// login --- > agarwak

// bdbebuebjebe7y38eh3jbeu3heb3 -- > extract salt
// salt+agarwak -- > hash -- > svwsnwkmskwmswbshwvdhwjdnbe
const Person = mongoose.model('Person',personSchema);
module.exports=Person;