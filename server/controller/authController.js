import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import userModel from '../models/usermodel.js';
import transporter from '../config/nodemailer.js';


const passwordreq = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailreq = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
export const register = async (req,res)=>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success:false, message: 'Missing Details'})
    }
    if(!emailreq.test(email)){
        return res.json({success: false, message: 'Please enter a valid Email address'});
    }
    if(!passwordreq.test(password)){
        return res.json({success: false, message: 'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character'})
    }

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false, message: 'User already exists'});
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedpassword});
        await user.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production'?
            'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,   });


       // sending mail
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Vehicle Detection site',
            text: `Hey there! I gladly welcome you to VDS. An account has been created with this email id: ${email}.`
        }
        await transporter.sendMail(mailOptions);
        return res.json({success: true});

    } catch(error){
        res.json({success: false, message:error.message})

    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success:false, message: 'Email and Password are required'})
    }
    if(!emailreq.test(email)){
        return res.json({success: false, message: 'Please enter a valid Email address'});
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"Invalid email"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid password"})

        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production'?
            'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,

    });

    return res.json({success:true});

    }catch(error){
        return res.json({success:false, message: error.message})

    }
}

export const logout = async (req,res) => {

    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production'?
            'none' : 'strict',
        })

        return res.json({success: true, message: 'Logged Out'})

    }
    catch(error){
        return res.json({success:false, message: error.message})

    }
}

// sending otp
export const sendVerifyOtp = async (req, res) => {

    try{

        const userId = req.user.id;
        const user = await userModel.findById(userId);
         if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        if(user.isAccountverified){
            return res.json({success: false, message: "Account already verified"});
        }
        const otp = String (Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpire = Date.now() + 24*60*60*1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        } 
        await transporter.sendMail(mailOption);
        res.json({success:true , message: 'Verification OTP sent on Email you provided'})

    }
    catch(error){
        return res.json({success:false, message: error.message})
    }
}

// verifiying otp and email
export const verifyEmail = async (req, res) =>{

    const userId = req.user.id;
    const { otp } = req.body;

    if(!userId || !otp){
        return res.json({success: false, message: 'Missing Details'});
    }

    try{
        const user = await userModel.findById(userId);
        
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        if(user.verifyOtp === ''|| user.verifyOtp !== otp){
            return res.json({ success: false, message: 'Invalid OTP'});
        }
        if(user.verifyOtpExpire < Date.now()){
            return res.json({success: false, message: 'OTP Expired'});
        }

        user.isAccountverified = true;
        user.verifyOtp = '';
        user.verifyOtpExpire = 0;

        await user.save();
        return res.json({success: true, message: 'Email Verified Successfully'})

    }
    catch(error){
        return res.json({success:false, message: error.message})
    }

}

// after authentication
export const isAuthenticated = async (req,res) =>{
    try{
        if (!req.user || !req.user.id) {
            return res.json({ success: false });
    }
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.json({ success: false });
    }

        return res.json({success:true});

    }
    catch(error){
        return res.json({success:false, message: error.message})
    }
}

// otp for password reset 
export const sendResetOtp = async (req,res) =>{

    const {email} = req.body

    if(!email)
    {
        return res.json({success:false, message:'Email is required'})
    }
    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        const otp = String (Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpire = Date.now() + 15*60*1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting you Password is ${otp}. Use this Otp to reset you Password`
        } 
        await transporter.sendMail(mailOption);
        return res.json({success:true , message: 'Otp sent to your mail'})

    }
    catch(error){
        return res.json({success:false, message: error.message})
    }
}

// verify otp and reset password
export const resetPassword = async (req,res) =>{

    const {email, otp, newpassword} = req.body;

    if(!email || !otp || !newpassword){
        return res.json({success:false, message: 'Email, Otp and New Password are required'});
    }
    if(!passwordreq.test(newpassword)){
        return res.json({success: false, message: 'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character'})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message: 'User not found'});
        }
        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({success:false, message: 'Invalid Otp'});
        }
        if(user.resetOtpExpire < Date.now()){
            return res.json({success:false, message: 'Otp is Expired'});
        }
        const hashedpassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedpassword;
        user.resetOtp = '';
        user.resetOtpExpire = 0;

        await user.save();

        return res.json({success:true, message: 'Password has been reset Successfully'});  

    }
    catch(error){
        return res.json({success:false, message: error.message})
    }
}
    
