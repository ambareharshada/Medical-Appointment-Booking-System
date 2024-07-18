const doctorService = require("../services/doctorService");
const Doctor = require("../models/doctorModel");
const addDoctor = async (req, res) => {
  try {
    const result = await doctorService.addDoctorService(req.body);
    res.status(result.status).send({ message: result.message });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAllDoctors = async(req,res)=>{
    try {
        const result = await doctorService.getAllDoctor(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

const loginDoctor = async (req, res) => {
  const DoctorData = req.body;

  try {
    const doctorEmail = await Doctor.findOne({ email: DoctorData.email });

    if (!doctorEmail) {
      res.status(doctorEmail.status).send({ message: doctorEmail.message });
    } else {
      const password = await Doctor.findOne(
        { password: DoctorData.password },
        { _id: 1, name: 1 }
      );
      if (!password) {
        res.status(500).send({ message: "Invalid Password" });
      } else {
        console.log(password);
        res
          .status(200)
          .send({ message: "Successful", doctorDetails: password });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Invalid Password..." });
  }
};

module.exports = {
  addDoctor,
  getAllDoctors,
  loginDoctor
};
