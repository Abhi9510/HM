import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient" , "Doctor"],
    },
    doctorDepartment: {
        type: String,
        // required: [true, "Please enter your department"],
    },
    docAvatar: {
        public_id: String,
        url: String
        // required: [true, "Please enter your avatar"],
    },

});



userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);    
