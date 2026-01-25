const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["draft", "published"],
        default:"draft"
    },
    isActive:{type:Boolean,default:true},
    deletedAt:{type:Date, default:null},
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },// want to track ho deleted
    
},{timestamps:true})

module.exports = mongoose.model("Post",PostSchema)