const { mongoose } = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId,ref:"doctor", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId,ref:"patient", required: true },
    appointmentDateTime: { type: Date, required: true },
    status: { type: String, enum:["Pending","Accepted","Cancelled"],default:"Pending"},
    
  });
  
  const Appointment = mongoose.model('appointment', appointmentSchema);
  
  module.exports = Appointment;