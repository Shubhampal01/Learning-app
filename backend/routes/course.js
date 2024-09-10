import express from "express";  
import { getAllCourses, getAllLectures, getSingleCourse, getSingleLecture } from "../controllers/course.controller.js";
import { isAuth } from "../midddlewares/isAuth.js";

const router = express.Router();
router.get("/course/all",getAllCourses)
router.get("/course/:id",getSingleCourse)
router.get("/lectures/:id",isAuth,getAllLectures)
router.get("/lecture/:id",isAuth,getSingleLecture)

export default router;