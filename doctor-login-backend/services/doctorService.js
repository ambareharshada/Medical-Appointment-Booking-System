const Doctor = require("../models/doctorModel");

async function addDoctorService(doctor) {
  try {
    let doctorDetails = {
      name: doctor.name,
      phoneNumber: doctor.phoneNumber,
      gender: doctor.gender,
      age: doctor.age,
      city: doctor.city,
      email: doctor.email,
      password: doctor.password,
      address: doctor.address,
      specialist: doctor.specialist,
    };

    const newDoctor = new Doctor(doctorDetails);
    const result = await newDoctor.save();
    // res.status(result.status).send({message:"Registered....."})
    return { status: 200, message: "Success" };
  } catch (error) {
    throw { status: 200, message: "Error...500" };
  }
}

async function getAllDoctor() {
  try {
    const doctorData = await Doctor.find({}, { __v: 0 });
    return doctorData;
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}
module.exports = {
  addDoctorService,
  getAllDoctor
};
