import vehiclemodel from "../models/vehiclemodel.js";
import userModel from "../models/usermodel.js";

export const checkNumberPlate = async (req,res) =>{

    const userId = req.user.id;
    const {numberPlate} = req.body;

    if(!numberPlate){
        return res.json({success: false, message: "Nummber Plate is required"})
    }
    try{

        const Vehicle = await vehiclemodel.findOne({numberPlate});

        if(Vehicle){
            return res.json({success: true, message: "Vehicle Found"})

        }
        return res.json({success: false, message: "Vehicle not found"});

    }
    catch(error){
        return res.json({success: false, message: error.message})

    }
}

export const registerVehicle = async (req,res) =>{

    const userId = req.user.id;
    const { fullName, licenseNumber, numberPlate} = req.body;

    if(!fullName || !licenseNumber || !numberPlate){
        return res.json({success: false, message: "All details are required"})
    }

    try{

        const existingVehicle = await vehiclemodel.findOne({numberPlate})

        if(existingVehicle){
            return res.json({success: false, message: "Vehcile already exists"})
        }

        const vehicle = new vehiclemodel({
            userId,
            fullName,
            licenseNumber,
            numberPlate
        })

        await vehicle.save();
        const user = await userModel.findByIdAndUpdate(userId,{ $push: { vehicles: vehicle._id } },{ new: true } );

        return res.json({success: true, message: "Vehicle registered successfully"})
    }
    catch(error){

        return res.json({success: false, message: error.message})

    }
}