import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true,trim: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpire: {type : Number, default: 0},
    isAccountverified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpire: {type: Number, default: 0},
    vehicles: [{type: mongoose.Schema.Types.ObjectId, ref: 'vehicle'}],
})

const userModel = mongoose.models.user ||  mongoose.model('user', userSchema);


export default userModel;