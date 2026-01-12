import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        enum:["REGISTER","LOGIN","RESET_PASSWORD"],
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;