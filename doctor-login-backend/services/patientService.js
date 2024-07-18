const mongoose = require("mongoose");
const Patient = require('../models/patientModel');

async function addPatient(patient) {
  try {
    const patientDetails = {
      name: patient.name,
      phoneNumber: patient.phoneNumber,
      gender: patient.gender,
      age: patient.age,
      dateOfBirth: patient.dateOfBirth,
      bloodGroup: patient.bloodGroup,
      email: patient.email,
      password: patient.password,
      address: patient.address
    };

    const newPatient = new Patient(patientDetails);
    const result = await newPatient.save();
    return { status: 200,task: result}; //, task: result 
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}


async function getAllPatients() {
  try {
    const patients = await Patient.find({}, {__v: 0 });  
    return patients;
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}


module.exports = {
  addPatient,
  getAllPatients
};