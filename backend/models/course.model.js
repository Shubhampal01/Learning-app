import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;