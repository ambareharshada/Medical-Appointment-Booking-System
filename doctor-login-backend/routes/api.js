const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");
const doctorController = require("../controllers/doctorController");
const appointmentController = require("../controllers/appointmentController");

// patient registration routes
router.post("/patient/addPatient", patientController.addPatient);
router.get("/patients", patientController.getAllPatients);
router.post("/patient/loginPatient", patientController.loginPatient);

//Doctor routes
router.post("/doctor/addDoctor", doctorController.addDoctor);
router.get("/getAllDoctor", doctorController.getAllDoctors);
router.post("/doctor/loginDoctor", doctorController.loginDoctor);

//appointments routes
router.post("/appointment/addAppointment", appointmentController.addAppointment);
router.get("/getAllAppointment", appointmentController.getAllAppointment);
router.get("/getAppointmentByPatientId/", appointmentController.appointmentsByPatientId);
router.get("/getAppointmentByDoctorId/", appointmentController.appointmentsByDoctorId);
router.put("/getAppointmentByStatusChange/", appointmentController.appointmentStatusChange);
router.delete("/deletePatientId/:id", appointmentController.deletePatientRecord);

module.exports = router;
