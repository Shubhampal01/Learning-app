import Course from "../models/course.model.js"
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";
import payment from "../models/payment.model.js";
// import { razorpayInstance } from "../index.js";
import crypto from "crypto"
export const getAllCourses = async(req,res)=>{
    try {
        const courses = await Course.find();
        res.json({courses})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const getSingleCourse = async(req, res)=>{
    try {
        const course = await Course.findById(req.params.id);
        res.json({course})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllLectures = async(req, res)=>{
    try {
        const lectures = await Lecture.find({course: req.params.id});
        const user = await User.findById(req.user._id);
        if(user.role === "admin"){
            return res.json({lectures})
        }
        if(!user.subscription.includes(req.params.id)){
            return res.status(400).json({
                message: "You are not enrolled in this course"
            })
        }
        res.json({lectures})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getSingleLecture = async(req, res)=>{
    try {
        const lecture = await Lecture.findById(req.params.id);

        const user = await User.findById(req.user._id);
        if(user.role === "admin"){
            return res.json({lecture})
        }
        if(!user.subscription.includes(lecture.course)){
            return res.status(400).json({
                message: "You are not enrolled in this course"
            })
        }
        res.json({lecture})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getMyCourses = async(req,res)=>{
    const courses = await Course.find({_id: req.user.subscription});
    res.json({courses})
}

export const checkOut = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const course = await Course.findById(req.params.id);
  
      // Check if user is already enrolled
      if (user.subscription.includes(course._id)) {
        return res.status(400).json({ message: "You have already enrolled in this course" });
      }
  
      const options = {
        amount: Number(course.price * 100),
        currency: "INR",
      };
  
      const order = await razorpayInstance.orders.create(options);
      res.status(201).json({ order, course });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    // Validate payment details
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });

      const user = await User.findById(req.user._id);
      const course = await Course.findById(req.params.id);
      
      // Add course to user's subscriptions
      user.subscription.push(course._id);
      await user.save();

      res.status(200).json({ message: "Payment successful" });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollCourse = async (req,res)=>{
  try{        
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);
    
    // Check if user is already enrolled
    if (user.subscription.includes(course._id)) {
      return res.status(400).json({ message: "You have already enrolled in this course" });
    }
    // Add course to user's subscriptions
    user.subscription.push(course._id);
    await user.save();

    res.status(200).json({ message: "You have enrolled now you can study" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
