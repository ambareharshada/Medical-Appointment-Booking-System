const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name:{type:String, required:false},
    phoneNumber:{type:String, required:false},
    gender:{type:String, required:false},
    age:{type:Number, required:false},
    dateOfBirth:{type:String, required:false},
    bloodGroup:{type:String, required:false},
    email:{type:String, required:false},
    password:{type:String, required:false},
    address:{type:String, required:false},
})

const Patient = mongoose.model('patient',patientSchema)
module.exports = Patient;