const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/E-commerce")
.then(()=>{
    console.log("MongoDB connected")
})
.catch(()=>{
    console.log("Failed to connect")
})

const Loginschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const collection=new mongoose.model("Loginschema",Loginschema)
module.exports=collection