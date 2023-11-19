const asyncHandler = require("express-async-handler");
const Performance = require("../models/performanceModel");

const createPerformance = asyncHandler(async(req,res)=>{
    const {backlogs,previous_cgpa,cgpa,mid_scored,mid,rollno} = req.body;
    const per = await Performance.create({backlogs,previous_cgpa,cgpa,mid_scored,mid,rollno});
    res.status(200).json(per);
});

const getPerformance = asyncHandler(async(req,res)=>{
    const userPer = await Performance.findOne({rollno:req.user.roolno});
    res.status(200).json(userPer);
});

module.exports = {createPerformance,getPerformance};