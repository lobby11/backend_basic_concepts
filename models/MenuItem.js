const mongoose = require('mongoose')
const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
    required:true 
},
price:{
    type:Number
},
taste:{
    type:String,
    enum:['Spicy','Sweet','Sour'],
    required:true
},
is_drink:{
    type:Boolean,
    default:false 
     //client ne kluch nhi bheja to false ho jayega
},
ingredients:{
    type:[String],
    enum:["chicken wings", "spices", "sauce"],
    default:[]
},
num_sales:{
    type:Number
}
})
const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem