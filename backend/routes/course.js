import express from "express";  
import { checkOut, getAllCourses, getAllLectures, getMyCourses, getSingleCourse, getSingleLecture, paymentVerification } from "../controllers/course.controller.js";
import { isAuth } from "../midddlewares/isAuth.js";

const router = express.Router();
router.get("/course/all",getAllCourses)
router.get("/course/:id",getSingleCourse)
router.get("/lectures/:id",isAuth,getAllLectures)
router.get("/lecture/:id",isAuth,getSingleLecture)
router.get("/mycourse",isAuth,getMyCourses)
router.post("/course/checkout/:id",isAuth,checkOut)
router.post("/verification/:id",isAuth,paymentVerification)

export default router;