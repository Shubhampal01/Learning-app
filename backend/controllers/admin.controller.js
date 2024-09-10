import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";
import {rm} from "fs";
import { promisify } from "util";
import fs from "fs";
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

export const deleteLecture = async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    rm(lecture.video, ()=>{
        console.log("video deleted")
    })
    await lecture.deleteOne();
    res.status(200).json({
        message: "Lecture deleted successfully"
    })
}

const unlinkAsync = promisify(fs.unlink);
export const deleteCourse = async(req, res)=>{
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    const lectures = await Lecture.find({course: req.params.id});
    await Promise.all(
        lectures.map(async(lecture)=>{
            await unlinkAsync(lecture.video);
            console.log("video deleted");
        }))
    await rm(course.image, ()=>{
        console.log("image deleted")
    })
    await Lecture.find({course: req.params.id}).deleteMany();
    await course.deleteOne();
    await User.updateMany({}, {$pull: {subscription: req.params.id}})
    res.status(200).json({
        message: "Course deleted successfully"
    })
}

export const getAllStats = async(req,res)=>{
    const totalCourses = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers
    }
    res.json({
        stats
    })
}