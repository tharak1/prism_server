const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    bookid:{
        type:String,
        required:true,
    },
    bookname:{
        type:String,
        required:true,
    },
    bookimageurl:{
        type:String,
        required:true,
    },
    bookdrivelink:{
        type:String,
        required:true,
    },
    bookrating:{
        type:Number,
        required:true,
    },
    bookauthor:{
        type:String,
        required:true,
    },
    bookedition:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    datetaken:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Book",booksSchema);