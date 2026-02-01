import userModel from "../models/usermodel.js";
import vehiclemodel from "../models/vehiclemodel.js" 

export const getUserData = async (req,res) =>{
    try{

        const userId = req.user.id;
        const user = await userModel.findById(userId).populate('vehicles');;

        if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        
        res.json({success: true, userData: {name: user.name, isAccountverified: user.isAccountverified, vehicles: user.vehicles}});
    }
    catch(error){
        return res.json({success:false, message: error.message})
    }
}