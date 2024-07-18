const appointmentService = require("../services/appointmentService");

const addAppointment = async (req, res) => {
  try {
    const result = await appointmentService.addAppointment(req.body);
    res.status(result.status).send(result.task || { message: result.message });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
const getAllAppointment = async (req, res) => {
  try {
    const getAllResult = await appointmentService.getAllAppointments();
    res.status(200).send(getAllResult);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const appointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.query;
    byPatientIdResult = await appointmentService.getAppointmentsByPatientId(
      patientId
    );
    res.status(200).send(byPatientIdResult);
    // res.status(byPatientIdResult.status).send(byPatientIdResult.task || { message: byPatientIdResult.message });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error for PatientIdResult" });
  }
};

const appointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const result = await appointmentService.getAppointmentsByDoctorId(doctorId);
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error for Doctor ID Result" });
  }
};

const appointmentStatusChange = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const result = appointmentService.changeAppointmentStatus({
      _id: _id,
      status: status,
    });
    res.status(200).send({ Message: "Status Changed...." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error for Appointment Status Change" });
  }
};

const deletePatientRecord = async (req, res) => {
  try {
    const { id } = req.params; // Correctly destructure id from req.params
    console.log(id, "controller ID.....");

    const result = await appointmentService.deletePatientById(id);
    res.status(200).send(result);
  } catch (error) {
    // console.error("Error in deletePatientRecord:", error);
    res.status(500).send({ message: "Internal server error delete by id" });
  }
};

module.exports = {
  getAllAppointment,
  addAppointment,
  appointmentsByPatientId,
  appointmentsByDoctorId,
  appointmentStatusChange,
  deletePatientRecord,
};
