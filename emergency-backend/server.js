const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const app = express();
app.use (cors());
app.use(express.json());

// mongoose.connect("")
app.get('/', (req, res) => {
    res.send("Emergency Backend Running 🚀");
});

let emergencies =[];
app.post("/emergency",(req,res) => {
    const data = req.body;
    emergencies.push(data);
    res.send("Emergency Added ✅");
})

app.get("/emergency", (req, res) => {
    res.json(emergencies);

});
app.put("/emergency/:index",(req,res)=>{
    const index = req.params.index;
    if(emergencies[index]){
        emergencies[index]=req.body;
        res.send("Emergency Updated✏️");
    }else{
        res.send("Data not found❌ ");
    }
});
app.delete("/emergency/:index",(req,res) => {
    const index = req.params.index;
    if(emergencies[index]){
        emergencies.splice(index,1);
        res.send("Emergency Deleted🗑️");
    }else{
        res.send("Data not found❌");
    }
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});
