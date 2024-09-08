import express from "express";  
import { addLecture, createCourse } from "../controllers/admin.controller.js";
import { isAdmin, isAuth } from "../midddlewares/isAuth.js";
import { upload } from "../midddlewares/multer.js";

const router = express.Router();
router.post('/course/new',isAuth,isAdmin,upload,createCourse)
router.post('/course/:id',isAuth,isAdmin,upload,addLecture)

export default router;