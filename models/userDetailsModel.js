const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
    // user_id :{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:users,
    // },
    rollno:{
        type:String,
        required:true,
    },
    imageurl:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    clas:{
        type:String,
        required:true,
    },
    studentphno:{
        type:String,
        required:true,
    },
    studentemail:{
        type:String,
        required:true,
    },
    parentname:{
        type:String,
        required:true,
    },
    parentphno:{
        type:String,
        required:true,
    },
    parentemail:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("UserData",userDataSchema);