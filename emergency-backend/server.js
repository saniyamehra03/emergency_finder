const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log(err));
const app = express();

app.use (cors());
app.use(express.json());

const emergencyRoutes = require('./routes/emergencyRoutes');
app.use("/",emergencyRoutes);

app.get("/",(req,res)=>{
    res.send("Emergency Backend Running 🚀"); 
});
app.get("/test-overpass", async (req, res) => {
    try {
        const response = await fetch(
            "https://overpass.private.coffee/api/interpreter",
            {
                headers: {
                    "User-Agent": "EmergencyFinder/1.0 (Emergency services finder app)"
                }
            }
        );

        const text = await response.text();

        res.status(response.status).send(text);

    } catch (error) {
        console.error("Test Overpass Error:", error);

        res.status(500).json({
            error: error.message,
            cause: error.cause?.code
        });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});