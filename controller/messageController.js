import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import {Message} from "../models/messageSchema.js";
import ErrorMiddleware from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res) => {
    const {firstName, lastName, email, phone, message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message) {
        return next (new ErrorHandler("Please fill full form", 400));


        // return res.status(400).json({
        //     success: false,
        //     message: "All fields are required",
        // });
    }
        await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message,
        }); 
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });
    
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
})