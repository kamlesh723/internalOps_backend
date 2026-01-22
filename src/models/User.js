const mongosee = require("mongoose");

const userSchema = new mongosee.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:
    {
        type:String,
        enum:["user","moderator", "admin"],
        default:"user",
    },
    isActive:{type:Boolean, default:true},
    deletedAt:{type:Date, default:null},
},
     {timestamps:true}
);

module.exports = mongosee.model("User", userSchema);