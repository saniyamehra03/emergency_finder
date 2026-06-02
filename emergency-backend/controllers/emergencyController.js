const Emergency = require("../models/Emergency");
exports.addEmergency = async(req,res) => {
    try {
        const newEmergency =new Emergency(req.body);

        await newEmergency.save();
        res.send("Emergency Added ✅");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
    exports.getEmergencies = async (req,res) => {
        try{
            const data =await Emergency.find();
            res.json(data);
        } catch (error) {
             res.status(500).send(error.message);
        }
    };

    exports.updateEmergency = async(req,res) => {
        try {
            const id = req.params.id;
            await Emergency.findByIdAndUpdate(id, req.body);
            res.send("Emergency Updated✏️");

        }catch (error) {
             res.status(500).send(error.message);
        }
    };
        
    exports.deleteEmergency = async(req,res) => {
        try {
         const id =req.params.id;
            await Emergency.findByIdAndDelete(id);
            res.send("Emergency Deleted🗑️");
        } catch (error) {
            res.status(500).send(error.message);
        }
    };