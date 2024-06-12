const express  = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const User = require("../models/user");
const Prescription = require("../models/prescription");
const mongoose = require('mongoose');

const cors = require("cors");
const app = express();
const connectDB = require("../db/connect");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// All users
router.get('/', async(req, res) => {
    const query = {};
    const result = await Prescription.find(query);
    res.status(200).json(result);
});

// Find a prescription by ID
router.get('/prescription/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(id);
  
    try {
      const prescription = await Prescription.findById(id);
  
      if (!prescription) {
        return res.status(404).send('Prescription not found');
      }
  
      return res.status(200).json(prescription);
    } catch (error) {
      console.error('Error finding patient:', error);
      return res.status(500).send('Error finding patient');
    }
  });

// Add prescription
router.post('/add-prescription', async(req, res) => {
    // console.log(req.body);
    const {
        userId,
        doctorId,
        patientId,
        symptoms,
        prescription,
        comment,
        billing,

      } = req.body;
  
      try {
        const newPrescription = new Prescription({
            userId,
            doctorId,
            patientId,
            symptoms,
            prescription,
            comment,
            billing,
        });
    
        const savedPrescription = await newPrescription.save();
        res.status(200).json(savedPrescription);

      } catch (error) {
        console.error('Error creating prescription:', error);
        res.status(500).send('Error creating prescription');
      }

});

// Delete a prescription by ID
router.delete('/delete-prescription/:id', async (req, res) => {
    const { _id } = req.params;
  
    try {
      const deletedPatient = await Patient.findByIdAndDelete(_id);
  
      if (!deletedPatient) {
        return res.status(404).send('Patient not found');
      }
  
      res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).send('Error deleting patient');
    }
  });

module.exports = router;