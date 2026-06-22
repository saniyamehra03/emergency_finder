const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect("mongodb+srv://saniyafinder_emergency4:Emergency123@cluster0.uut00t6.mongodb.net/emergencyfinder?retryWrites=true&w=majority")
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
