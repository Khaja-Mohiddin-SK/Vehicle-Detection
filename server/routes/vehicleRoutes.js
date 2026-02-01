import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { checkNumberPlate, registerVehicle } from '../controller/vehicleController.js';


const authVehicle = express.Router();

authVehicle.post('/check-number-plate', userAuth, checkNumberPlate);
authVehicle.post('/register-vehicle', userAuth, registerVehicle);

export default authVehicle;
