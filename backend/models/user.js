import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    dob: {
        type:Date,
    },
    workExperience: {
        type:String,
    },
    resumeTitle: {
        type:String,
    },
    currentLocation: {
        type:String,
    },
    postalAddress: {
        type:String,
    },
    currentEmployer: {
        type:String,
    },
    currentDesignation: {
        type:String,
    },
})

export const User = mongoose.model('User',userSchema);