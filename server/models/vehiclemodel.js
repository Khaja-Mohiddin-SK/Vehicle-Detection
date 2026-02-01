import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.Types.ObjectId , ref: 'user', required: true},
    fullName: {type:String, required:true},
    licenseNumber: {type:String, required: true},
    numberPlate: {type: String,required: true,unique: true,uppercase: true,trim: true},
    location: {lat: Number,lng: Number}
}, { timestamps: true });

const vehiclemodel = mongoose.models.vehicle ||  mongoose.model('vehicle', vehicleSchema);

export default vehiclemodel;