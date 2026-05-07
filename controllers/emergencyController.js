let emergencies =[];
exports.addEmergency = (req,res) => {
    emergencies.push(req.body);
    res.send("Emergency Added ✅");
};
    exports.getEmergencies = (req,res) => {
        res.json(emergencies);
    };

    exports.updateEmergency = (req,res) => {
        const index =req.params.index;
        if(emergencies[index]){
            emergencies[index]=req.body;
            res.send("Emergency Updated✏️");
        }else{
            res.send("Data not found❌ ");
        }
    };
    exports.deleteEmergency = (req,res) => {
        const index = req.params.index;
        if(emergencies [index]){
            emergencies.splice(index,1);
            res.send("Emergency Deleted🗑️");

        }else{
            res.send("Not Found ❌");
        }
    };