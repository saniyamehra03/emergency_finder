const express = require('express');
const router= express.Router();

const{
    addEmergency,
    getEmergencies,
    updateEmergency,
    deleteEmergency
}= require('../controllers/emergencyController');
router.post("/emergency", addEmergency);
router.get("/emergency", getEmergencies);
router.put("/emergency/:index", updateEmergency);
router.delete("/emergency/:index", deleteEmergency);
module.exports = router;