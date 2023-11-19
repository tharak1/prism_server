const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    rollno:{
        type:String,
        required:true,
    },
    present_day:{
        type:Number,
        required:true,
    },
    total_classes:{
        type:Number,
        required:true,
    },
    total_atended_classes:{
        type:Number,
        required:true,
    },
    monthly_classes:{
        type:Number,
        required:true,
    },
    monthly_attended_classes:{
        type:Number,
        required:true,
    },
});

module.exports = mongoose.model("Attendance",attendanceSchema);