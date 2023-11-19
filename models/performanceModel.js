const mongoose = require("mongoose");

const preformanceSchema = mongoose.Schema({
    rollno:{
        type:String,
        required:true,
    },
    mid:{
        type:Number,
        required:true,
    },
    mid_scored:{
        type:Number,
        required:true,
    },
    cgpa:{
        type:Number,
        required:true,
    },
    previous_cgpa:[{
        type:Number,
        required:true,
    }],
    backlogs:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model("Performance",preformanceSchema);