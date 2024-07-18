const patientService = require("../services/patientService");
const Patient = require("../models/patientModel");

const addPatient = async (req, res) => {
  try {
    // console.log("req.body patientController",req.body);
    const result = await patientService.addPatient(req.body);
    res.status(result.status).send(result.task || { message: result.message });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const loginPatient = async (req, res) => {
  const patientData = req.body;

  try {
    const userEmail = await Patient.findOne({ email: patientData.email });

    if (!userEmail) {
      res.status(userEmail.status).send({ message: userEmail.message });
    } else {
      const password = await Patient.findOne(
        { password: patientData.password },
        { _id: 1, name: 1 }
      );
      if (!password) {
        res.status(500).send({ message: "Invalid Password" });
      } else {
        console.log(password);
        res
          .status(200)
          .send({ message: "Successful", patientDetails: password });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Invalid Password..." });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const result = await patientService.getAllPatients();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};



module.exports = {
  addPatient,
  getAllPatients,
  loginPatient
};
