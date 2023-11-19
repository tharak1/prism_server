const express = require("express");
const connectDB = require("./config/databaseConnection");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 3000
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/userdata",require("./routes/userDataRoutes"));
app.use("/api/books",require("./routes/booksRoutes"));
app.use("/api/parent",require("./routes/parentRoutes"));
app.use("/api/attendance",require("./routes/attendanceRoutes"));
app.use("/api/performance",require("./routes/performanceRoutes"));
app.use("/api/buses",require("./routes/transportRoutes"));
app.use("/api/library",require("./routes/LibraryRoutes")),
app.use("/api/sendmessage",require("./routes/sendMessages"));

app.listen(port,"0.0.0.0",()=>{
    console.log("server is live at 5000");  
});