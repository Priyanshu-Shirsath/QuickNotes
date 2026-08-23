require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const userRoutes= require("./routes/userRoutes")
const noteRoutes = require("./routes/noteRoutes");

app.use("/api/users",userRoutes);
app.use("/api/notes", noteRoutes);

app.get("/",(req,res)=>{
    res.send("welcome to quicknotes...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});