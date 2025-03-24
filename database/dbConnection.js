import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "BombayHospital"
    }).then(()=>{
        console.log("Database connection established")
    }).catch(err =>{
        console.log(`Some error occured: ${err}`) 
    }); 
};