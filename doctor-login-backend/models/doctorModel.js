const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: Number, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  specialist: { type: String, required: false }
});

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;