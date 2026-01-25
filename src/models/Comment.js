const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    deletedAt:{
        type:Date,
        default:null
    },
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
},{timestamps:true});

module.exports = mongoose.model("Comment",CommentSchema);