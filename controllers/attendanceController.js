const asyncHandler = require("express-async-handler");
const attenn = require("../models/attendanceModel");

const createAttendance = asyncHandler(async(req,res)=>{
    const {monthly_attended_classes,monthly_classes,total_atended_classes,total_classes,present_day,rollno} = req.body;
    const atten = await attenn.create({monthly_attended_classes,monthly_classes,total_atended_classes,total_classes,present_day,rollno});
    res.status(200).json(atten);
});

const getAttendance = asyncHandler(async(req,res)=>{
    const userAtten = await attenn.findOne({rollno:req.user.roolno});
    res.status(200).json(userAtten);
});

// const updateAttendance = asyncHandler(async(req,res)=>{
//     const updated = await Attendance.findOneAndUpdate(,req.body)
// });

module.exports = {createAttendance,getAttendance};