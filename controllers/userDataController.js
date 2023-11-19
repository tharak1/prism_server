const asyncHandler = require("express-async-handler");
const UserData = require("../models/userDetailsModel");

const getUserData = asyncHandler(async(req,res)=>{
    const currentUser = await UserData.findOne({rollno : req.user.roolno});
    res.json(currentUser);
});

const getallUserData = asyncHandler(async(req,res)=>{
    const currentUser = await UserData.find();
    res.json(currentUser);
});

const getAllUsersDataAsSection = asyncHandler(async(req,res)=>{
    let filter = {};
    if(req.query.clas){
        filter = {clas:req.query.clas};
    }
    const currentUsers = await UserData.find(filter);
    console.log(filter);
    res.json(currentUsers);
});

const createUserData = asyncHandler(async(req,res)=>{
    const {rollno,imageurl,name,branch,clas,studentphno,studentemail,parentname,parentphno,parentemail} = req.body;
    const newUserDetails =await UserData.create({rollno,imageurl,name,branch,clas,studentphno,studentemail,parentname,parentphno,parentemail});
    res.status(200).json(newUserDetails);
});

const deleteUserData = asyncHandler(async(req,res)=>{
    const deletedUser = await UserData.findByIdAndRemove(req.params.id);
    res.status(200).json({dUser:deletedUser,message:"succes"});
});

const deleteAllUsersData = asyncHandler(async(req,res)=>{
    await UserData.deleteMany();
    res.status(200).json({message:"success"});
});

const validateUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports = {getUserData,createUserData,deleteAllUsersData,deleteUserData,getallUserData,validateUser,getAllUsersDataAsSection};