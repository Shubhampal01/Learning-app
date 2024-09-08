import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
export const createCourse = async(req,res)=>{
    try {
        const {title, description, price, category, createdBy, duration} = req.body
        const image = req.file;
        await Course.create({
            title, 
            description, 
            category, 
            createdBy, 
            image: image?.path,
            duration, 
            price, 
        })
        res.status(201).json({
            message: "Course created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addLecture = async(req, res)=>{
    try {
        const cours = await Course.findById(req.params.id);
        if(!cours){
            return res.status(404).json({
                message: "Course not found"
            })
        }
        const {title, description} = req.body;
        const file = req.file;
        const lecture = await Lecture.create({
            title,
            description,
            video:file?.path,
            course: cours._id
        })
        res.status(201).json({
            message: "Lecture added successfully",
            lecture
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}