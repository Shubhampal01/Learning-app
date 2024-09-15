import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../midddlewares/sendMail.js";
export const register = async(req,res)=>{
    try {
        const{name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword = await bcrypt.hash(password,10);
        user = new User({
            name,
            email,
            password:hashPassword,
        })
        const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
        const activationCode = jwt.sign({
            user,
            otp},
            process.env.ACTIVATION_SECRET,
            {expiresIn:"10m"});
        const data = {
            name,otp
        }
        console.log(data)
        await sendMail(email,"E learning",data);
        res.status(200).json({message:"OTP send to your email",activationCode})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const verifyUser = async(req,res)=>{
    try {
        const {activationCode, otp} = req.body;
        const verify = jwt.verify(activationCode, process.env.ACTIVATION_SECRET);
        if(!verify){
            return res.status(400).json({message:"OTP expired"})
        }
        if(verify.otp!==otp){
            return res.status(400).json({message:"Invalid OTP"})
        }
        await User.create({
            name:verify.user.name,
            email:verify.user.email,
            password:verify.user.password
        })
        res.status(200).json({message:"User registered successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const login = async(req, res)=>{
    try {
        const{email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"15d"});
        res.status(200).json({message:`Welcome back ${user.name}`, token,user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const myProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}