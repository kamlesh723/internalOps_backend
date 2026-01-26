const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    usageCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

module.exports = mongoose.model("Tag",TagSchema)