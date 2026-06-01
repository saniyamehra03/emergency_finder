const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect("mongodb+srv://admin:admin123@cluster0.i8tzba4.mongodb.net/emergencyDB?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("MongoDB connected successfully"))
.catch((err) => console.log(err));
const app = express();

app.use (cors());
app.use(express.json());

const emergencyRoutes = require('./routes/emergencyRoutes');
app.use("/",emergencyRoutes);

app.get("/",(req,res)=>{
    res.send("Emergency Backend Running 🚀");
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});
