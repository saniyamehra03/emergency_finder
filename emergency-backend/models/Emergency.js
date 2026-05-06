const mongoose = require('mongoose');
const emergencySchema = new mongoose.Schema({
    type: String,
    location: String,
    name: String,
    phone: String,
});
module.exports = mongoose.model("Emergency", emergencySchema);