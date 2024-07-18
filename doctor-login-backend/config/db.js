const mongoose = require("mongoose");

const connectDB  = async () =>{
  try{
    await mongoose.connect('mongodb://localhost:27017/appointmentDatabase');
    {
      console.log("database connected....");
    }
  }catch(error){
    console.error("Error",error);
    // process.exit(1);
  }
}


module.exports = connectDB