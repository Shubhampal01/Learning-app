import Course from "../models/course.model.js"
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";

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
        if(!user.subscription.includes(req.params.id)){
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