import {mongoose} from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],

    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        minLength: [10, "Phone number must be at least 10 characters"],

    },
    nic: {
        type: String,
        required: true,
        minLength: [5, "nic must contain at least 5 characters"],
        maxLength: [5, "nic must contain at least 5 characters"],
    },      
    dob: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    gender: {
        type: String,
        required: true, 
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: [true, "Appointment date is required"],
    },
    department: {
        type: String,
        required: [true, "Please enter your department"],
    },
    doctor: {
        firstName:{
            type: String,
            required: [true, "Please enter your department"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter your department"],
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address:{
        type: String,
        required: [true, "Please enter your address"],
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },

});

export const Appointment = mongoose.model("Appointment", appointmentSchema);