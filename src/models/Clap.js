const mongoose = require("mongoose");

const ClapSchema = new mongoose.Schema({
    post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:true
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    count:{
        type:Number,
        default:0,
        min:0,
        max:50
    }
    
},{timestamps:true});

ClapSchema.index({post:1, user:1},{unique:true});// mean can't do duplicate clap on same post by same user

module.exports = mongoose.model("Clap",ClapSchema)