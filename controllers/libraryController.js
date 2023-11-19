const asyncHandler = require("express-async-handler");
const Library = require("../models/libraryModel");
const Book = require("../models/booksModel");

const createLibrary = asyncHandler(async(req,res)=>{
    const lib = await Library.create(req.body);
    res.status(200).json(lib);
});

const booksget = asyncHandler(async(req,res)=>{
    const currentUser = await Library.findOne({rollno:req.user.roolno});
    let finalBooksObj = [];
    for(let i = 0;i<currentUser.booksTaken.length;i++){
        const book = await Book.findOne({bookid:currentUser.booksTaken[i]});
        finalBooksObj.push(book);
    }
    res.status(200).json(finalBooksObj);
});

const getLib = asyncHandler(async(req,res)=>{
    const currentUser = await Library.findOne({rollno:req.user.roolno});
    res.status(200).json(currentUser);
})

module.exports = {createLibrary,booksget,getLib};
