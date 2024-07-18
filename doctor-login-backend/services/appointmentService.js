const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");

async function addAppointment(appointment) {
  try {
    const appointmentDetails = {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      appointmentDateTime: appointment.appointmentDateTime,
      status: appointment.status,
    };
    // console.log("appointmentDetails", appointmentDetails);

    const newAppointment = new Appointment(appointmentDetails);
    const result = await newAppointment.save();
    return { status: 200, task: result };
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}

async function getAppointmentsByPatientId(PatientId) {
  // console.log(PatientId,"PatientId");
  try {
    const ResultByPatientId = await Appointment.find({ patientId: PatientId });
    return ResultByPatientId;
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}

async function getAppointmentsByDoctorId(DoctorId) {
  try {
    const resultByDoctorId = await Appointment.find({ doctorId: DoctorId });
    return resultByDoctorId;
  } catch (error) {
    throw {
      status: 500,
      message: "Internal Server Error in getAppointmentsByDoctorId",
    };
  }
}
async function getAllAppointments() {
  try {
    const appointmentResult = await Appointment.find({}, { __v: 0 });
    return appointmentResult;
  } catch (error) {
    throw {
      status: 500,
      message: "Internal server error for getAll Appointments",
    };
  }
}

async function changeAppointmentStatus(change) {
  try {
    // console.log(change, "service change");
    const changeStatus = await Appointment.updateOne(
      { _id: change._id }, 
      { status: change.status } 
    );
    return changeStatus;
  } catch (error) {
    console.error('Error changing appointment status:', error);
    throw {
      status: 500,
      message: "Internal Server Error in change Appointment Status",
    };
  }
}

const deletePatientById = async (deleteId) => {
  try {
    console.log(deleteId, "Service.....");

    // Check if the record exists
    const record = await Appointment.findOne({ _id: deleteId });
    if (!record) {
      return {
        status: 404,
        message: "Record not found",
      };
    }

    // If the record exists, proceed with deletion
    await Appointment.deleteOne({ _id: deleteId });

    return {
      status: 200,
      message: "Deleted Successfully...",
    };
  } catch (error) {
    console.error("Error in deletePatientById:", error);
    throw {
      status: 500,
      message: "Error in delete appointment",
    };
  }
};
module.exports = {
  getAllAppointments,
  addAppointment,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  changeAppointmentStatus,
  deletePatientById
};
